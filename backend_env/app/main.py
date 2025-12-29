from fastapi import FastAPI, Header, HTTPException
from config import get_settings  # config.pyから設定をインポート
from fastapi.middleware.cors import CORSMiddleware
from openai import OpenAI
from redis.asyncio import Redis
from schemas.request import Params
from schemas.user import User
from services.request_gpt import request_gpt
from services.count_generating import increment_ai_generate_count
from services.verify_login_user import verify_login_user

# 設定の取得（New）
settings = get_settings()

origins = [ "*" ]

# APIクライアントを初期化
gpt_client = OpenAI(
    api_key=settings.openai_api_key
)
r = Redis(
    host="localhost",
    port=6379,
    decode_responses=True
)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # 本番では限定推奨
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.post("/atelier/generated-count")
async def get_generated_count(
    authorization: str = Header(None),
):
    sub = verify_login_user(settings.google_client_id, authorization)
    key = f"google_{sub}:generate_count"
    generated_count = await r.get(key)
    return { "generatedCount": generated_count }

@app.post("/atelier/create")
async def create_prompt(
    params: Params,
    authorization: str = Header(None),
):
    sub = verify_login_user(settings.google_client_id, authorization)
    generate_count = await increment_ai_generate_count(r, sub, settings.daily_limit)

    response = request_gpt(params, gpt_client, settings.gpt_prompt, settings.forbidden_words)
    response["generateCount"] = generate_count

    return response

