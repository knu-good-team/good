from typing import Any

from fastapi import APIRouter, Depends

from dependencies import get_disability_jobs_service


router = APIRouter()


@router.get(
    path="",
    summary="",
    description="",
    response_description="",
)
async def disability_jobs(
    service=Depends(get_disability_jobs_service),
) -> Any:
    result = await service.get_disability_jobs_list()
    return result
