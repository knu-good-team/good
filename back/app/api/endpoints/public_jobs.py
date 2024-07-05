from typing import Any
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.services.public_jobs import PublicJobsService
from dependencies import get_db, get_public_jobs_service


router = APIRouter()


@router.get(
    "/jobs",
)
async def first_get(
    service: PublicJobsService = Depends(get_public_jobs_service),
    db: Session = Depends(get_db),
) -> Any:
    result = await service.get_public_jobs_list(db)
    return {
        "data": result,
    }

@router.get(
    "/job_detail",
)
async def second_get(
    idx: int = 227097,
    service: PublicJobsService=Depends(get_public_jobs_service),
) -> Any:
    detail_info=await service.get_detail_public_jobs_list(idx)
    print(idx)
    return {"data" : detail_info,}
    