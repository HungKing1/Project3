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
        self.emb_fn = embedding_functions.SentenceTransformerEmbeddingFunction(model_name="paraphrase-multilingual-MiniLM-L12-v2")
        

        self.collections_config = {
            "city": {
                "col_name": "cities", 
                "threshold": 0.25  # Tên thành phố thường chính xác, cần ngưỡng thấp để tránh nhiễu
            },
            "district": {
                "col_name": "districts", 
                "threshold": 0.25 
            },
            "work_type": {
                "col_name": "work_types", 
                "threshold": 0.30  # Full-time/Part-time ít biến thể
            },
            "salary": {
                "col_name": "salaries", 
                "threshold": 0.30 
            },
            "job_level": {
                "col_name": "job_levels", 
                "threshold": 0.35 
            },
            "education": {
                "col_name": "educations", 
                "threshold": 0.40 
            },
            "industry": {
                "col_name": "industries", 
                "threshold": 0.45 # Ngành nghề có nhiều cách gọi (IT vs CNTT), cần nới lỏng
            },
            "experience": {
                "col_name": "experiences", 
                "threshold": 0.45 # "Mới ra trường" vs "Không kinh nghiệm" cần vector rộng hơn
            }
        }

        # 3. Load collections vào memory
        self.cols = {}
        for key, config in self.collections_config.items():
            col_name = config["col_name"]
            try:
                self.cols[key] = self.client.get_collection(col_name, embedding_function=self.emb_fn)
            except Exception:
                print(f"⚠️ Không load được collection: {col_name}")

    def search(self, text: str):
        """
        Input: "Tìm việc lương 20 triệu ở Hà Nội"
        Output: {"salary": 6, "city": 1}
        """
        results = {}
        debug_logs = {}

        for key, col in self.cols.items():
            #Lấy ngưỡng 
            current_threshold = self.collections_config[key]["threshold"]
            # Query top 1 ứng cử viên sáng giá nhất
            res = col.query(query_texts=[text], n_results=1)
            
            if res['ids'] and res['distances']:
                distance = res['distances'][0][0]
                matched_item = res['metadatas'][0][0]
                
                # Logic quan trọng: Ngưỡng (Threshold)
                # Distance càng nhỏ càng giống (0 là giống hệt)
                # Nếu > threshold nghĩa là người dùng không nhắc đến mục này
                if distance < current_threshold:
                    results[key] = matched_item['db_id']
                    debug_logs[key] = {
                        "text": matched_item['original_text'],
                        "distance": round(distance, 4),
                        "threshold_used": current_threshold, # Log luôn threshold đã dùng
                        "status": "ACCEPTED"
                    }
                else:
                  # debug_logs[key] = {
                  #     "matched_text": matched_item['original_text'],
                  #     "distance": round(distance, 4),
                  #     "threshold_used": current_threshold,
                  #     "status": "REJECTED"
                  # }
                  pass
        return results, debug_logs

# Tạo singleton để dùng chung
rag_engine = RagEngine()