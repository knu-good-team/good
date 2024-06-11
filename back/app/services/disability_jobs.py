from typing import Any, List
import aiohttp
from sqlalchemy.orm import Session

from app.core.config import get_settings
from app.repositories.disability_jobs import DisailityJobsRepository


class DisabilityJobsService:
    def __init__(self, disability_jobs_repo: DisailityJobsRepository) -> None:
        self.disability_jobs_repo = disability_jobs_repo

    async def get_disability_jobs_list(self, db: Session) -> Any:
        return await self.disability_jobs_repo.get_disability_jobs_list(db)
