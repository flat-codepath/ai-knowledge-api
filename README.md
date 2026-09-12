## Design Decisions & Tradeoffs

**RAG Architecture**
The application uses a Retrieval-Augmented Generation (RAG) approach instead of sending the entire Wikipedia article directly to Gemini. The article is processed into smaller chunks, stored in the local database, and relevant chunks are retrieved when the user asks a question.
*This helps reduce the amount of context sent to the LLM and makes the application more scalable for larger documents.*

**Local Database**
A local database (ChromaDB + SQLite) is used to store the ingested content and its embeddings. This keeps the project simple to run locally and avoids requiring an external database service during evaluation.
*Tradeoff: A local database is convenient for development and evaluation, but it would need to be replaced or configured differently for a production environment with multiple users or large amounts of data.*

**Google Gemini**
Google Gemini is used as the LLM for generating answers from the retrieved context.
*Tradeoff: Using Gemini provides strong generative capabilities with a relatively simple integration, but it introduces a dependency on an external API and requires a Gemini Developer API key.*

**Wikipedia as the Data Source**
The application accepts Wikipedia URLs as its initial knowledge source. This provides a simple and publicly accessible way to test the ingestion and retrieval pipeline without requiring users to prepare documents manually.
*Tradeoff: The current implementation is focused on Wikipedia content rather than supporting arbitrary document formats such as PDFs, Word documents, or web pages.*

**Docker**
Docker Compose is used to run the frontend and backend consistently in a local environment.
This simplifies setup by avoiding the need to manually configure multiple services and ensures that the application can be run using a single command: `docker-compose up --build`.

**Scope and Simplicity**
The implementation prioritizes a clear end-to-end RAG workflow:
`Wikipedia URL` → `Content ingestion` → `Chunking/Storage` → `Retrieval` → `Gemini` → `Answer`

The project is intentionally kept simple so that the core RAG functionality is easy to understand, run, and evaluate. In a production system, additional considerations such as authentication, persistent cloud storage, caching, monitoring, rate limiting, and improved error handling would be appropriate.

---

## Simple Run Instructions

To run this locally, you'll need a free Gemini Developer API key from [Google AI Studio](https://aistudio.google.com/). 

**1. Set up your API key**
- Go into the `backend` folder and create a new file called `.env`
- Paste your key in there like this:
```env
GEMINI_API_KEY=your_key_goes_here
```

**2. Boot it up**
Run this in your terminal from the root folder:
```bash
docker-compose up --build
```

**3. Try it out**
1. Open up the frontend at `http://localhost:5173`
2. Paste a Wikipedia link and hit Ingest.
3. Start asking questions!

*(Backend API docs are available at `http://localhost:8000/docs`)*
