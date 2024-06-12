from sqlalchemy import BIGINT, Column, TEXT, null
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class DisabilityWorkersModel(Base):
    __tablename__ = "disability_workers"

    연번 = Column(BIGINT, primary_key=True, index=True)
    연령대 = Column(TEXT, nullable=True, default=null)
    희망지역 = Column(TEXT, nullable=True, default=null)
    희망직종 = Column(TEXT, nullable=True, default=null)
    희망임금 = Column(TEXT, nullable=True, default=null)
    장애유형 = Column(TEXT, nullable=True, default=null)
    중증여부 = Column(TEXT, nullable=True, default=null)
    기관분류 = Column(TEXT, nullable=True, default=null)