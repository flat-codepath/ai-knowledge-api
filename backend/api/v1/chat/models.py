from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.sql import func
from backend.core.database import Base

class Item(Base):
    __tablename__ = "items"

    id = Column(Integer, primary_key=True, index=True)
    source_type = Column(String, index=True) # "text" or "url"
    content = Column(Text)
    url = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
