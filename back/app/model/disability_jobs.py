from sqlalchemy import BIGINT, Column, TEXT, INT, DateTime, Double, null
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class DisabilityJobsModel(Base):
    __tablename__ = "disability_jobs"

    연번 = Column(BIGINT, primary_key=True, index=True)
    구인신청일자 = Column(TEXT, nullable=True, default=null)
    모집기간 = Column(TEXT, nullable=True, default=null)
    사업장명 = Column(TEXT, nullable=True, default=null)
    모집직종 = Column(TEXT, nullable=True, default=null)
    고용형태 = Column(TEXT, nullable=True, default=null)
    임금형태 = Column(TEXT, nullable=True, default=null)
    임금 = Column(Double, nullable=True, default=null)
    입사형태 = Column(TEXT, nullable=True, default=null)
    요구경력 = Column(TEXT, nullable=True, default=null)
    요구학력 = Column(TEXT, nullable=True, default=null)
    전공계열 = Column(TEXT, nullable=True, default=null)
    요구자격증 = Column(TEXT, nullable=True, default=null)
    사업장주소 = Column(TEXT, nullable=True, default=null)
    기업형태 = Column(TEXT, nullable=True, default=null)
    담당기관 = Column(TEXT, nullable=True, default=null)
    등록일 = Column(TEXT, nullable=True, default=null)
    연락처 = Column(TEXT, nullable=True, default=null)
