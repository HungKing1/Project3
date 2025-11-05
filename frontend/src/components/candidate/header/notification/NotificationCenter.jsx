import s from "./notification-center.module.css";
import React, { useEffect, useRef, useState } from "react";
import NotificationMessage from "./NotificationMessage";
// --- Dữ liệu mẫu (Mock Data) ---

const mockNotificationsPage1 = [
  { 
    id: 1, 
    extra: { 
      title: "Thông báo mẫu 1", 
      message: "Nội dung chi tiết của thông báo mẫu số 1.",
      created_at: Date.now() / 1000 - 600 // 10 phút trước
    } 
  },
  { 
    id: 2, 
    extra: { 
      title: "Thông báo mẫu 2", 
      message: "Nội dung chi tiết của thông báo mẫu số 2.",
      created_at: Date.now() / 1000 - 3600 // 1 giờ trước
    } 
  },
];

const mockNotificationsPage2 = [
  { 
    id: 3, 
    extra: { 
      title: "Thông báo mẫu 3", 
      message: "Nội dung chi tiết của thông báo mẫu số 3.",
      created_at: Date.now() / 1000 - 86400 // 1 ngày trước
    } 
  },
];
// --- Kết thúc Dữ liệu mẫu ---


const NotificationCenter = ({ setIsOutside }) => {
  const [listNoti, setListNoti] = useState([]);
  const [totalNoti, setTotalNoti] = useState(0);
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const notiRef = useRef(null);

  // --- Hàm giả lập (Stub) việc fetch data ---
  const fetchNoti = (page = 1) => {
    // Giả lập gọi API
    if (page === 1) {
      setListNoti(mockNotificationsPage1);
      setTotalNoti(3); // Giả sử có tổng cộng 3 thông báo
    } 
    else if (page === 2) {
      // Giả lập việc thêm dữ liệu vào trang 2
      setListNoti(prev => [...prev, ...mockNotificationsPage2]);
    }
    // Không làm gì ở trang 3 trở đi
  };
  
  // Logic gọi data khi "page" thay đổi (giữ nguyên)
  useEffect(() => {
    fetchNoti(page);
  }, [page]);

  // Logic kiểm tra chuột (giữ nguyên)
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (notiRef?.current && setIsOutside) {
        const rect = notiRef.current.getBoundingClientRect();
        const isOut = (
          e.clientX < rect.left ||
          e.clientX > rect.right ||
          e.clientY < rect.top ||
          e.clientY > rect.bottom
        );
        setIsOutside(isOut);
      }
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [setIsOutside]);

  return (
    <>
      <div id="noti_container" className={s.noti_container} ref={notiRef}>
        <div className={s.noti_list}>
          {listNoti.length > 0 ? (
            <>
              {listNoti.map((noti, index) => (
                // Sử dụng index làm key dự phòng nếu noti.id không có
                <NotificationMessage key={noti.id || index} data={noti} />
              ))}
              {/* Nút "Xem thêm" sẽ hiển thị nếu tổng số noti > số noti đã tải */}
              {totalNoti > 0 && totalNoti > listNoti.length && (
                <div className={s.btnSeeMore} onClick={() => setPage(page + 1)}>
                  Xem thêm
                </div>
              )}
            </>
          ) : (
            <>
              <div style={{ margin: "0 auto" }}>
                Bạn không có thông báo
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default NotificationCenter;