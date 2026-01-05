/* eslint-disable @next/next/no-img-element */
import React, { Fragment, useEffect, useRef, useState } from 'react';
import s from './menu-account.module.css';
import axios from 'axios';
import toast from 'react-hot-toast';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// --- Mock Data & Stubs ---
const isExperiment = false;
const handleImageSource = (src) => src || '/images/candidate/applicant.png';
const mockCookieId = '123456';
const mockContext = {
    name: "Nguyễn Văn A",
    phone: "0912345678",
    ava: "/images/candidate/applicant.png",
    point: 100,
    percentHoSo: 80,
    candiAllowSearch_context: '1'
};

// --- Menu Data ---
const listMenuCompany = [
    {
        id: 1, icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="#3582CD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M2 12.88V11.12C2 10.08 2.85 9.22 3.9 9.22C5.71 9.22 6.45 7.94 5.54 6.37C5.02 5.47 5.33 4.3 6.24 3.78L7.97 2.79C8.76 2.32 9.78 2.6 10.25 3.39L10.36 3.58C11.26 5.15 12.74 5.15 13.65 3.58L13.76 3.39C14.23 2.6 15.25 2.32 16.04 2.79L17.77 3.78C18.68 4.3 18.99 5.47 18.47 6.37C17.56 7.94 18.3 9.22 20.11 9.22C21.15 9.22 22.01 10.08 22.01 11.12V12.88C22.01 13.92 21.16 14.78 20.11 14.78C18.3 14.78 17.56 16.06 18.47 17.63C18.99 18.54 18.68 19.7 17.77 20.22L16.04 21.21C15.25 21.68 14.23 21.4 13.76 20.61L13.65 20.42C12.75 18.85 11.27 18.85 10.36 20.42L10.25 20.61C9.78 21.4 8.76 21.68 7.97 21.21L6.24 20.22C5.33 19.7 5.02 18.53 5.54 17.63C6.45 16.06 5.71 14.78 3.9 14.78C2.85 14.78 2 13.92 2 12.88Z" stroke="#3582CD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
        href: '/nha-tuyen-dung/quan-ly-chung', name: 'Quản lý chung', listObjChildren: []
    },
    {
        id: 2, icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.5 11.9V7.64C20.5 3.61 19.56 2.6 15.78 2.6H8.22C4.44 2.6 3.5 3.61 3.5 7.64V16.36C3.5 20.39 4.44 21.4 8.22 21.4H12.86" stroke="#3582CD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M8 7.60001H16" stroke="#3582CD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 11.6H15" stroke="#3582CD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M18.21 15.37L14.67 18.91C14.53 19.05 14.4 19.31 14.37 19.5L14.18 20.85C14.11 21.34 14.45 21.68 14.94 21.61L16.29 21.42C16.48 21.39 16.75 21.26 16.88 21.12L20.42 17.58C21.03 16.97 21.32 16.26 20.42 15.36C19.53 14.47 18.82 14.76 18.21 15.37Z" stroke="#3582CD" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/><path d="M17.7 15.88C18 16.96 18.84 17.8 19.92 18.1" stroke="#3582CD" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/></svg>,
        href: '/nha-tuyen-dung/dang-tin-moi', name: 'Đăng tin', listObjChildren: []
    },
    {
        id: 3, icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="9" cy="6" r="4" stroke="#3582CD" strokeWidth="1.5"/><path d="M15 9C16.6569 9 18 7.65685 18 6C18 4.34315 16.6569 3 15 3" stroke="#3582CD" strokeWidth="1.5" strokeLinecap="round"/><ellipse cx="9" cy="17" rx="7" ry="4" stroke="#3582CD" strokeWidth="1.5"/><path d="M18 14C19.7542 14.3846 21 15.3589 21 16.5C21 17.5293 19.9863 18.4229 18.5 18.8704" stroke="#3582CD" strokeWidth="1.5" strokeLinecap="round"/></svg>,
        href: '/nha-tuyen-dung/ung-vien-den-ung-tuyen', name: 'Ứng viên ứng tuyển', listObjChildren: []
    },
    {
        id: 7, icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 10H7C9 10 10 9 10 7V5C10 3 9 2 7 2H5C3 2 2 3 2 5V7C2 9 3 10 5 10Z" stroke="#3582CD" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/><path d="M17 10H19C21 10 22 9 22 7V5C22 3 21 2 19 2H17C15 2 14 3 14 5V7C14 9 15 10 17 10Z" stroke="#3582CD" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/><path d="M17 22H19C21 22 22 21 22 19V17C22 15 21 14 19 14H17C15 14 14 15 14 17V19C14 21 15 22 17 22Z" stroke="#3582CD" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/><path d="M5 22H7C9 22 10 21 10 19V17C10 15 9 14 7 14H5C3 14 2 15 2 17V19C2 21 3 22 5 22Z" stroke="#3582CD" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/></svg>,
        href: '', name: 'Quản lý tài khoản',
        listObjChildren: [
            { id: 1000, itemLeft: 'Đổi mật khẩu', itemRight: 'Thông tin cá nhân', hrefLeft: '/nha-tuyen-dung/doi-mat-khau', hrefRight: '/nha-tuyen-dung/cap-nhat-thong-tin' },
        ]
    },
];

const MenuAccount = ({ checkAccount, setCheckLogin, setIsOutside }) => {
    const { name, point, phone, ava, percentHoSo } = mockContext;
    const [candiAllowSearch, setCandiAllowSearch] = useState(mockContext.candiAllowSearch_context);
    const menuRef = useRef(null);
    const [expandedItems, setExpandedItems] = useState([]);

    // CẬP NHẬT CÁC ĐƯỜNG DẪN (HREF) TẠI ĐÂY
    const listMenuPerson = [
        {
            id: 1, icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="#3582CD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M2 12.88V11.12C2 10.08 2.85 9.22 3.9 9.22C5.71 9.22 6.45 7.94 5.54 6.37C5.02 5.47 5.33 4.3 6.24 3.78L7.97 2.79C8.76 2.32 9.78 2.6 10.25 3.39L10.36 3.58C11.26 5.15 12.74 5.15 13.65 3.58L13.76 3.39C14.23 2.6 15.25 2.32 16.04 2.79L17.77 3.78C18.68 4.3 18.99 5.47 18.47 6.37C17.56 7.94 18.3 9.22 20.11 9.22C21.15 9.22 22.01 10.08 22.01 11.12V12.88C22.01 13.92 21.16 14.78 20.11 14.78C18.3 14.78 17.56 16.06 18.47 17.63C18.99 18.54 18.68 19.7 17.77 20.22L16.04 21.21C15.25 21.68 14.23 21.4 13.76 20.61L13.65 20.42C12.75 18.85 11.27 18.85 10.36 20.42L10.25 20.61C9.78 21.4 8.76 21.68 7.97 21.21L6.24 20.22C5.33 19.7 5.02 18.53 5.54 17.63C6.45 16.06 5.71 14.78 3.9 14.78C2.85 14.78 2 13.92 2 12.88Z" stroke="#3582CD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
            href: '/candidate/general-management', name: 'Quản lý chung', listObjChildren: []
        },
        {
            id: 2, icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.06 19.39L13.53 19.9C9.56 21.18 7.47 20.11 6.18 16.14L4.9 12.19C3.62 8.22 4.68 6.12 8.65 4.84L10.23 4.32C10.64 4.19 11.03 4.08 11.4 4.01C11.1 4.62 10.86 5.36 10.66 6.21L9.68 10.4C8.7 14.58 9.99 16.64 14.16 17.63L15.84 18.03C16.42 18.17 16.96 18.26 17.46 18.3C16.84 18.72 16.06 19.07 15.11 19.38H15.06Z" stroke="#3582CD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M12.64 8.53003L17.49 9.76003" stroke="#3582CD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M11.66 12.4L14.56 13.14" stroke="#3582CD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M20.96 5.1C22.04 6.3 22.23 8.02 21.66 10.44L20.68 14.62C19.84 18.23 18.18 19.69 15.06 19.39C14.56 19.35 14.02 19.26 13.44 19.12L11.76 18.72C7.59 17.73 6.3 15.67 7.28 11.49L8.26 7.3C8.46 6.45 8.7 5.71 9 5.1C10.17 2.68 12.16 2.03 15.5 2.82L17.17 3.21" stroke="#3582CD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
            href: '', name: 'Hồ sơ xin việc',
            listObjChildren: [
                { id: 1000, itemLeft: 'CV xin việc', itemRight: !isExperiment ? 'File tải lên' : "", hrefLeft: '/candidate/cv', hrefRight: !isExperiment ? '/candidate/upload-file' : "#" },
            ]
        },
        {
            id: 3, icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="9" cy="9" r="2" stroke="#3582CD" strokeWidth="1.5"/><path d="M13 15C13 16.1046 13 17 9 17C5 17 5 16.1046 5 15C5 13.8954 6.79086 13 9 13C11.2091 13 13 13.8954 13 15Z" stroke="#3582CD" strokeWidth="1.5"/><path d="M2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C22 6.34315 22 8.22876 22 12C22 15.7712 22 17.6569 20.8284 18.8284C19.6569 20 17.7712 20 14 20H10C6.22876 20 4.34315 20 3.17157 18.8284C2 17.6569 2 15.7712 2 12Z" stroke="#3582CD" strokeWidth="1.5"/><path d="M19 12H15" stroke="#3582CD" strokeWidth="1.5" strokeLinecap="round"/><path d="M19 9H14" stroke="#3582CD" strokeWidth="1.5" strokeLinecap="round"/><path d="M19 15H16" stroke="#3582CD" strokeWidth="1.5" strokeLinecap="round"/></svg>,
            href: '', name: 'Hoàn thiện hồ sơ',
            listObjChildren: [
                { id: 1001, itemLeft: `Tiến trình hoàn thiện hồ sơ ${percentHoSo ? percentHoSo + '%' : '0%'}`, itemRight: '', hrefLeft: '/candidate/job-application', hrefRight: '' },
            ]
        },
        {
            id: 5, icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.37 14L21.71 10.43C21.97 7.99 21.27 6 17 6H7C2.73 6 2.03 7.99 2.3 10.43L3.05 18.43C3.26 20.39 3.98 22 8 22H16C20.02 22 20.74 20.39 20.95 18.43" stroke="#3582CD" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/><path d="M8 6V5.2C8 3.43 8 2 11.2 2H12.8C16 2 16 3.43 16 5.2V6" stroke="#3582CD" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 13V14C14 14.01 14 14.01 14 14.02C14 15.11 13.99 16 12 16C10.02 16 10 15.12 10 14.03V13C10 12 10 12 11 12H13C14 12 14 12 14 13Z" stroke="#3582CD" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/><path d="M21.6501 11C19.3401 12.68 16.7001 13.68 14.0001 14.02" stroke="#3582CD" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/><path d="M2.62012 11.27C4.87012 12.81 7.41012 13.74 10.0001 14.03" stroke="#3582CD" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/></svg>,
            href: '/candidate/applied-jobs', name: 'Việc làm đã ứng tuyển', listObjChildren: []
        },
        {
            id: 7, icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 10H7C9 10 10 9 10 7V5C10 3 9 2 7 2H5C3 2 2 3 2 5V7C2 9 3 10 5 10Z" stroke="#3582CD" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/><path d="M17 10H19C21 10 22 9 22 7V5C22 3 21 2 19 2H17C15 2 14 3 14 5V7C14 9 15 10 17 10Z" stroke="#3582CD" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/><path d="M17 22H19C21 22 22 21 22 19V17C22 15 21 14 19 14H17C15 14 14 15 14 17V19C14 21 15 22 17 22Z" stroke="#3582CD" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/><path d="M5 22H7C9 22 10 21 10 19V17C10 15 9 14 7 14H5C3 14 2 15 2 17V19C2 21 3 22 5 22Z" stroke="#3582CD" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/></svg>,
            href: '', name: 'Quản lý tài khoản',
            listObjChildren: [
                { id: 1000, itemLeft: 'Đổi mật khẩu', itemRight: 'Xóa tài khoản', hrefLeft: '/candidate/change-password', hrefRight: '/candidate/delete-account' },
            ]
        },
    ];

    const toggleItem = (index) => {
        setExpandedItems((prev) =>
            prev.includes(index) ? prev.filter((item) => item !== index) : [index]
        );
    };

    const handleClickActiveToggle = () => {
        const newVal = candiAllowSearch === '1' ? '0' : '1';
        setCandiAllowSearch(newVal);
        toast.success(newVal === '1' ? "Đã BẬT tìm kiếm hồ sơ" : "Đã TẮT tìm kiếm hồ sơ");
    };

    const logoutCandidate = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`${API_BASE_URL}/auth/candidate/logout`, {}, { withCredentials: true });
            if (data.success) {
                toast.success("Đăng xuất thành công")
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                localStorage.removeItem('candidate');
                setTimeout(() => window.location.reload(), 1000);
            } else {
                toast.error("Đăng xuất thất bại");
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (menuRef?.current && setIsOutside) {
                const rect = menuRef.current.getBoundingClientRect();
                const isOut = e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom;
                setIsOutside(isOut);
            }
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [setIsOutside]);

    // UI Helpers
    const renderChildItems = (listObjChildren) => {
        if (!listObjChildren || listObjChildren.length === 0) return null;
        return (
            <div className={s["menu-item-child"]}>
                {listObjChildren.map((child, index) => (
                    <div key={index} className={s["item-child"]}>
                        {child.itemRight ? (
                            <>
                                <div className={s["item-left"]} onClick={() => child.hrefLeft && (window.location.href = child.hrefLeft)}>
                                    {child.itemLeft}
                                </div>
                                <div className={s["item-right"]} onClick={() => child.hrefRight && (window.location.href = child.hrefRight)}>
                                    {child.itemRight}
                                </div>
                            </>
                        ) : (
                            <div className={s["item-left"]} style={{ width: '100%' }} onClick={() => child.hrefLeft && (window.location.href = child.hrefLeft)}>
                                {child.itemLeft}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div id="content_menu" className={s['menu-wrapper']} ref={menuRef}>
            <div className={s["box-account"]}>
                <a href="#">
                    <img
                        src={handleImageSource(ava)}
                        alt="avatar"
                        className={s["box-img"]}
                        width={56} height={56}
                        onError={(e) => { e.currentTarget.src = '/images/candidate/applicant.png' }}
                        loading='lazy'
                        decoding='async'
                    />
                </a>
                {checkAccount ? (
                    <div className={s["box-infor"]}>
                        <p className={s["if-name"]} onClick={() => alert(`Xem hồ sơ: ${name}`)} style={{ cursor: 'pointer' }}>{name}</p>
                        <div className={s["if-detail"]}>
                            <p>TK: <span className={s["detail-num"]}>{phone}</span></p>
                            <span>•</span>
                            <p>ID: <span className={s["detail-num"]}>{mockCookieId}</span></p>
                        </div>
                        <div className={s["if-contact"]}>
                            <svg style={{ cursor: 'pointer', width: '24px', height: '14px' }} onClick={handleClickActiveToggle} viewBox="0 0 28 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="28" height="16" rx="8" fill={candiAllowSearch === '1' ? "#3582CD" : "#E0E0E0"} />
                                <circle cx={candiAllowSearch === '1' ? "20" : "8"} cy="8" r="6" fill="white" style={{ transition: 'all 0.3s' }} />
                            </svg>
                            <p>{candiAllowSearch === '1' ? "Đang bật tìm kiếm" : "Đang tắt tìm kiếm"}</p>
                        </div>
                    </div>
                ) : (
                    <div className={s["box-info-company"]}>
                        <p className={s["if-name"]} onClick={() => alert(`Xem công ty: ${name}`)} style={{ cursor: 'pointer' }}>{name}</p>
                        <div className={s["info-point"]}>
                            {!isExperiment && <><p>Điểm: <span>{point}</span></p><span>•</span></>}
                            <p>ID: <span>{mockCookieId}</span></p>
                        </div>
                    </div>
                )}
            </div>

            <div className={s["menu-list"]}>
                {(checkAccount ? listMenuPerson : listMenuCompany).map((item, index) => (
                    <Fragment key={index}>
                        <div
                            className={s["box-content"]}
                            onClick={() => {
                                if (item?.href) window.location.href = item.href;
                                toggleItem(index);
                            }}
                        >
                            <div className={s["content-left"]}>
                                {item.icon}
                                <p className={`${s['item-name']} ${expandedItems.includes(index) ? s.active : ''}`}>{item.name}</p>
                            </div>
                            {item.listObjChildren.length > 0 && (
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={expandedItems.includes(index) ? s['arrow-up'] : s['arrow-down']}>
                                    <path d="M13 6L8 11L3 6" stroke="#3582CD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            )}
                        </div>
                        {expandedItems.includes(index) && renderChildItems(item.listObjChildren)}
                    </Fragment>
                ))}
            </div>

            <div className={s["logout"]}>
                <div className={s["content-value"]} style={{cursor: "pointer"}} onClick={logoutCandidate}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13 17H7C4.23858 17 2 14.7614 2 12V8C2 5.23858 4.23858 3 7 3H13" stroke="#FF4D4F" strokeWidth="1.5" strokeLinecap="round"/>
                        <path d="M14 10H17.5M17.5 10L15.5 8M17.5 10L15.5 12" stroke="#FF4D4F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <p>Đăng xuất</p>
                </div>
            </div>
        </div>
    );
}

export default MenuAccount;