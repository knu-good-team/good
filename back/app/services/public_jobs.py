from typing import Any, List
from sqlalchemy.orm import Session

from app.core.config import get_settings
from app.repositories.public_jobs import PublicJobsRepository


class PublicJobsService:
    def __init__(self, public_jobs_repo: PublicJobsRepository) -> None:
        self.public_jobs_repo = public_jobs_repo

    async def get_public_jobs_list(self, db: Session) -> Any:
        result = await self.public_jobs_repo.get_public_jobs_list(db)
        resp_list = [resp.to_dict() for resp in result]
        return resp_list
