import requests
import pandas as pd
import xml.etree.ElementTree as ET
import html
import json

# URL to fetch JSON data
url = 'http://127.0.0.1:8000/'

# Fetch the data
response = requests.get(url)
data = response.json()

# Convert JSON data to DataFrame
df = pd.DataFrame(data)

# Get the 'idx' value of the first entry
first_idx_value = int(df.iloc[0]['idx'])

# Display the 'idx' value
print(first_idx_value)

url = 'http://openapi.mpm.go.kr/openapi/service/RetrievePblinsttEmpmnInfoService/getItem'
params ={'serviceKey' : 'zTwOLXmR0DJchrdft0su31g4x0oyiSQtY9zXDV6BCygqAdZ9GJ+UYtAJTw5XImJ3TIKiaZrthtCwPox2itopmg==',
          'idx' : first_idx_value }

response = requests.get(url, params=params)

root = ET.fromstring(response.content)

# 요소의 텍스트를 재귀적으로 디코드하는 함수
def decode_element(element):
    for child in element:
        if child.text:
            child.text = html.unescape(child.text)
        decode_element(child)

# XML 콘텐츠를 디코드합니다
decode_element(root)

# XML을 더 쉽게 접근할 수 있도록 딕셔너리로 변환합니다
def xml_to_dict(element):
    if len(element) == 0:
        return element.text
    return {child.tag: xml_to_dict(child) for child in element}

response_dict = xml_to_dict(root)

# item 안에 있는 내용만 추출합니다
item_content = response_dict.get('body', {}).get('item', {})

# item 내용을 JSON 형식으로 출력합니다
print("item 내용:", json.dumps(item_content, ensure_ascii=False, indent=2))
