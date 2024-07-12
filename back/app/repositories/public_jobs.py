from typing import Any, List
from fastapi import HTTPException
from pymysql import OperationalError
from sqlalchemy.orm import Session

from app.model.public_jobs import PublicJobsModel


class PublicJobsRepository:
    def __init__(self) -> None:
        pass

    async def get_public_jobs_list(db: Session) -> Any:                    ##DB에서 결과값 가져오기
        try:
            result = db.query(PublicJobsModel).limit(200).all()
            return result
        except OperationalError as e:
            raise HTTPException(status_code=500, detail=str(e))
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))
        
    
        
    