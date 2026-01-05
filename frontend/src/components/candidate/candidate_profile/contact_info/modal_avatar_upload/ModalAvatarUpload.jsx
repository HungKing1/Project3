import React, { useEffect, useRef, useState } from "react";
import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import s from "./style.module.scss"; // Giữ nguyên import SCSS của bạn

// --- PHẦN 1: CÁC HÀM TIỆN ÍCH (HELPER FUNCTIONS) ---

// 1. Hook Debounce để tối ưu hiệu năng
function useDebounceEffect(fn, waitTime, deps) {
  useEffect(() => {
    const t = setTimeout(() => {
      fn.apply(undefined, deps);
    }, waitTime);

    return () => {
      clearTimeout(t);
    };
  }, deps || []);
}

// 2. Hàm xử lý vẽ ảnh lên Canvas (Cắt, Xoay, Scale)
const TO_RADIANS = Math.PI / 180;

async function canvasPreview(image, canvas, crop, scale = 1, rotate = 0) {
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("No 2d context");
  }

  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  
  // PixelRatio giúp ảnh nét hơn trên màn hình Retina/HiDPI
  const pixelRatio = window.devicePixelRatio || 1;

  canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
  canvas.height = Math.floor(crop.height * scaleY * pixelRatio);

  ctx.scale(pixelRatio, pixelRatio);
  ctx.imageSmoothingQuality = "high";

  const cropX = crop.x * scaleX;
  const cropY = crop.y * scaleY;

  const rotateRads = rotate * TO_RADIANS;
  const centerX = image.naturalWidth / 2;
  const centerY = image.naturalHeight / 2;

  ctx.save();

  // Di chuyển gốc tọa độ để xoay ảnh quanh tâm
  ctx.translate(-cropX, -cropY);
  ctx.translate(centerX, centerY);
  ctx.rotate(rotateRads);
  ctx.scale(scale, scale);
  ctx.translate(-centerX, -centerY);

  ctx.drawImage(
    image,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight
  );

  ctx.restore();
}

// 3. Hàm tính toán vị trí crop mặc định ở giữa
function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "px",
        width: 150, // Kích thước mặc định ban đầu
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

// --- PHẦN 2: COMPONENT CHÍNH ---

const ModalAvatarUpload = ({ onClose, setResult }) => {
  const [originalImg, setOriginalImg] = useState("");
  const [crop, setCrop] = useState();
  const [completedCrop, setCompletedCrop] = useState();
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [aspect, setAspect] = useState(1); // Tỉ lệ khung hình (1 = hình vuông)
  
  const previewCanvasRef = useRef(null);
  const imgRef = useRef(null);

  // Xử lý khi chọn file
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const acceptType = ["image/jpeg", "image/png", "image/jpg"];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!acceptType.includes(file.type)) {
        alert("Vui lòng chọn file đúng định dạng! (jpeg, jpg, png)");
        e.target.value = "";
        return;
      }

      if (file.size > maxSize) {
        alert("Vui lòng chọn file không quá 5MB!");
        e.target.value = "";
        return;
      }

      // Tạo URL blob để hiển thị ảnh
      const imgUrl = URL.createObjectURL(file);
      setOriginalImg(imgUrl);
      // Reset các state chỉnh sửa
      setScale(1);
      setRotate(0);
    }
    e.target.value = ""; // Reset input file để chọn lại cùng 1 file nếu muốn
  };

  // Kích hoạt input file ẩn
  const changeImg = () => {
    const inputFile = document.getElementById("avatar_upload_input");
    if (inputFile) {
      inputFile.click();
    }
  };

  // Khi ảnh load xong, tự động tạo crop ở giữa
  function onImageLoad(e) {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  }

  const zoomImg = (step) => {
    setScale((prev) => Math.max(0.1, prev + step)); // Không cho zoom nhỏ hơn 0.1
  };

  const turnImg = (step) => {
    setRotate((prev) => prev + step);
  };

  const reset = () => {
    setOriginalImg("");
    setCrop(undefined);
    setCompletedCrop(undefined);
    setScale(1);
    setRotate(0);
  };

  const cancel = () => {
    reset();
    if (onClose) onClose();
  };

  // Xử lý xuất file kết quả
  const finish = async () => {
    const previewCanvas = previewCanvasRef.current;
    if (!previewCanvas || !completedCrop) {
      alert("Vui lòng cắt ảnh trước khi lưu!");
      return;
    }

    // Tạo OffscreenCanvas để xuất ảnh chất lượng cao
    const offScreen = new OffscreenCanvas(
      completedCrop.width,
      completedCrop.height
    );
    const ctx = offScreen.getContext("2d");

    if (!ctx) {
      console.error("No 2d context");
      return;
    }

    // Vẽ lại từ canvas preview sang canvas xuất file
    ctx.drawImage(
      previewCanvas,
      0,
      0,
      previewCanvas.width,
      previewCanvas.height,
      0,
      0,
      offScreen.width,
      offScreen.height
    );

    // Chuyển thành Blob (File ảnh)
    const blob = await offScreen.convertToBlob({
      type: "image/png",
    });

    if (setResult) {
      setResult(blob); // Trả về Blob cho component cha
    }
    
    reset();
    if (onClose) onClose();
  };

  // Sử dụng Debounce để vẽ preview mượt mà
  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
          scale,
          rotate
        );
      }
    },
    100,
    [completedCrop, scale, rotate]
  );

  return (
    <div className={s.background}>
      <div className={s.modal_container}>
        <div className={s.banner}>
          <p className={s.title}>THAY ẢNH ĐẠI DIỆN MỚI</p>
        </div>
        
        <div className={s.body}>
          {/* Cột trái: Khu vực chỉnh sửa */}
          <div className={s.edit_container}>
            <p className={s.title}>Ảnh gốc</p>
            
            {!originalImg ? (
              <label htmlFor="avatar_upload_input" className={s.labelInput}>
                <div className={s.logo}>
                  <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                    <path d="M448 80c8.8 0 16 7.2 16 16V415.8l-5-6.5-136-176c-4.5-5.9-11.6-9.3-19-9.3s-14.4 3.4-19 9.3L202 340.7l-30.5-42.7C167 291.7 159.8 288 152 288s-15 3.7-19.5 10.1l-80 112L48 416.3l0-.3V96c0-8.8 7.2-16 16-16H448zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm80 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z" />
                  </svg>
                </div>
                <p className={s.logoTitle}>Chọn ảnh để tải lên</p>
              </label>
            ) : (
              <div className={s.reactCropContainer}>
                <ReactCrop
                  crop={crop}
                  onChange={(_, percentCrop) => setCrop(percentCrop)}
                  onComplete={(c) => setCompletedCrop(c)}
                  aspect={aspect}
                  circularCrop
                >
                  <img
                    ref={imgRef}
                    alt="Crop me"
                    src={originalImg}
                    style={{ 
                        transform: `scale(${scale}) rotate(${rotate}deg)`,
                        maxHeight: '400px' 
                    }}
                    onLoad={onImageLoad}
                  />
                </ReactCrop>
              </div>
            )}

            {/* Input file ẩn */}
            <input
              id="avatar_upload_input"
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              onChange={handleFileChange}
              hidden
            />

            {!originalImg ? (
              <div className={s.warningBox}>
                <p>Nếu ảnh của bạn có dung lượng trên 5MB, vui lòng giảm dung lượng ảnh trước khi tải lên.</p>
              </div>
            ) : (
              <div className={s.groupBtnEdit}>
                {/* Zoom In */}
                <div className={s.imgEditBtn} onClick={() => zoomImg(0.1)} title="Phóng to">
                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM184 296c0 13.3 10.7 24 24 24s24-10.7 24-24V232h64c13.3 0 24-10.7 24-24s-10.7-24-24-24H232V120c0-13.3-10.7-24-24-24s-24 10.7-24 24v64H120c-13.3 0-24 10.7-24 24s10.7 24 24 24h64v64z" /></svg>
                </div>
                {/* Zoom Out */}
                <div className={s.imgEditBtn} onClick={() => zoomImg(-0.1)} title="Thu nhỏ">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM136 184c-13.3 0-24 10.7-24 24s10.7 24 24 24H280c13.3 0 24-10.7 24-24s-10.7-24-24-24H136z" /></svg>
                </div>
                {/* Rotate Left */}
                <div className={s.imgEditBtn} onClick={() => turnImg(-90)} title="Xoay trái">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M125.7 160H176c17.7 0 32 14.3 32 32s-14.3 32-32 32H48c-17.7 0-32-14.3-32-32V64c0-17.7 14.3-32 32-32s32 14.3 32 32v51.2L97.6 97.6c87.5-87.5 229.3-87.5 316.8 0s87.5 229.3 0 316.8s-229.3 87.5-316.8 0c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0c62.5 62.5 163.8 62.5 226.3 0s62.5-163.8 0-226.3s-163.8-62.5-226.3 0L125.7 160z" /></svg>
                </div>
                {/* Rotate Right */}
                <div className={s.imgEditBtn} onClick={() => turnImg(90)} title="Xoay phải">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M386.3 160H336c-17.7 0-32 14.3-32 32s14.3 32 32 32H464c17.7 0 32-14.3 32-32V64c0-17.7-14.3-32-32-32s-32 14.3-32 32v51.2L414.4 97.6c-87.5-87.5-229.3-87.5-316.8 0s-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3s163.8-62.5 226.3 0L386.3 160z" /></svg>
                </div>
              </div>
            )}
          </div>

          {/* Cột phải: Xem trước */}
          <div className={s.preview_container}>
            <p className={s.title}>Ảnh hiển thị</p>
            
            <div className={s.no_avatar}>
              {/* Canvas để hiển thị ảnh crop theo thời gian thực */}
              {!originalImg ? (
                 <img src="/images/candidate/ava_default.jpg" alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => e.currentTarget.src="https://via.placeholder.com/160"} />
              ) : (
                <canvas
                  ref={previewCanvasRef}
                  style={{
                    width: "160px",
                    height: "160px",
                    borderRadius: "50%", // Hiển thị tròn như avatar thật
                    objectFit: "contain",
                  }}
                />
              )}
            </div>

            {originalImg && (
              <div className={s.btnGroup}>
                <div className={`${s.changeImg} ${s.smallBtn}`} onClick={changeImg}>
                  <p>Đổi ảnh</p>
                </div>
                <div className={`${s.deleteImg} ${s.smallBtn}`} onClick={reset}>
                  <p>Xóa ảnh</p>
                </div>
              </div>
            )}

            <div
              className={s.okBtn}
              style={{ 
                opacity: originalImg ? 1 : 0.5, 
                pointerEvents: originalImg ? 'auto' : 'none' 
              }}
              onClick={finish}
            >
              <p>XONG</p>
            </div>

            <div className={s.close} onClick={cancel}>
              <p>Đóng lại (Không lưu)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalAvatarUpload;