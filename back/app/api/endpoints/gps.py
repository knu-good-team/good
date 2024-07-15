from typing import Any, Dict

import aiohttp
from fastapi import APIRouter

from app.core.config import get_settings

router = APIRouter()


@router.get(
    path="",
    summary="위도, 경도 값",
    description="유저가 검색한 사업장의 위치를 기준으로 위도와 경도의 값을 반환한다.",
    response_description="위도, 경도",
)
async def gps(
    address: str,
) -> Dict[str, float]:
    setting = get_settings()
    #TODO 반드시 확인할 것. SSL Error
    async with aiohttp.ClientSession(connector=aiohttp.TCPConnector(ssl=False)) as session:
        async with session.get(
            f"https://dapi.kakao.com/v2/local/search/address?query={address}",
            headers={"Authorization": f"KakaoAK {setting.KAKAO_API_KEY}"},
        ) as resp:
            data = await resp.json()
    return {
        "latitude": data["documents"][0]["address"]["y"],
        "longitude": data["documents"][0]["address"]["x"],
    }
