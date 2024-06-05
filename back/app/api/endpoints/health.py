from typing import Any

from fastapi import APIRouter

# from app.schemas.health import Health


router = APIRouter()

@router.get(
    path="",
    summary="Health check",
    description="Health check",
    response_description="Health check",
    # response_model=Health,
)
async def health(
) -> Any:
    return {
        "hello": "world",
        "web_server": "ok",
        "db": "ok",
    }