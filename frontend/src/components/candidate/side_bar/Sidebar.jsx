import React, { useState, useEffect } from "react";
import SidebarTimViec from "./side_bar_tim_viec/SidebarTimViec";
import s from "./sidebar.module.scss";

const Sidebar = () => {
  const [userData, setUserData] = useState({
    id: "",
    name: "Người dùng",
    ava: "/images/candidate/applicant1.png",
  });

  useEffect(() => {
    const storedCandidate = localStorage.getItem('candidate');
    if (storedCandidate) {
      try {
        const parsedData = JSON.parse(storedCandidate);
        setUserData({
          id: parsedData.candidateId || parsedData.id || "",
          name: parsedData.name || "Người dùng",
          ava: parsedData.avatar || "/images/candidate/applicant1.png",
        });
      } catch (error) {
        console.error(error);
      }
    }
  }, []);

  const getAvatarSource = (src) => {
    return src && src !== "" ? src : "/images/candidate/applicant1.png";
  };

  return (
    <div className={s.sidebar}>
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
              objectFit: 'cover'
            }}
          />
        </div>
        <p style={{ textAlign: 'center' }}>{userData.name}</p>
      </div>

      <div className={s.sidebarContent}>
        <SidebarTimViec />
      </div>
    </div>
  );
};

export default Sidebar;