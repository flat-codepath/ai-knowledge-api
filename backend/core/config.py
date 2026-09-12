from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    PROJECT_NAME: str = "AI Knowledge Inbox"
    API_V1_STR: str = "/api/v1"
    
    # OpenAI settings
    # OPENAI_API_KEY: str = ""
    
    # Gemini settings
    GEMINI_API_KEY: str = ""
    
    # Database settings
    DATABASE_URL: str = "sqlite:///./backend/sqlite_db"
    
    # Chroma settings
    CHROMA_PERSIST_DIRECTORY: str = "./backend/chroma_db"
    
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

settings = Settings()