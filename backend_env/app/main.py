from fastapi import FastAPI
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
client = OpenAI(
    api_key=settings.openai_api_key
)

class Params(BaseModel):
    direction:   str
    atmosphere:  str
    theme:       str
    colors:      str
    angle:       str
    story:       str

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # 本番では限定推奨
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def request_gpt(params: Params):
    story = params.story
    tags = [params.direction, params.theme, params.angle, params.atmosphere, params.colors]
    quality_tags = [
        "(masterpiece,best quality:1.2)",
        "high resolution",
        "ultra detailed",
        "sharp focus",
        "clean details",
        "refined texture",
        "natural lighting",
        "intricate details",
        "(detailed background:1.4),(glitter:1.2)"
    ]
    fixed_negative_prompt = [
        "(easynegative:1.0)",
        "(worst quality,low quality:1.2)",
        "(blurry,noise:1.1)",
        "deformed",
        "distorted",
        "bad anatomy",
        "extra limbs",
        "text",
        "watermark",
        "overexposed",
        "underexposed",
        "verybadimagenegative_v1.3",
    ]
    gpt_input = "\n\n## 入力\n" + "物語要素:\n" + story + "\n" + "タグ:\n" + ", ".join(tags) + "\n" + "品質タグ:\n" + ", ".join(quality_tags) + "\n" + "固定ネガティブプロンプト:\n" + ", ".join(fixed_negative_prompt) + "\n"
    ##client = OpenAI()

    response = {}
    response["prompt"] = settings.gpt_prompt + gpt_input
    response["negativePrompt"] = ", ".join(fixed_negative_prompt)

    ##response = client.responses.create(
    ##    model="gpt-5-nano",
    ##    input=gpt_input
    ##)

    ##return response.output_text
    return response

@app.post("/atelier/create")
async def create_prompt(params: Params):
    print(params)
    response = request_gpt(params)
    ##response["prompt"] = gpt_response["prompt"]
    ##response["negativePrompt"] = gpt_response["negativePrompt"]
    return response

