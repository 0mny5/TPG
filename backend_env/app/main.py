from fastapi import FastAPI
from config import get_settings  # config.pyから設定をインポート
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# 設定の取得（New）
settings = get_settings()

origins = [ "*" ]
# OpenAI APIキーを設定
"""
openai.api_key = settings.openai_api_key
"""
class Params(BaseModel):
    prompt: str

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # 本番では限定推奨
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/atelier/create")
async def create_prompt(params: Params):
    return params

