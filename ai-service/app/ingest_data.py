import pandas as pd
import chromadb
from chromadb.utils import embedding_functions
import os
import shutil

DATA_FOLDER = "data"
PERSIST_DIRECTORY = "chroma_db"

CSV_CONFIG = {
    "City.csv":           {"col_name": "cities",      "id": "_id",      "text": "_name"},
    "District.csv":       {"col_name": "districts",   "id": "_id",  "text": "_name"},
    "EducationLevel.csv": {"col_name": "educations",  "id": "_id",       "text": "_name"},
    "ExperienceYear.csv": {"col_name": "experiences", "id": "_id", "text": "_name"},
    "Industry.csv":       {"col_name": "industries",  "id": "_id",  "text": "_name"},
    "JobLevel.csv":       {"col_name": "job_levels",  "id": "_id", "text": "_name"},
    "Salary.csv":         {"col_name": "salaries",    "id": "_id",    "text": "_name"},
    # "Ward.csv":           {"col_name": "wards",       "id": "_id",      "text": "_name"},
    "WorkType.csv":       {"col_name": "work_types",  "id": "_id", "text": "_name"}
}

def ingest():
    print("Bắt đầu quá trình nạp dữ liệu...")
    
    if os.path.exists(PERSIST_DIRECTORY):
        shutil.rmtree(PERSIST_DIRECTORY)
        print(f"Đã xóa data cũ tại {PERSIST_DIRECTORY}")

    client = chromadb.PersistentClient(path=PERSIST_DIRECTORY)
    emb_fn = embedding_functions.SentenceTransformerEmbeddingFunction(model_name="paraphrase-multilingual-MiniLM-L12-v2")

    for filename, config in CSV_CONFIG.items():
        file_path = os.path.join(DATA_FOLDER, filename)
        
        if not os.path.exists(file_path):
            print(f"Không thấy file {filename}, bỏ qua.")
            continue
            
        try:
            df = pd.read_csv(file_path)
            
            if config["id"] not in df.columns or config["text"] not in df.columns:
                print(f"Lỗi file {filename}: Không tìm thấy cột '{config['id']}' hoặc '{config['text']}'. Cột thực tế: {list(df.columns)}")
                continue

            collection = client.create_collection(name=config["col_name"], embedding_function=emb_fn)
            
            ids = []
            documents = []
            metadatas = []

            for _, row in df.iterrows():
                item_id = str(row[config["id"]])
                item_text = str(row[config["text"]])
                
                full_text = item_text 
                
                ids.append(f"{config['col_name']}_{item_id}")
                documents.append(full_text)
                metadatas.append({
                    "db_id": int(item_id) if item_id.isdigit() else item_id,
                    "original_text": item_text,
                    "type": config["col_name"]
                })

            if documents:
                collection.add(ids=ids, documents=documents, metadatas=metadatas)
                print(f"{filename}: Đã nạp {len(documents)} bản ghi vào collection '{config['col_name']}'")

        except Exception as e:
            print(f"Lỗi xử lý {filename}: {e}")

    print("\n --- HOÀN TẤT NẠP DỮ LIỆU ---")

if __name__ == "__main__":
    ingest()