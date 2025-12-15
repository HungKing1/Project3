from pydantic import BaseModel
from typing import Optional, Dict, Any

# Định dạng dữ liệu người dùng gửi lên
class UserQuery(BaseModel):
    text: str

# Định dạng dữ liệu trả về (Các bộ lọc tìm được)
class SearchResult(BaseModel):
    filters: Dict[str, Any]  # Ví dụ: {"salary": 6, "city": 1, "industry": 3}
    detected_intent: str = "search"
    debug_info: Optional[Dict[str, Any]] = None