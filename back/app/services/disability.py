import asyncio
from datetime import datetime
import requests
import xmltodict
from typing import Any, List
from sqlalchemy.orm import Session

from app.core.config import get_settings
from app.repositories.disability_jobs import DisailityRepository


class DisabilityService:
    def __init__(self, disability_repo: DisailityRepository) -> None:
        self.disability_repo = disability_repo

    async def get_disability_jobs_list(self, db: Session) -> Any:
        resp = await self.disability_repo.get_disability_jobs_list(db)
        resp_list = [resp.to_dict() for resp in resp]
        return resp_list

    async def get_disability_jobs_real_time(
        self,
    ) -> Any:
        settings = get_settings()
        jobListApiUrl = f"http://apis.data.go.kr/B552583/job/job_list_env?serviceKey={settings.OPENDATA_API_KEY}&pageNo=1&numOfRows=1000"
        result = await asyncio.gather(fetch_disability_jobs_list(jobListApiUrl))
        resp = result[0]["response"]["body"]["items"]["item"]

        def transform_and_calculate_d_day(item):
            if "termDate" in item:
                start_date, end_date = item["termDate"].split("~")
                d_day = (datetime.strptime(end_date, "%Y-%m-%d") - datetime.now()).days
                if d_day >= 1:
                    item["termDate"] = {
                        "start_date": start_date,
                        "end_date": end_date,
                        "d_day": d_day,
                    }
                    return item
            return None
        # 'termDate' 변환 및 'd_day' 계산 후 필터링과 정렬
        filtered_and_sorted_resp = sorted(
            filter(None, (transform_and_calculate_d_day(item) for item in resp)),
            key=lambda x: x["termDate"]["d_day"]
        )
        return filtered_and_sorted_resp, result

    async def get_disability_convenient_facilities(self, faclNm) -> Any:
        settings = get_settings()
        faclNm = "용인세브란스병원"
        # faclNm = "(주)이맥솔루션"
        disability_convenient_facilities_url = f"http://apis.data.go.kr/B554287/DisabledPersonConvenientFacility/getDisConvFaclList?serviceKey={settings.OPENDATA_API_KEY}&faclNm={faclNm}"
        result = await asyncio.gather(fetch_disability_jobs_list(disability_convenient_facilities_url))

        if result[0]["facInfoList"]["totalCount"] == "0":
            return "해당하는 편의시설이 없습니다."
        else:
            wfcltId = result[0]["facInfoList"]["servList"]["wfcltId"]
            disability_convenient_info_list_url = f"http://apis.data.go.kr/B554287/DisabledPersonConvenientFacility/getFacInfoOpenApiJpEvalInfoList?serviceKey={settings.OPENDATA_API_KEY}&wfcltId={wfcltId}"
            result = await asyncio.gather(fetch_disability_jobs_list(disability_convenient_info_list_url))
            return result

    async def search_disability_jobs(self, db: Session, search: str) -> Any:
        resp = await self.disability_repo.search_disability_jobs(db, search)
        resp_list = [resp.to_dict() for resp in resp]
        return resp_list

    async def get_disability_workers_list(self, db: Session) -> Any:
        resp = await self.disability_repo.get_disability_workers_list(db)
        resp_list = [resp.to_dict() for resp in resp]
        # 연령대별 희망직종 카운트를 저장할 딕셔너리 생성
        age_group_job_counts = {}

        # 데이터를 순회하면서 연령대별 희망직종 카운트
        for entry in resp_list:
            age_group = entry["연령대"]
            job = entry["희망직종"]

            if age_group not in age_group_job_counts:
                age_group_job_counts[age_group] = {}

            if job not in age_group_job_counts[age_group]:
                age_group_job_counts[age_group][job] = 0

            age_group_job_counts[age_group][job] += 1

        # 희망직종이 50 이하인 경우 기타로 통합
        for age_group in age_group_job_counts:
            temp_counts = {}
            for job, count in age_group_job_counts[age_group].items():
                if count <= 50:
                    if "기타" not in temp_counts:
                        temp_counts["기타"] = 0
                    temp_counts["기타"] += count
                else:
                    temp_counts[job] = count
            age_group_job_counts[age_group] = temp_counts
        return age_group_job_counts


async def fetch_disability_jobs_list(url) -> Any:
    res = requests.get(url, verify=False)
    if res.status_code == 200:
        json_data = xmltodict.parse(res.text)
        return json_data
    else:
        return None
