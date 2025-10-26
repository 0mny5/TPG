from fastapi import FastAPI
from config import get_settings  # config.pyから設定をインポート

# 設定の取得（New）
settings = get_settings()

# OpenAI APIキーを設定
"""
openai.api_key = settings.openai_api_key
"""
app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}

