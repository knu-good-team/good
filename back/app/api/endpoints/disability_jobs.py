from typing import Any

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.schemas.disability_jobs import DisabilityJobs
from app.services.disability_jobs import DisabilityJobsService
from dependencies import get_db, get_disability_jobs_service


router = APIRouter()


@router.get(
    path="",
    summary="",
    description="",
    response_description="",
)
async def disability_jobs(
    service: DisabilityJobsService = Depends(get_disability_jobs_service),
    db: Session = Depends(get_db),
) -> DisabilityJobs:
    result = await service.get_disability_jobs_list(db)
    return result
