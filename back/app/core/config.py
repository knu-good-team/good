from functools import lru_cache
import os

from dotenv import load_dotenv


load_dotenv()


class Settings:
    API_V1_STR: str = "/v1"
    PROJECT_NAME: str = "good"
    ALLOW_ORIGINS: list[str] = [
        "*",  # TODO 나중에 쓰는 서버 ip로 바꿀 것
        # 'http://127.0.0.1:3000',
        # 'http://localhost',
    ]
    ROOT_PATH = "/dev"
    ROOT_PRODUCT_PATH = "/product"

    HOST = os.environ["LOCAL_ENDPOINT"]
    PW = os.environ["LOCAL_PW"]
    USER = os.environ["LOCAL_USER"]
    DB_NAME = os.environ["LOCAL_DB_NAME"]
    OPENDATA_API_KEY = os.environ["OPENDATA_API_KEY"]


@lru_cache()
def get_settings() -> Settings:
    return Settings()
