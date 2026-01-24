from functools import lru_cache
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    """ 環境変数を読み込む """
    cors_origin: str
    openai_api_key: str # 文字列型でバリデーション
    google_client_id: str
    next_auth_url: str
    gpt_prompt: str
    forbidden_words: str
    daily_limit: int

    class Config:
        env_file = "../.env" # .envファイルのパスを指定

# キャッシュ（New）
@lru_cache
def get_settings():
    """ @lru_cacheで.envの結果をキャッシュする """
    return Settings()
