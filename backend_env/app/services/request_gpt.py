from schemas.request import Params

def request_gpt(
    params: Params,
    client
):
    story = params.story
    tags = [
        params.direction,
        params.theme,
        params.angle,
        params.atmosphere,
        params.colors
    ]
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

    response = {}
    response["prompt"] = settings.gpt_prompt + gpt_input
    response["negativePrompt"] = ", ".join(fixed_negative_prompt)

    ##response = client.responses.create(
    ##    model="gpt-5-nano",
    ##    input=gpt_input
    ##)

    ##return response.output_text
    return response
