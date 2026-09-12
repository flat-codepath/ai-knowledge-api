from sqlalchemy.orm import Session
from backend.api.v1.chat import models, schemas
from backend.ai.retrievers.chroma import add_documents_to_store
from backend.ai.chains.rag import query_rag
from langchain_community.document_loaders import UnstructuredURLLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_core.documents import Document

def ingest_item(db: Session, request: schemas.IngestRequest):
    # 1. Create DB record
    db_item = models.Item(
        source_type=request.source_type,
        content=request.content,
        url=request.url
    )
    db.add(db_item)
    db.commit()
    db.refresh(db_item)

    # 2. Extract content and chunk
    documents = []
    source = f"item_{db_item.id}"
    
    if request.source_type == "url" and request.url:
        loader = UnstructuredURLLoader(
            urls=[request.url],
            headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"}
        )
        raw_docs = loader.load()
        for d in raw_docs:
            d.metadata["source"] = request.url
        documents.extend(raw_docs)
    elif request.source_type == "text" and request.content:
        documents.append(Document(page_content=request.content, metadata={"source": "Text Note"}))

    if documents:
        text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=100)
        chunks = text_splitter.split_documents(documents)
        
        # 3. Add to Chroma
        add_documents_to_store(chunks)

    return schemas.IngestResponse(id=db_item.id, message="Successfully ingested")

def get_items(db: Session):
    return db.query(models.Item).order_by(models.Item.created_at.desc()).all()

def query_knowledge(request: schemas.QueryRequest):
    return query_rag(request.question)

