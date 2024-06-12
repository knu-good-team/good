from typing import Any, List

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.schemas.disability_jobs import DisabilityJobs, DisabilityWorkers
from app.services.disability import DisabilityService
from dependencies import get_db, get_disability_service


router = APIRouter()


@router.get(
    path="/jobs",
    summary="",
    description="",
    response_description="",
)
async def disability_jobs(
    service: DisabilityService = Depends(get_disability_service),
    db: Session = Depends(get_db),
) -> List[DisabilityJobs]:
    result = await service.get_disability_jobs_list(db)
    return result


@router.get(
    path="/workers",
    summary="",
    description="",
    response_description="",
)
async def disability_workers(
    service: DisabilityService = Depends(get_disability_service),
    db: Session = Depends(get_db),
) -> Any:  # List[DisabilityWorkers]:
    result = await service.get_disability_workers_list(db)
    return result
