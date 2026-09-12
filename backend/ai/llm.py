import os
# from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain_google_genai import ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings
from backend.core.config import settings

def get_embeddings():
    # return OpenAIEmbeddings(openai_api_key=settings.OPENAI_API_KEY)
    return GoogleGenerativeAIEmbeddings(google_api_key=settings.GEMINI_API_KEY,  model="gemini-embedding-001",)

def get_llm():
    # return ChatOpenAI(openai_api_key=settings.OPENAI_API_KEY, model_name="gpt-3.5-turbo", temperature=0)
    return ChatGoogleGenerativeAI(google_api_key=settings.GEMINI_API_KEY, model="gemini-3.8-flash", temperature=0)