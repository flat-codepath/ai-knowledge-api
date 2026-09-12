from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class IngestRequest(BaseModel):
    source_type: str # "text" or "url"
    content: Optional[str] = None
    url: Optional[str] = None

class IngestResponse(BaseModel):
    id: int
    message: str

class ItemResponse(BaseModel):
    id: int
    source_type: str
    content: Optional[str] = None
    url: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True

class QueryRequest(BaseModel):
    question: str

class QueryResponse(BaseModel):
    answer: str
    sources: List[str]
