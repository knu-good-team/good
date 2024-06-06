from typing import Any

from fastapi import APIRouter


router = APIRouter()


@router.get(
    path="",
    summary="Health check",
    description="Health check",
    response_description="Health check",
)
async def health() -> Any:
    return {
        "hello": "world",
        "web_server": "ok",
        "db": "ok",
    }
