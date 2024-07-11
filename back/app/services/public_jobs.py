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
        result, total_count = await self.public_jobs_repo.get_public_jobs_list(db)
        resp_list = [resp.to_dict() for resp in result]
        for resp in resp_list:
            for key, value in resp.items():
                if key == "areaCode":
                    a = value.replace("'", '"')
                    resp[key] = json.loads(a)
        total_result = {"":resp_list, "total count : " : total_count}
        return total_result

    async def get_detail_public_jobs_list(self, idx: int) -> Any:
        settings = get_settings()
        url = 'http://openapi.mpm.go.kr/openapi/service/RetrievePblinsttEmpmnInfoService/getItem'
        
        params = {
            'serviceKey': settings.OPENDATA_API_KEY,
            'idx': idx
        }
        
        async with aiohttp.ClientSession() as session:
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
                'areaNm': item.find('areaNm').text,
                'contents': item.find('contents').text,
                'deptCode': item.find('deptCode').text,
                'deptName': item.find('deptName').text,
                'empmnsn': item.find('empmnsn').text,
                'enddate': enddate_str,
                'link01': item.find('link01').text,
                'moddate': item.find('moddate').text,
                'readnum': item.find('readnum').text,
                'regdate': item.find('regdate').text,
                'title': item.find('title').text,
                'type01': item.find('type01').text,
                'type02': item.find('type02').text,
                'typeinfo02': item.find('typeinfo02').text,
                'userid': item.find('userid').text,
                'username': item.find('username').text,
                'd_day' : d_day
            }
            detail_info.append(detail)
        
        return detail_info
        
