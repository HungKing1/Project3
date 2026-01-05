import React, { useState } from "react";
import s from "./notification-center.module.css";

// --- Dữ liệu mẫu (Mock Data) ---
const mockData = {
  id: 1,
  type: 1,
  isRead: false,
  time_created: Date.now() / 1000 - 600, 
  from_user_id: 123,
  new_id: 456,
  extra: {
    title: "Ứng viên Nguyễn Văn A vừa ứng tuyển",
    contentHtml: "Ứng viên <b>Nguyễn Văn A</b> vừa ứng tuyển vào tin <b>Nhân Viên Kinh Doanh</b> của bạn.",
    from_user_alias: "nguyen-van-a-",
    new_alias: "nhan-vien-kinh-doanh-",
  }
};

const NotificationMessage = ({ data = mockData }) => {
  const [isRead, setIsRead] = useState(!!data?.isRead);

  const GenerateLinks = () => {
    const type = Number(data?.type);
    const links = [];

    if ([1, 2].includes(type)) {
      links.push(
        { text: "Xem ứng viên", url: `/ung-vien/${data?.extra?.from_user_alias}uv-${data?.from_user_id}`, blank: true, id: data?.id },
        { text: "Xem tin", url: `/${data?.extra?.new_alias || "tin-tuyen-dung"}-${data?.new_id}`, blank: true, id: data?.id }
      );
      if (type === 1) {
        links.push({ text: "Danh sách", url: `/nha-tuyen-dung/ung-vien-den-ung-tuyen`, id: data?.id });
      }
    }

    if ([3, 4, 5, 6].includes(type)) {
      if ([5, 6].includes(type)) {
        links.push({ text: "Xem tin", url: `/${data?.extra?.new_alias || "tin-tuyen-dung"}-${data?.new_id}`, blank: true, id: data?.id });
      }
      if (data?.extra?.from_user_alias) {
        links.push({ text: "Xem NTD", url: `/${data?.extra?.from_user_alias || ""}`, blank: true, id: data?.id });
      }
      if ([5, 6].includes(type)) {
        links.push({ text: "Danh sách", url: `/ung-vien/viec-lam-da-ung-tuyen`, id: data?.id });
      }
    }

    const handleAnchorClick = (event, id) => {
      // event.preventDefault(); // Tùy chọn: Bỏ comment nếu muốn ngăn chuyển trang mặc định hoàn toàn
      setIsRead(true);
    };

    return (
      <div className={s.noti_msg_link_group}>
        {links.map((item, index) => (
          <a
            key={item.id ? `${item.id}-${index}` : index}
            className={s.noti_msg_link}
            href={item?.url}
            target={item?.blank ? "_blank" : "_self"}
            rel="noreferrer"
            onClick={(e) => handleAnchorClick(e, item?.id)}
          >
            {item?.text}
            {/* Icon mũi tên nhỏ để chỉ thị là link */}
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginLeft: 4}}>
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
            </svg>
          </a>
        ))}
      </div>
    );
  };

  return (
    <div 
      className={`${s.noti_msg} ${isRead ? s.read : s.unread}`}
    >
      <div className={s.noti_header}>
         {/* Dot chỉ thị trạng thái chưa đọc */}
        {!isRead && <span className={s.unread_dot}></span>}
        <div className={s.noti_msg_tt}>
            {data?.extra?.title}
        </div>
        <div className={s.noti_msg_time}>
            {new Date(data?.time_created * 1000).toLocaleDateString("vi-VN", { day: '2-digit', month: '2-digit' })} 
            {" • "}
            {new Date(data?.time_created * 1000).toLocaleTimeString("vi-VN", { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
      
      <div 
        className={s.noti_msg_des} 
        dangerouslySetInnerHTML={{ __html: data?.extra?.contentHtml }}
      ></div>
      
      <GenerateLinks />
    </div>
  );
};

export default NotificationMessage;