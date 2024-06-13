from typing import Any, Dict

from fastapi import APIRouter


router = APIRouter()


@router.get(
    path="",
    summary="위도, 경도 값",
    description="유저가 검색한 사업장의 위치를 기준으로 위도와 경도의 값을 반환한다.",
    response_description="위도, 경도",
)
async def gps() -> Dict[str, float]:
    return {
        "latitude": 37.485,
        "longitude": 127.982,
    }
