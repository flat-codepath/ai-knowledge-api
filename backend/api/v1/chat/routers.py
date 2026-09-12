from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from backend.api.v1.chat import schemas, services
from backend.core.database import get_db

router = APIRouter()

def handle_llm_exception(e: Exception):
    err_str = str(e).lower()
    if "429" in err_str or "quota" in err_str or "resource_exhausted" in err_str or "disconnected" in err_str:
        return HTTPException(status_code=429, detail="LLM Rate Limit Exceeded: You have exceeded your API quota. Please try again later or check your billing details.")
    elif "401" in err_str or "403" in err_str or "api_key_invalid" in err_str or "api key required" in err_str:
        return HTTPException(status_code=401, detail="Invalid or Missing LLM API Key: Please check your GEMINI_API_KEY in the backend configuration.")
    else:
        return HTTPException(status_code=500, detail=str(e))

@router.post("/ingest", response_model=schemas.IngestResponse)
def ingest_content(request: schemas.IngestRequest, db: Session = Depends(get_db)):
    if request.source_type not in ["text", "url"]:
        raise HTTPException(status_code=400, detail="Invalid source type. Must be 'text' or 'url'")
    if request.source_type == "text" and not request.content:
        raise HTTPException(status_code=400, detail="Content is required for text source")
    if request.source_type == "url" and not request.url:
        raise HTTPException(status_code=400, detail="URL is required for url source")

    try:
        return services.ingest_item(db=db, request=request)
    except Exception as e:
        raise handle_llm_exception(e)

@router.get("/items", response_model=List[schemas.ItemResponse])
def get_items(db: Session = Depends(get_db)):
    return services.get_items(db=db)

@router.post("/query", response_model=schemas.QueryResponse)
def query_knowledge(request: schemas.QueryRequest):
    try:
        return services.query_knowledge(request=request)
    except Exception as e:
        raise handle_llm_exception(e)
