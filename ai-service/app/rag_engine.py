import chromadb
from chromadb.utils import embedding_functions
import os

PERSIST_DIRECTORY = "chroma_db"

class RagEngine:
    def __init__(self):
        # Khởi tạo client kết nối DB đã tạo ở bước ingest
        if not os.path.exists(PERSIST_DIRECTORY):
            print(f"⚠️ Cảnh báo: Chưa tìm thấy folder {PERSIST_DIRECTORY}. Hãy chạy script ingest_data.py trước!")
        
        self.client = chromadb.PersistentClient(path=PERSIST_DIRECTORY)
        self.emb_fn = embedding_functions.SentenceTransformerEmbeddingFunction(model_name="all-MiniLM-L6-v2")
        
        # Danh sách các collection cần search (Key map với output json)
        self.collections_map = {
            "city": "cities",
            "district": "districts",
            "education": "educations",
            "experience": "experiences",
            "industry": "industries",
            "job_level": "job_levels",
            "salary": "salaries",
            "work_type": "work_types"
            # "ward": "wards" (Thường Ward quá chi tiết, có thể search sau nếu cần)
        }
        
        # Load sẵn các collection vào memory để search cho nhanh
        self.cols = {}
        for key, col_name in self.collections_map.items():
            try:
                self.cols[key] = self.client.get_collection(col_name, embedding_function=self.emb_fn)
            except Exception:
                print(f"⚠️ Không load được collection: {col_name}")

    def search(self, text: str, threshold: float = 0.35):
        """
        Input: "Tìm việc lương 20 triệu ở Hà Nội"
        Output: {"salary": 6, "city": 1}
        """
        results = {}
        debug_logs = {}

        for key, col in self.cols.items():
            # Query top 1 ứng cử viên sáng giá nhất
            res = col.query(query_texts=[text], n_results=1)
            
            if res['ids'] and res['distances']:
                distance = res['distances'][0][0]
                matched_item = res['metadatas'][0][0]
                
                # Logic quan trọng: Ngưỡng (Threshold)
                # Distance càng nhỏ càng giống (0 là giống hệt)
                # Nếu > threshold nghĩa là người dùng không nhắc đến mục này
                if distance < threshold:
                    results[key] = matched_item['db_id']
                    debug_logs[key] = {
                        "text": matched_item['original_text'],
                        "distance": round(distance, 4)
                    }
        
        return results, debug_logs

# Tạo singleton để dùng chung
rag_engine = RagEngine()