from typing import Any, List
import aiohttp
from sqlalchemy.orm import Session

from app.core.config import get_settings


class DisabilityJobsService:
    def __init__(self) -> None:
        pass

    async def get_disability_jobs_list(self) -> Any:
        settings = get_settings()
        async with aiohttp.ClientSession(
            connector=aiohttp.TCPConnector(ssl=False)
        ) as session:
            async with session.get(
                f"https://api.odcloud.kr/api/3072637/v1/uddi:9c387a5b-e100-485e-be02-cf2df2b8bb89?page=1&perPage=2&returnType=json&serviceKey={settings.OPENDATA_API_KEY}"
            ) as resp:
                if resp.status != 200:
                    raise Exception(f"Failed to fetch data: {resp.status}")
                else:
                    res = await resp.json()
            return res
