from fastapi import HTTPException
from schemas.request import Params
import json

def request_gpt(
    params: Params,
    client,
    base_prompt,
    forbidden_words
):
    MAX_STORY_CHARS = 500
    story = params.story
    tags = [
        params.direction,
        params.theme,
        params.angle,
        params.atmosphere,
        params.colors
    ]
    tags = ", ".join(tags)
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
    quality_tags = ", ".join(quality_tags)
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
    fixed_negative_prompt = ", ".join(fixed_negative_prompt)
    if any(word.lower() in story.lower() for word in forbidden_words.split(',')):
        raise HTTPException(400, "Invalid story content")
    if len(story) > MAX_STORY_CHARS:
        raise HTTPException(400, "Story is too long")

    inputs = "inputs:\n" + "- story:\n" + story + "\n" + "- tags:\n" + tags + "\n" + "- quality_tags:\n" + quality_tags + "\n" + "- fixed_negative_prompt:\n" + fixed_negative_prompt + "\n\n"
    gpt_input = inputs + base_prompt

    response = client.responses.create(
        model="gpt-5-nano",
        input=gpt_input
    )

    try:
        data = json.loads(response.output_text)
        assert "prompt" in data
        assert "negativePrompt" in data
    except:
        raise HTTPException(400, "Invalid response format.")

    data["prompt"] = data["prompt"] + ", " + quality_tags
    data["negativePrompt"] = fixed_negative_prompt + ", " + data["negativePrompt"]

    return data
