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
    idx: int = 226483,                                                  ##임의의 idx값 지정(추후에는 클릭한 취업정보의 idx값을 가져와야함)
    service: PublicJobsService=Depends(get_public_jobs_service),
) -> Any:
    detail_info=await service.get_detail_public_jobs_list(idx)
    
    return {"data" : detail_info,}
    