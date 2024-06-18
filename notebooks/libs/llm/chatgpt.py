import os
import httpx

from langchain_openai import ChatOpenAI
from getpass import getpass

if os.environ.get('OPENAI_API_KEY') is None:
    os.environ['OPENAI_API_KEY'] = getpass('请输入你的openai key: ')

chatgpt = ChatOpenAI(
    model="gpt-3.5-turbo",
    temperature=0.8,
    api_key=os.environ['OPENAI_API_KEY'],
    http_client=httpx.Client(proxy='http://localhost:7890')
)
