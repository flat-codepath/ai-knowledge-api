# from langchain_community.vectorstores import Chromar
from langchain_chroma import Chroma
from backend.ai.llm import get_embeddings
from backend.core.config import settings

def get_vector_store():
    embeddings = get_embeddings()
    vector_store = Chroma(
        persist_directory=settings.CHROMA_PERSIST_DIRECTORY,
        embedding_function=embeddings
    )
    return vector_store

def add_documents_to_store(documents):
    vector_store = get_vector_store()
    vector_store.add_documents(documents)
    # Chroma automatically persists if instantiated with persist_directory
