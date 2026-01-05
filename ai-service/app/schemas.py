from pydantic import BaseModel
from typing import Optional, Dict, Any

class UserQuery(BaseModel):
    text: str

class SearchResult(BaseModel):
    filters: Dict[str, Any]  # Ví dụ: {"salary": 6, "city": 1, "industry": 3}
    detected_intent: str = "search"
    debug_info: Optional[Dict[str, Any]] = None