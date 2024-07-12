import json
from typing import Any, List
import aiohttp
from fastapi import requests
from sqlalchemy.orm import Session
import xml.etree.ElementTree as ET

from app.core.config import get_settings
from app.repositories.public_jobs import PublicJobsRepository
import urllib.parse
from datetime import datetime



class PublicJobsService:
    def __init__(self, public_jobs_repo: PublicJobsRepository) -> None:
        self.public_jobs_repo = public_jobs_repo

    async def get_public_jobs_list(self, db: Session) -> Any:
        result = await self.public_jobs_repo.get_public_jobs_list(db)
        resp_list = [resp.to_dict() for resp in result]
        for resp in resp_list:
            for key, value in resp.items():
                if key == "areaCode":
                    a = value.replace("'", '"')
                    resp[key] = json.loads(a)


        return resp_list

    async def get_detail_public_jobs_list(self, idx: int) -> Any:
        settings = get_settings()
        url = 'http://openapi.mpm.go.kr/openapi/service/RetrievePblinsttEmpmnInfoService/getItem'
        
        params = {
            'serviceKey': settings.OPENDATA_API_KEY,
            'idx': idx
        }
        print(idx)
        async with aiohttp.ClientSession() as session:                                  ##idx값에 따라 값 가져옴
            async with session.get(url, params=params) as response:
                if response.status != 200:
                    raise Exception("Failed to fetch data from external API")
                content = await response.text()
        
        root = ET.fromstring(content)
        
        now = datetime.now() ##날짜 지정
        today = now.date()
        
        detail_info = []
        for item in root.findall('.//item'):
            enddate_str = item.find('enddate').text
            enddate = datetime.strptime(enddate_str, "%Y%m%d").date()  # 날짜 형식에 맞게 파싱
            d_day = (enddate - today).days

            detail = {
                'areaCode': item.find('areaCode').text,
                'areaNm': item.find('areaNm').text if item.find('areaNm') is not None else '',
                'contents': item.find('contents').text if item.find('contents') is not None else '',
                'deptCode': item.find('deptCode').text if item.find('deptCode') is not None else '',
                'deptName': item.find('deptName').text if item.find('deptName') is not None else '',
                'empmnsn': item.find('empmnsn').text if item.find('empmnsn') is not None else '',
                'enddate': enddate_str,
                'link01': item.find('link01').text if item.find('link01') is not None else '',
                'moddate': item.find('moddate').text if item.find('moddate') is not None else '',
                'readnum': item.find('readnum').text if item.find('readnum') is not None else '',
                'regdate': item.find('regdate').text if item.find('regdate') is not None else '',
                'title': item.find('title').text,
                'type01': item.find('type01').text if item.find('type01') is not None else '',
                'type02': item.find('type02').text if item.find('type02') is not None else '',
                'typeinfo02': item.find('typeinfo02').text if item.find('typeinfo02') is not None else '',
                'userid': item.find('userid').text if item.find('userid') is not None else '',
                'username': item.find('username').text if item.find('username') is not None else '',
                'd_day' : d_day
            }
            detail_info.append(detail)
        
        return detail_info
        
