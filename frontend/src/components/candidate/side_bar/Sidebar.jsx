import React, { useState } from "react";
import SidebarTimViec from "./side_bar_tim_viec/SidebarTimViec";
import s from "./sidebar.module.scss";

const Sidebar = () => {
  // --- MOCK DATA (Dữ liệu giả lập thay thế cho API/Context/Cookies) ---
  const [userData] = useState({
    id: "123456",
    name: "Nguyễn Văn A",
    ava: "https://via.placeholder.com/150", // Link ảnh mẫu online
  });

  // --- HANDLE FUNCTIONS ---
  
  // Giả lập hàm xử lý nguồn ảnh (thay cho handleImageSource)
  const getAvatarSource = (src) => {
    return src && src !== "" ? src : "/images/candidate/applicant1.png";
  };

  // Giả lập hành động làm mới hồ sơ (thay cho API POST)
  const handleRefreshProfile = () => {
    // Thực tế sẽ gọi API ở đây
    alert("Đã làm mới hồ sơ thành công! (Mô phỏng)");
  };

  // Giả lập hành động chuyển trang (thay cho router.push)
  const handleViewProfile = () => {
    const slug = userData.name
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
    
    const url = `/ung-vien/${slug}-u${userData.id}`;
    console.log("Navigating to:", url);
    alert(`Chuyển hướng đến trang: ${url}`);
    // window.location.href = url; // Bỏ comment dòng này nếu muốn chuyển trang thật
  };

  return (
    <div className={s.sidebar}>
      {/* Logo Section */}
      <a href="/" style={{ textDecoration: 'none' }}>
    <div className={s.box_logo}>
      <h1
        style={{
          fontSize: '24px',
          margin: 0,
          padding: 0,
          color: '#333',
          fontWeight: 'bold',
          display: 'block'
        }}
      >
        Trang chủ
      </h1>
    </div>
  </a>

      {/* User Info Section */}
      <div className={s.box_info}>
        <div className={s.box_img_ava}>
          <img
            height={80}
            width={80}
            src={getAvatarSource(userData.ava)}
            alt="Ảnh ứng viên"
            onError={(e) => {
              e.currentTarget.src = "/images/candidate/applicant1.png";
            }}
            style={{
              border: '1px solid white',
              borderRadius: '50%',
              objectFit: 'cover' // Dùng cover cho avatar tròn sẽ đẹp hơn
            }}
          />
        </div>
        <p style={{ textAlign: 'center' }}>{userData.name}</p>
      </div>

      {/* Action Buttons */}
      <div className={s.option}>
        <button
          className={s.refesh}
          onClick={handleRefreshProfile}
          style={{
            cursor: 'pointer'
          }}
        >
          Làm mới hồ sơ
        </button>
        <button
          className={s.watch}
          style={{
            cursor: 'pointer'
          }}
          onClick={handleViewProfile}
        >
          Xem hồ sơ
        </button>
      </div>

      {/* Sidebar Menu Content */}
      <div className={s.sidebarContent}>
        <SidebarTimViec />
      </div>
    </div>
  );
};

export default Sidebar;