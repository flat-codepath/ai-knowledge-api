FROM python:3.11-slim

WORKDIR /app

# Install build dependencies for chroma and unstructured
RUN apt-get update && apt-get install -y \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the backend code, making sure it sits at /app/backend to match the import paths
# Wait, if we copy to /app/backend, then from /app we run `uvicorn backend.main:app`
COPY . /app/backend

ENV PYTHONPATH=/app

# CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8000"]
CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
