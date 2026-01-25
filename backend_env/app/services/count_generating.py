from fastapi import HTTPException
from schemas.request import Params
from schemas.user import User
from datetime import datetime, timedelta
import pytz

def seconds_until_midnight():
    now = datetime.now(pytz.timezone("Asia/Tokyo"))
    tomorrow = (now + timedelta(days=1)).replace(
        hour=0, minute=0, second=0, microsecond=0
    )
    return int((tomorrow - now).total_seconds())


async def increment_ai_generate_count(
    redis_client,
    user: User,
    daily_limit,
):
    key = f"google_{user}:generate_count"

    #count = await redis_client.incr(key)
    count = 2

    if count == 1:
        await redis_client.expire(key, seconds_until_midnight())

    if count > daily_limit:
        # 超過していたら元に戻す
        await redis_client.decr(key)
        raise HTTPException(400, "Daily AI generation limit exceeded")

    return count

