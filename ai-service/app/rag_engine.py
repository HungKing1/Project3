import chromadb
from chromadb.utils import embedding_functions
import os
import json
import time 
import logging
from google import genai
from google.genai import types
from dotenv import load_dotenv

# 1. Cấu hình môi trường và Logging
load_dotenv()

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# --- CẤU HÌNH ---
PERSIST_DIRECTORY = "chroma_db"

# Lấy API Key và Model Name từ .env
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
if not GOOGLE_API_KEY:
    raise ValueError("❌ Lỗi: Chưa tìm thấy GOOGLE_API_KEY trong file .env")

MODEL_NAME = os.getenv("GEMINI_MODEL_NAME")

class SemanticRouter:
    def __init__(self):
        # Khởi tạo Client theo chuẩn mới của thư viện google-genai
        self.client = genai.Client(api_key=GOOGLE_API_KEY)
        self.model_name = MODEL_NAME
        logger.info(f"⚡ [Router] Initialized with model: {self.model_name}")

    def route_query(self, user_query: str):
        """
        Gửi câu hỏi lên Gemini để bóc tách thành JSON
        """
        prompt = f"""
        Bạn là một API trích xuất thực thể (Entity Extraction) cho hệ thống tìm việc làm.
        Nhiệm vụ: Phân tích câu hỏi của người dùng và trích xuất thông tin vào định dạng JSON.

        Các trường dữ liệu cần trích xuất (key):
        - city: Thành phố (VD: Hà Nội, Hồ Chí Minh, Đà Nẵng...)
        - district: Quận/Huyện (VD: Cầu Giấy, Quận 1...)
        - industry: Ngành nghề/Vị trí (VD: Marketing, IT, Kế toán...)
        - salary: Mức lương (VD: 10 triệu, 500$, Thỏa thuận...)
        - work_type: Hình thức (VD: Fulltime, Parttime, Remote...)
        - experience: Kinh nghiệm (VD: 1 năm, Mới ra trường...)
        - job_level: Cấp bậc (VD: Nhân viên, Trưởng phòng...)
        - education: Trình độ (VD: Đại học, Cao đẳng...)

        Yêu cầu xử lý:
        1. Nếu người dùng dùng từ viết tắt hoặc tiếng lóng (VD: "HN", "SG", "20 củ", "1k$"), hãy chuẩn hóa lại về dạng text chuẩn tiếng Việt.
        2. Nếu không tìm thấy thông tin cho trường nào, hãy để giá trị là null.
        3. Chỉ trả về chuỗi JSON thuần túy, không kèm Markdown (```json).

        Input User: "{user_query}"
        JSON Output:
        """

        MAX_RETRIES = 2
        
        for attempt in range(1, MAX_RETRIES + 1):
            try:
                logger.info(f"🚀 [Router] Attempt {attempt}/{MAX_RETRIES}: Calling Gemini ({self.model_name})...")
                
                # Gọi API theo cú pháp mới của google-genai
                response = self.client.models.generate_content(
                    model=self.model_name,
                    contents=prompt,
                    config=types.GenerateContentConfig(
                        temperature=0.1 # Giảm sáng tạo để JSON chính xác hơn
                    )
                )

                if not response.text:
                    logger.warning(f"⚠️ [Router] Empty response from Gemini.")
                    return {}

                raw_text = response.text.strip()

                # Làm sạch markdown (nếu có)
                cleaned_text = raw_text.replace("```json", "").replace("```", "").strip()

                # Parse JSON
                data = json.loads(cleaned_text)
                
                logger.info(f"✅ [Router] Success! Extracted: {data}")
                return data

            except json.JSONDecodeError as e:
                logger.error(f"❌ [Router] JSON Error: {e}")
                logger.error(f"   Raw Text: '{raw_text}'")
                
            except Exception as e:
                logger.error(f"🔥 [Router] Unexpected Error: {e}")
                time.sleep(1) # Nghỉ 1s trước khi retry

        logger.error("💀 [Router] Failed after all retries.")
        return {}

class RagEngine:
    def __init__(self):
        # Khởi tạo client kết nối ChromaDB
        if not os.path.exists(PERSIST_DIRECTORY):
            logger.warning(f"⚠️ Cảnh báo: Chưa tìm thấy folder {PERSIST_DIRECTORY}. Hãy chạy script ingest_data.py trước!")
        
        self.client = chromadb.PersistentClient(path=PERSIST_DIRECTORY)
        
        # Model Embedding (Phải khớp với model lúc ingest)
        self.emb_fn = embedding_functions.SentenceTransformerEmbeddingFunction(
            model_name="paraphrase-multilingual-MiniLM-L12-v2"
        )
        
        # Khởi tạo Router
        self.router = SemanticRouter()

        # Cấu hình ngưỡng (Threshold) - GIỮ NGUYÊN NHƯ YÊU CẦU
        self.collections_config = {
            "city": {"col_name": "cities", "threshold": 0.25},
            "district": {"col_name": "districts", "threshold": 0.25},
            "work_type": {"col_name": "work_types", "threshold": 0.30},
            "salary": {"col_name": "salaries", "threshold": 0.30},
            "job_level": {"col_name": "job_levels", "threshold": 0.35},
            "education": {"col_name": "educations", "threshold": 0.40},
            "industry": {"col_name": "industries", "threshold": 0.45},
            "experience": {"col_name": "experiences", "threshold": 0.45}
        }
        
        # Load các collection vào memory
        self.cols = {}
        for key, config in self.collections_config.items():
            col_name = config["col_name"]
            try:
                self.cols[key] = self.client.get_collection(col_name, embedding_function=self.emb_fn)
            except Exception:
                # logger.warning(f"⚠️ Không load được collection: {col_name}")
                pass

    def search(self, text: str):
        """
        Logic Search Level 5:
        1. Gọi Router lấy JSON.
        2. Dùng Value trong JSON search vào Collection tương ứng.
        3. Áp dụng Threshold đã cấu hình.
        """
        results = {}
        debug_logs = {}

        # B1: Gọi Gemini Router
        print(f"🤖 Calling Gemini for: {text}") # Print để dễ nhìn trên console ngoài log
        extracted_data = self.router.route_query(text)
        debug_logs["router_output"] = extracted_data
        
        if not extracted_data:
            return {}, {"error": "Router could not extract data"}

        # B2: Loop qua cấu hình (Targeted Search)
        for key, config in self.collections_config.items():
            
            # 1. Lấy giá trị từ kết quả Router
            extracted_value = extracted_data.get(key)
            
            # Nếu Router trả về null hoặc rỗng -> Bỏ qua
            if not extracted_value:
                continue 

            # 2. Lấy collection
            col = self.cols.get(key)
            if not col:
                continue

            # 3. Lấy threshold quy định
            current_threshold = config["threshold"]

            # 4. QUERY VECTOR (Dùng extracted_value để search)
            res = col.query(query_texts=[extracted_value], n_results=1)
            
            if res['ids'] and res['distances']:
                distance = res['distances'][0][0]
                matched_item = res['metadatas'][0][0]
                
                # 5. So sánh với Threshold
                if distance < current_threshold:
                    results[key] = matched_item['db_id']
                    
                    debug_logs[key] = {
                        "extracted_from_gemini": extracted_value,
                        "matched_in_db": matched_item['original_text'],
                        "distance": round(distance, 4),
                        "threshold_limit": current_threshold,
                        "status": "ACCEPTED"
                    }
                else:
                    # Log lại nếu bị reject (để debug)
                    debug_logs[key] = {
                        "extracted_from_gemini": extracted_value,
                        "matched_in_db": matched_item['original_text'],
                        "distance": round(distance, 4),
                        "threshold_limit": current_threshold,
                        "status": "REJECTED_BY_THRESHOLD"
                    }

        return results, debug_logs

# Tạo singleton để dùng chung
rag_engine = RagEngine()