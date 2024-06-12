from datetime import datetime
from pydantic import BaseModel


class DisabilityJobs(BaseModel):
    연번: int = 1
    구인신청일자: str | None = ""
    모집기간: str | None = ""
    사업장명: str | None = ""
    모집직종: str | None = ""
    고용형태: str | None = ""
    임금형태: str | None = ""
    임금: float | None = 0.0
    입사형태: str | None = ""
    요구경력: str | None = ""
    요구학력: str | None = ""
    전공계열: str | None = ""
    요구자격증: str | None = ""
    사업장주소: str | None = ""
    기업형태: str | None = ""
    담당기관: str | None = ""
    등록일: str | None = ""
    연락처: str | None = ""

class DisabilityWorkers(BaseModel):
    연번: int = 1
    연령대: str | None = ""
    희망지역: str | None = ""
    희망직종: str | None = ""
    희망임금: str | None = ""
    장애유형: str | None = ""
    중증여부: str | None = ""
    기관여부: str | None = ""
