from fastapi import FastAPI, Header, HTTPException
from config import get_settings  # config.pyから設定をインポート
from fastapi.middleware.cors import CORSMiddleware
from openai import OpenAI
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests
from redis import Redis
from schemas.request import Params
from schemas.user import User
from services.request_gpt import request_gpt
from services.count_generating import increment_ai_generate_count

# 設定の取得（New）
settings = get_settings()

origins = [ "*" ]

# APIクライアントを初期化
gpt_client = OpenAI(
    api_key=settings.openai_api_key
)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # 本番では限定推奨
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/atelier/create")
async def create_prompt(
    params: Params,
    authorization: str = Header(None),
):
    # 1. Headerに無ければ reject
    if not authorization:
        raise HTTPException(status_code=401, detail="Missing Authorization header")

    # 2. Bearer 形式以外は reject
    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid Authorization format")

    token = authorization.replace("Bearer ", "")

    if not token:
        raise HTTPException(401, "id_token missing")

    # Google署名・aud・exp 検証
    payload = id_token.verify_oauth2_token(
        token,
        google_requests.Request(),
        settings.google_client_id,
    )

    sub = payload["sub"]


    #response = request_gpt(params, gpt_client)
    #response["prompt"] = gpt_response["prompt"]
    #response["negativePrompt"] = gpt_response["negativePrompt"]

    #return response

