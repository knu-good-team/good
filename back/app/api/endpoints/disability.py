from typing import Any, Dict, List

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
) -> dict[str, Any]:
    result = await service.get_disability_jobs_list(db)
    return {
        "data": result,
        "total": len(result),
    }


@router.get(
    path="/job_list",
    summary="",
    description="",
    response_description="",
)
async def disaility_jobs_real_tine(
    service: DisabilityService = Depends(get_disability_service),
) -> dict[str, Any]:
    result = await service.get_disability_jobs_real_time()
    return {
        "data": result[0]["response"]["body"]["items"]["item"],
        "numOfRows": result[0]["response"]["body"]["numOfRows"],
        "pageNo": result[0]["response"]["body"]["pageNo"],
        "total": result[0]["response"]["body"]["totalCount"],
    }


@router.get(
    path="/search",
    summary="",
    description="",
    response_description="",
)
async def search_disability_jobs(
    search: str,
    service: DisabilityService = Depends(get_disability_service),
    db: Session = Depends(get_db),
) -> dict[str, Any]:
    result = await service.search_disability_jobs(db, search)
    return {
        "data": result,
        "total": len(result),
    }


@router.get(
    path="/workers",
    summary="",
    description="",
    response_description="",
)
async def disability_workers(
    service: DisabilityService = Depends(get_disability_service),
    db: Session = Depends(get_db),
) -> dict:
    result = await service.get_disability_workers_list(db)
    return result
