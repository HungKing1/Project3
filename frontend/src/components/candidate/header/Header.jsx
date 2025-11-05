/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import MenuAccount from "./MenuAccount";
import MenuSidebar from "./MenuSidebar";
import NotificationCenter from "./notification/NotificationCenter";
import s from "./style.module.css";

// --- Dữ liệu mẫu (Mock Data) & Hàm giả lập (Stubs) ---

// Thay đổi `mockCheckLogin` thành `true` để xem giao diện "Đã đăng nhập"
// Thay đổi `mockCheckLogin` thành `false` để xem giao diện "Chưa đăng nhập"
const mockCheckLogin = true;

// `true` = Ứng viên (UV), `false` = Nhà tuyển dụng (NTD)
// (Chỉ có tác dụng khi mockCheckLogin = true)
const mockCheckAccount = true; 

const mockName = "Nguyễn Văn A";
const mockAva = "/images/candidate/ava_default.jpg"; // Ảnh mẫu

// Giả lập các hàm đã bị loại bỏ
const handleImageSource = (src) => src || "/images/candidate/ava_default.jpg";
const isExperiment = () => false;
const linkPageCv = () => "/mau-cv-xin-viec";
// ---

export default function Header() {
  // Sử dụng state với dữ liệu mẫu
  const [checkLogin, setCheckLogin] = useState(mockCheckLogin);
  const [checkAccount, setCheckAccount] = useState(mockCheckAccount);

  // Các state cho UI (giữ nguyên)
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  
  const [menuSidebar, setMenuSidebar] = useState(false);
  const [isOutside, setIsOutside] = useState(false);
  const toggleMenuSidebar = () => {
    setMenuSidebar(!menuSidebar);
  };

  const [showNotiPc, setShowNotiPc] = useState(false);
  const [isOutsideNotiPc, setIsOutsideNotiPc] = useState(false);
  const toggleNotiPc = () => {
    setShowNotiPc(!showNotiPc);
  };
  
  const [showNotiMobi, setShowNotiMobi] = useState(false);
  const toggleNotiMobi = () => {
    setShowNotiMobi(!showNotiMobi);
  };

  // useEffect cho việc đóng mở menu (giữ nguyên, vì đây là logic UI)
  useEffect(() => {
    // setCheckLogin và setCheckAccount đã được chạy ở useState
    // Logic `getCookie` đã bị loại bỏ

    const handleClickOutside = (e) => {
      if (!e.target.closest("#content_menu") && !e.target.closest("#user")) {
        setShowModal(false);
      }
      if (!e.target.closest("#menu_sidebar")) {
        setMenuSidebar(false);
      }
      if (!e.target.closest("#noti_container") && !e.target.closest("#noti")) {
        setShowNotiPc(false);
      }
      if (!e.target.closest("#notiMobi")) {
        setShowNotiMobi(false);
      }
    };

    window.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // useEffect cho việc cuộn (giữ nguyên, vì đây là logic UI)
  useEffect(() => {
    const handleScroll = () => {
      if (isOutside) {
        setShowModal(false);
      }
      if (isOutsideNotiPc) {
        setShowNotiPc(false);
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isOutside]);

  return (
    <>
      {/* --- HEADER PC --- */}
      <div className={s.container_header + " " + s.header_pc}>
        <div className={s.header_left}>
          <a href="/" className={s.text_decoration}>
            <div className={s.div_logo}>
              <img
                src="/images/header/logo.jpg"
                className={s.image_logo}
                alt="Tìm việc làm nhanh, tuyển dụng 24h"
                loading="lazy"
                decoding="async"
              />
            </div>
          </a>

          <div className={s.list_category}>
            {/* Các menu dropdown đã bị comment giống code gốc */}

            {/* Link CV Xin việc */}
            {(!checkLogin || checkAccount) && (
              <div className={s.node_cate}>
                <a
                  className={s.text_decoration}
                  style={{ fontFamily: "Roboto", fontSize: "16px" }}
                  href={linkPageCv()} // Dùng hàm stub
                >
                  CV xin việc
                </a>
              </div>
            )}

            {/* Link Cẩm nang */}
            <div className={s.node_cate}>
              <a
                className={s.text_decoration}
                style={{ fontFamily: "Roboto", fontSize: "16px" }}
                href="/cam-nang-tim-viec"
              >
                Cẩm nang tìm việc
              </a>
            </div>

            {/* Link Bảng giá */}
            {(!checkLogin || !checkAccount) && (
              <div className={s.node_cate}>
                <a
                  className={s.text_decoration}
                  style={{ fontFamily: "Roboto", fontSize: "16px" }}
                  href="/bang-gia"
                >
                  Bảng giá
                </a>
              </div>
            )}
          </div>
        </div>

        {/* --- KHU VỰC BÊN PHẢI (LOGIN/REGISTER HOẶC USER) --- */}
        {!checkLogin ? (
          // --- Giao diện CHƯA ĐĂNG NHẬP ---
          <div className={s.header_right}>
            <div
              className={s.btn_service + " " + s.dangtin + " " + s.font16_500}
            >
              <a
                className={s.text_decoration}
                style={{ fontFamily: "Roboto", fontSize: "16px" }}
                href={!isExperiment() ? "/dang-tin-tuyen-dung" : '/dang-tin-mien-phi'} // Dùng hàm stub
              >
                Đăng tin
              </a>
            </div>
            <div
              className={s.btn_service + " " + s.dangnhap + " " + s.font16_500}
              style={{ width: "102px" }}
            >
              <a
                className={s.text_decoration}
                style={{
                  fontFamily: "Roboto",
                  fontSize: "16px",
                  width: "100%",
                }}
                href="/dang-nhap"
              >
                Đăng nhập
              </a>
            </div>
            <div
              className={s.btn_service + " " + s.dangky + " " + s.font16_500}
            >
              <div className={s.btn_dangky} style={{ cursor: 'pointer' }} onClick={() => { window.location.href = '/dang-ky' }}>
                <div className={s.img_person}>
                  <span style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.5611 8.07288C11.5456 8.53823 12.3851 9.26255 12.9896 10.1683C13.5941 11.0741 13.941 12.1272 13.9931 13.2149C13.9999 13.3145 13.9868 13.4145 13.9545 13.5091C13.9222 13.6036 13.8713 13.6907 13.8049 13.7653C13.7384 13.8398 13.6578 13.9004 13.5676 13.9434C13.4775 13.9864 13.3796 14.0109 13.2798 14.0156C13.1801 14.0203 13.0804 14.0049 12.9866 13.9705C12.8928 13.9362 12.8069 13.8834 12.7338 13.8153C12.6606 13.7472 12.6019 13.6653 12.5609 13.5742C12.5199 13.4831 12.4975 13.3847 12.4951 13.2849C12.4405 12.1294 11.9432 11.0393 11.1062 10.2409C10.2692 9.44241 9.15682 8.99695 8.00006 8.99695C6.8433 8.99695 5.73097 9.44241 4.89397 10.2409C4.05696 11.0393 3.55958 12.1294 3.50506 13.2849C3.49159 13.4805 3.40208 13.663 3.25568 13.7934C3.10929 13.9238 2.91766 13.9917 2.72183 13.9825C2.526 13.9734 2.34153 13.8879 2.20794 13.7444C2.07434 13.6009 2.00224 13.4109 2.00706 13.2149C2.05892 12.1272 2.4056 11.0742 3.00997 10.1684C3.61434 9.26263 4.45365 8.53828 5.43806 8.07288C4.80708 7.54657 4.35353 6.83866 4.13912 6.04545C3.9247 5.25224 3.95983 4.41224 4.23973 3.63971C4.51962 2.86718 5.0307 2.19961 5.70343 1.72783C6.37616 1.25604 7.17789 1.00293 7.99956 1.00293C8.82124 1.00293 9.62297 1.25604 10.2957 1.72783C10.9684 2.19961 11.4795 2.86718 11.7594 3.63971C12.0393 4.41224 12.0744 5.25224 11.86 6.04545C11.6456 6.83866 11.1921 7.54657 10.5611 8.07288ZM10.5001 4.99988C10.5001 4.33684 10.2367 3.70095 9.76783 3.23211C9.29899 2.76327 8.6631 2.49988 8.00006 2.49988C7.33702 2.49988 6.70114 2.76327 6.2323 3.23211C5.76346 3.70095 5.50006 4.33684 5.50006 4.99988C5.50006 5.66292 5.76346 6.2988 6.2323 6.76764C6.70114 7.23649 7.33702 7.49988 8.00006 7.49988C8.6631 7.49988 9.29899 7.23649 9.76783 6.76764C10.2367 6.2988 10.5001 5.66292 10.5001 4.99988Z" fill="white" />
                    </svg>
                  </span>
                </div>
                <a
                  className={s.text_decoration}
                  style={{ fontFamily: "Roboto", fontSize: "16px" }}
                  href="/dang-ky"
                >
                  Đăng ký
                </a>
              </div>
            </div>
          </div>
        ) : (
          // --- Giao diện ĐÃ ĐĂNG NHẬP ---
          <div className={s.header_right}>
            {/* Nút Đăng tin (chỉ cho NTD) */}
            {!checkAccount && (
              <div
                className={s.btn_service + " " + s.dangtin + " " + s.font16_500}
              >
                <a
                  style={{ fontFamily: "Roboto", fontSize: "16px" }}
                  className={s.text_decoration}
                  href="/nha-tuyen-dung/dang-tin-moi"
                >
                  Đăng tin
                </a>
              </div>
            )}
            
            {/* Nút Thông báo (PC) */}
            <div id="noti">
              <button
                className={
                  s.button_all + " " + s.btn_person + " " + s.notification
                }
                style={{ cursor: "pointer" }}
                onClick={toggleNotiPc}
              >
                <div className={s.img_p + " " + s.img_chuong}>
                  <img
                    className={s.img_all}
                    src="/images/bell.svg"
                    alt="Thông báo"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </button>
              {showNotiPc && (
                <NotificationCenter setIsOutside={setIsOutsideNotiPc} />
              )}
            </div>

            {/* Thông tin User (PC) */}
            <div id="user" style={{ position: "relative" }}>
              <button
                className={s.button_all + " " + s.btn_infomation}
                onClick={toggleModal}
                style={{ cursor: "pointer" }}
              >
                <div className={s.avata}>
                  {/* <Image> đã được thay bằng <img> */}
                  <img
                    width={30}
                    height={30}
                    className={s.img_all}
                    src={handleImageSource(mockAva)} // Dùng mock data
                    alt="avata"
                    onError={(e) => {
                      e.currentTarget.src = "/images/candidate/ava_default.jpg";
                    }}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <span className={s.name + " " + s.font16_500} style={{
                  maxWidth: '340px',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                }}>
                  {mockName} {/* Dùng mock data */}
                </span>
                <div className={s.xemthem}>
                  <img
                    className={s.img_all}
                    src="/images/them.svg"
                    alt="avata"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </button>
              {showModal && (
                <MenuAccount
                  checkAccount={checkAccount}
                  setCheckLogin={setCheckLogin}
                  setIsOutside={setIsOutside}
                />
              )}
            </div>
          </div>
        )}
      </div>

      {/* --- HEADER MOBILE --- */}
      <div className={s.container_header + " " + s.header_mobile}>
        <div id="menu_sidebar" style={{ width: '40px' }}>
          <button
            className={s.button_all + " " + s.more_cate}
            onClick={toggleMenuSidebar}
            style={{ cursor: "pointer" }}
          >
            <div className={s.img_more_cate}>
              <span
                style={{
                  width: "100%",
                  height: "100%",
                }}
              >
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M33.4167 18.332H6.58333C5.70888 18.332 5 19.0409 5 19.9154V20.082C5 20.9565 5.70888 21.6654 6.58333 21.6654H33.4167C34.2911 21.6654 35 20.9565 35 20.082V19.9154C35 19.0409 34.2911 18.332 33.4167 18.332Z" fill="#3582CD" />
                  <path d="M33.4167 26.6655H6.58333C5.70888 26.6655 5 27.3744 5 28.2489V28.4155C5 29.29 5.70888 29.9989 6.58333 29.9989H33.4167C34.2911 29.9989 35 29.29 35 28.4155V28.2489C35 27.3744 34.2911 26.6655 33.4167 26.6655Z" fill="#3582CD" />
                  <path d="M33.4167 9.99878H6.58333C5.70888 9.99878 5 10.7077 5 11.5821V11.7488C5 12.6232 5.70888 13.3321 6.58333 13.3321H33.4167C34.2911 13.3321 35 12.6232 35 11.7488V11.5821C35 10.7077 34.2911 9.99878 33.4167 9.99878Z" fill="#3582CD" />
                </svg>
              </span>
            </div>
          </button>
          {menuSidebar && <MenuSidebar closeMenuSidebar={() => setMenuSidebar(false)} />}
        </div>
        <a href="/" className={s.text_decoration}>
          <div className={s.div_logo}>
            <img
              src="/images/header/logo.jpg"
              alt="Tìm việc làm nhanh, tuyển dụng 24h"
              loading="lazy"
              decoding="async"
              className={s.image_logo}
              width={125}
              height={46}
            />
          </div>
        </a>
        
        {/* Nút thông báo (Mobile) */}
        {checkLogin ? (
          <>
            <div id="notiMobi">
              <button className={s.btn_person + " " + s.chat} onClick={toggleNotiMobi}>
                <div className={s.img_p + " " + s.img_chat}>
                  <img className={s.img_all} src="/images/bell.svg" alt="Chat" />
                </div>
              </button>
              {showNotiMobi && <NotificationCenter />}
            </div>
          </>
        ) : (
          // Placeholder để giữ logo ở giữa
          <>
            <div style={{ width: "40px" }}></div>
          </>
        )}
      </div>
    </>
  );
}