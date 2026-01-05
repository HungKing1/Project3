/* eslint-disable @next/next/no-img-element */
import React, { useContext, useEffect, useState } from "react";
import MenuAccount from "./MenuAccount";
import MenuSidebar from "./MenuSidebar";
import NotificationCenter from "./notification/NotificationCenter";
import s from "./style.module.css";
import { useAuthContext } from "../../../context/AuthContext";

// --- Dữ liệu mẫu & Hàm giả lập ---
const mockCheckLogin = false;
const mockCheckAccount = true; 
const mockName = "Nguyễn Văn A";
const mockAva = "/images/candidate/applicant.png";
const handleImageSource = (src) => src || "/images/candidate/applicant.png";
const isExperiment = () => false;
const linkPageCv = () => "/mau-cv-xin-viec";
// ---

export default function Header() {
  const [checkLogin, setCheckLogin] = useState(mockCheckLogin);
  const {isLoggedIn, accessToken} = useAuthContext()
  const [checkAccount, setCheckAccount] = useState(mockCheckAccount);

  // State UI
  const [showModal, setShowModal] = useState(false);
  const [menuSidebar, setMenuSidebar] = useState(false);
  const [isOutside, setIsOutside] = useState(false);
  const [showNotiPc, setShowNotiPc] = useState(false);
  const [isOutsideNotiPc, setIsOutsideNotiPc] = useState(false);
  const [showNotiMobi, setShowNotiMobi] = useState(false);

  const toggleModal = () => setShowModal(!showModal);
  const toggleMenuSidebar = () => setMenuSidebar(!menuSidebar);
  const toggleNotiPc = () => setShowNotiPc(!showNotiPc);
  const toggleNotiMobi = () => setShowNotiMobi(!showNotiMobi);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest("#content_menu") && !e.target.closest("#user")) setShowModal(false);
      if (!e.target.closest("#menu_sidebar")) setMenuSidebar(false);
      if (!e.target.closest("#noti_container") && !e.target.closest("#noti")) setShowNotiPc(false);
      if (!e.target.closest("#notiMobi")) setShowNotiMobi(false);
    };
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (isOutside) setShowModal(false);
      if (isOutsideNotiPc) setShowNotiPc(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isOutside, isOutsideNotiPc]);

  return (
    <>
      {/* --- HEADER PC --- */}
      <div className={`${s.container_header} ${s.header_pc}`}>
        <div className={s.header_left}>
          {/* Logo */}
          {/* <a href="/" className={s.brand_logo}>
             <img src="/images/header/logo.jpg" alt="Logo" />
          </a> */}

          {/* Navigation Menu */}
          <nav className={s.nav_menu}>
             <a className={s.nav_item} href="/">Trang chủ</a>
            
             {/* Link CV Xin việc */}
             {(!accessToken || checkAccount) && (
                <a className={s.nav_item} href={linkPageCv()}>CV xin việc</a>
             )}

             {/* Các menu khác (giữ chỗ) */}
             {/* <a className={s.nav_item} href="/cam-nang-tim-viec">Cẩm nang</a> */}
             {/* {(!accessToken || !checkAccount) && (
                <a className={s.nav_item} href="/bang-gia">Bảng giá</a>
             )} */}
          </nav>
        </div>

        {/* --- HEADER RIGHT --- */}
        {!accessToken ? (
          // --- CHƯA ĐĂNG NHẬP ---
          <div className={s.header_right}>
            <a 
              className={`${s.btn_common} ${s.btn_outline}`} 
              href={!isExperiment() ? "/dang-tin-tuyen-dung" : '/dang-tin-mien-phi'}
            >
              Đăng tin
            </a>
            
            <a 
              className={`${s.btn_common} ${s.btn_primary}`} 
              href="/dang-nhap"
            >
              Đăng nhập
            </a>
            
            <a 
              className={`${s.btn_common} ${s.btn_dark}`} 
              href="/dang-ky"
            >
              <div className={s.icon_wrapper}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.5611 8.07288C11.5456 8.53823 12.3851 9.26255 12.9896 10.1683C13.5941 11.0741 13.941 12.1272 13.9931 13.2149C13.9999 13.3145 13.9868 13.4145 13.9545 13.5091C13.9222 13.6036 13.8713 13.6907 13.8049 13.7653C13.7384 13.8398 13.6578 13.9004 13.5676 13.9434C13.4775 13.9864 13.3796 14.0109 13.2798 14.0156C13.1801 14.0203 13.0804 14.0049 12.9866 13.9705C12.8928 13.9362 12.8069 13.8834 12.7338 13.8153C12.6606 13.7472 12.6019 13.6653 12.5609 13.5742C12.5199 13.4831 12.4975 13.3847 12.4951 13.2849C12.4405 12.1294 11.9432 11.0393 11.1062 10.2409C10.2692 9.44241 9.15682 8.99695 8.00006 8.99695C6.8433 8.99695 5.73097 9.44241 4.89397 10.2409C4.05696 11.0393 3.55958 12.1294 3.50506 13.2849C3.49159 13.4805 3.40208 13.663 3.25568 13.7934C3.10929 13.9238 2.91766 13.9917 2.72183 13.9825C2.526 13.9734 2.34153 13.8879 2.20794 13.7444C2.07434 13.6009 2.00224 13.4109 2.00706 13.2149C2.05892 12.1272 2.4056 11.0742 3.00997 10.1684C3.61434 9.26263 4.45365 8.53828 5.43806 8.07288C4.80708 7.54657 4.35353 6.83866 4.13912 6.04545C3.9247 5.25224 3.95983 4.41224 4.23973 3.63971C4.51962 2.86718 5.0307 2.19961 5.70343 1.72783C6.37616 1.25604 7.17789 1.00293 7.99956 1.00293C8.82124 1.00293 9.62297 1.25604 10.2957 1.72783C10.9684 2.19961 11.4795 2.86718 11.7594 3.63971C12.0393 4.41224 12.0744 5.25224 11.86 6.04545C11.6456 6.83866 11.1921 7.54657 10.5611 8.07288ZM10.5001 4.99988C10.5001 4.33684 10.2367 3.70095 9.76783 3.23211C9.29899 2.76327 8.6631 2.49988 8.00006 2.49988C7.33702 2.49988 6.70114 2.76327 6.2323 3.23211C5.76346 3.70095 5.50006 4.33684 5.50006 4.99988C5.50006 5.66292 5.76346 6.2988 6.2323 6.76764C6.70114 7.23649 7.33702 7.49988 8.00006 7.49988C8.6631 7.49988 9.29899 7.23649 9.76783 6.76764C10.2367 6.2988 10.5001 5.66292 10.5001 4.99988Z" fill="white" />
                </svg>
              </div>
              Đăng ký
            </a>
          </div>
        ) : (
          // --- ĐÃ ĐĂNG NHẬP ---
          <div className={s.header_right}>
            {!checkAccount && (
               <a 
                className={`${s.btn_common} ${s.btn_outline}`} 
                href="/nha-tuyen-dung/dang-tin-moi"
              >
                Đăng tin
              </a>
            )}
            
            {/* Nút Thông báo */}
            <div id="noti">
              <button className={s.btn_icon_circle} onClick={toggleNotiPc}>
                 <img src="/images/bell.svg" alt="Thông báo" />
              </button>
              {showNotiPc && <NotificationCenter setIsOutside={setIsOutsideNotiPc} />}
            </div>

            {/* User Info */}
            <div id="user" className={s.user_container}>
              <button className={s.btn_user_profile} onClick={toggleModal}>
                <div className={s.user_avatar}>
                  <img 
                    src={handleImageSource(mockAva)} 
                    alt="avatar"
                    onError={(e) => { e.currentTarget.src = "/images/candidate/applicant.png"; }}
                  />
                </div>
                <span className={s.user_name}>{mockName}</span>
                <img className={s.icon_caret} src="/images/them.svg" alt="more" />
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
      <div className={`${s.container_header} ${s.header_mobile}`}>
        <div id="menu_sidebar">
          <button className={s.btn_icon_transparent} onClick={toggleMenuSidebar}>
            <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M33.4167 18.332H6.58333C5.70888 18.332 5 19.0409 5 19.9154V20.082C5 20.9565 5.70888 21.6654 6.58333 21.6654H33.4167C34.2911 21.6654 35 20.9565 35 20.082V19.9154C35 19.0409 34.2911 18.332 33.4167 18.332Z" fill="#3582CD" />
                <path d="M33.4167 26.6655H6.58333C5.70888 26.6655 5 27.3744 5 28.2489V28.4155C5 29.29 5.70888 29.9989 6.58333 29.9989H33.4167C34.2911 29.9989 35 29.29 35 28.4155V28.2489C35 27.3744 34.2911 26.6655 33.4167 26.6655Z" fill="#3582CD" />
                <path d="M33.4167 9.99878H6.58333C5.70888 9.99878 5 10.7077 5 11.5821V11.7488C5 12.6232 5.70888 13.3321 6.58333 13.3321H33.4167C34.2911 13.3321 35 12.6232 35 11.7488V11.5821C35 10.7077 34.2911 9.99878 33.4167 9.99878Z" fill="#3582CD" />
            </svg>
          </button>
          {menuSidebar && <MenuSidebar closeMenuSidebar={() => setMenuSidebar(false)} />}
        </div>

        <a href="/" className={s.brand_logo_mobile}>
          <img src="/images/candidate/applicant.png" alt="Logo" width={110} height={40} style={{objectFit: 'contain'}} />
        </a>

        {accessToken ? (
           <div id="notiMobi">
              <button className={s.btn_icon_transparent} onClick={toggleNotiMobi}>
                 <img src="/images/bell.svg" alt="Chat" width={24} height={24} />
              </button>
              {showNotiMobi && <NotificationCenter />}
           </div>
        ) : (
           <div style={{width: '32px'}}></div> // Spacer
        )}
      </div>
    </>
  );
}