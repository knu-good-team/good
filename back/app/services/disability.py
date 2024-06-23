from collections import defaultdict
from typing import Any, List
import aiohttp
from sqlalchemy.orm import Session

from app.core.config import get_settings
from app.repositories.disability_jobs import DisailityRepository


class DisabilityService:
    def __init__(self, disability_repo: DisailityRepository) -> None:
        self.disability_repo = disability_repo

    async def get_disability_jobs_list(self, db: Session) -> Any:
        resp = await self.disability_repo.get_disability_jobs_list(db)
        resp_list = [resp.to_dict() for resp in resp]
        return resp_list

    async def search_disability_jobs(self, db: Session, search: str) -> Any:
        resp = await self.disability_repo.search_disability_jobs(db, search)
        resp_list = [resp.to_dict() for resp in resp]
        return resp_list

    async def get_disability_workers_list(self, db: Session) -> Any:
        resp = await self.disability_repo.get_disability_workers_list(db)
        resp_list = [resp.to_dict() for resp in resp]
        # 연령대별 희망직종 카운트를 저장할 딕셔너리 생성
        age_group_job_counts = {}

        # 데이터를 순회하면서 연령대별 희망직종 카운트
        for entry in resp_list:
            age_group = entry["연령대"]
            job = entry["희망직종"]

            if age_group not in age_group_job_counts:
                age_group_job_counts[age_group] = {}

            if job not in age_group_job_counts[age_group]:
                age_group_job_counts[age_group][job] = 0

            age_group_job_counts[age_group][job] += 1

        # 희망직종이 50 이하인 경우 기타로 통합
        for age_group in age_group_job_counts:
            temp_counts = {}
            for job, count in age_group_job_counts[age_group].items():
                if count <= 10:
                    if "기타" not in temp_counts:
                        temp_counts["기타"] = 0
                    temp_counts["기타"] += count
                else:
                    temp_counts[job] = count
            age_group_job_counts[age_group] = temp_counts
        return age_group_job_counts
