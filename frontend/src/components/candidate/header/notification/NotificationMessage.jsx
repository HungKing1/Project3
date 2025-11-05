import React, { useState } from "react";
import s from "./notification-center.module.css"; // Giả định file CSS này tồn tại

// --- Dữ liệu mẫu (Mock Data) ---
// Component sẽ sử dụng dữ liệu này nếu không có prop 'data' nào được truyền vào
const mockData = {
  id: 1,
  type: 1, // 1 = UV Ứng tuyển (để hiển thị 3 link)
  isRead: false,
  time_created: Date.now() / 1000 - 600, // 10 phút trước
  from_user_id: 123,
  new_id: 456,
  extra: {
    title: "Ứng viên Nguyễn Văn A vừa ứng tuyển",
    contentHtml: "Ứng viên <b>Nguyễn Văn A</b> vừa ứng tuyển vào tin <b>Nhân Viên Kinh Doanh</b> của bạn.",
    from_user_alias: "nguyen-van-a-",
    new_alias: "nhan-vien-kinh-doanh-",
  }
};
// --- Kết thúc Dữ liệu mẫu ---


const NotificationMessage = ({ data = mockData }) => { // Sử dụng mock data làm default
  
  const [isRead, setIsRead] = useState(!!data?.isRead);

  // Component con để tạo link (Logic UI)
  const GnerateLinks = () => {
    const type = Number(data?.type);
    const links = [];

    // --- Logic tạo link (đã giữ nguyên) ---
    if ([1, 2].includes(type)) {
      links.push(
        {
          text: "Xem ứng viên",
          url: `/ung-vien/${data?.extra?.from_user_alias}uv-${data?.from_user_id}`,
          blank: true,
          id: data?.id,
        },
        {
          text: "Xem tin",
          url: `/${data?.extra?.new_alias || "tin-tuyen-dung"}-${data?.new_id}`,
          blank: true,
          id: data?.id,
        }
      );

      if (type === 1) {
        links.push({
          text: "Danh sách",
          url: `/nha-tuyen-dung/ung-vien-den-ung-tuyen`,
          id: data?.id,
        });
      }
    }

    if ([3, 4, 5, 6].includes(type)) {
      if ([5, 6].includes(type)) {
        links.push({
          text: "Xem tin",
          url: `/${data?.extra?.new_alias || "tin-tuyen-dung"}-${data?.new_id}`,
          blank: true,
          id: data?.id,
        });
      }

      if (data?.extra?.from_user_alias) {
        links.push({
          text: "Xem NTD",
          url: `/${data?.extra?.from_user_alias || ""}`,
          blank: true,
          id: data?.id,
        });
      }

      if ([5, 6].includes(type)) {
        links.push({
          text: "Danh sách",
          url: `/ung-vien/viec-lam-da-ung-tuyen`,
          id: data?.id,
        });
      }
    }

    // --- Logic API (POST) đã bị loại bỏ ---
    const handleAnchorClick = (event, id) => {
      event.preventDefault();

      const href = event.currentTarget.href;
      const target = event.currentTarget.target;

      // Chỉ cập nhật UI (đã đọc)
      setIsRead(true);

      // Điều hướng
      if (target === "_blank") {
        window.open(href, target);
      } else {
        window.location.href = href;
      }
    };

    return (
      <>
        <div className={s.noti_msg_link_group}>
          {links.map((item, index) => (
            <a
              key={item.id ? `${item.id}-${index}` : index} // Thêm key
              className={s.noti_msg_link}
              href={item?.url}
              target={item?.blank ? "_blank" : "_self"}
              onClick={(e) => handleAnchorClick(e, item?.id)}
            >
              {item?.text}
            </a>
          ))}
        </div>
      </>
    );
  };


  return (
    <>
      <div className={s.noti_msg} style={{ opacity: isRead ? 0.5 : 1 }}>
        <div className={s.noti_msg_time}>
          {/* Định dạng thời gian */}
          {(new Date(data?.time_created * 1000)).toLocaleString("vi-VN")}
        </div>
        <div className={s.noti_msg_tt}>
          {data?.extra?.title}
        </div>
        <div className={s.noti_msg_des} dangerouslySetInnerHTML={{ __html: data?.extra?.contentHtml }}></div>
        <GnerateLinks />
      </div>
    </>
  );
};

export default NotificationMessage;