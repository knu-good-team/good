from typing import Any, List
import aiohttp
from sqlalchemy.orm import Session

from app.core.config import get_settings
from app.repositories.disability_jobs import DisailityRepository


class DisabilityService:
    def __init__(self, disability_repo: DisailityRepository) -> None:
        self.disability_repo = disability_repo

    async def get_disability_jobs_list(self, db: Session) -> Any:
        return await self.disability_repo.get_disability_jobs_list(db)

    async def get_disability_workers_list(self, db: Session) -> Any:
        return await self.disability_repo.get_disability_workers_list(db)