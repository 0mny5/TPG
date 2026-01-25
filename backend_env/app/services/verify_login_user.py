from fastapi import HTTPException
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests

def verify_login_user(
    google_client_id: str,
    authorization: str
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
    print("Authorization:", token)
    print("Token length:", len(token))


    # Google署名・aud・exp 検証
    try:
        payload = id_token.verify_oauth2_token(
            token,
            google_requests.Request(),
            google_client_id,
        )
    except:
        raise HTTPException(
            status_code=401,
            detail="ID_TOKEN_EXPIRED",
        )

    return payload["sub"]
