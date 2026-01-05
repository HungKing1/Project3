import uvicorn
from fastapi import FastAPI
from app.schemas import UserQuery, SearchResult
from app.rag_engine import rag_engine

app = FastAPI(title="AI Job Search Service")

@app.get("/")
def health_check():
    return {"status": "ok", "message": "AI Service is running"}

@app.post("/api/predict", response_model=SearchResult)
def predict_filters(query: UserQuery):
    """
    Nhận câu text -> Trả về bộ lọc (IDs)
    """
    user_text = query.text
    print(f"Nhận query: {user_text}")
    
    filters, debug_info = rag_engine.search(user_text)
    
    return {
        "filters": filters,
        "detected_intent": "search_job",
        "debug_info": debug_info
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)