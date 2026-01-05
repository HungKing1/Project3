// src/pages/SignInSignUp.jsx

/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import styles from './signIn-signUp.module.scss';
import { useLocation, Link, useNavigate } from 'react-router-dom';

const SignIn_SignUp = () => {
    const [checkLayout, setCheckLayout] = useState(false); // false = Đăng Ký, true = Đăng Nhập
    const location = useLocation();
    const navigate = useNavigate();

    // Thêm state để kích hoạt animation khi đổi layout
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        const asPath = location.pathname;
        setIsAnimating(true); // Bắt đầu animation
        const timeout = setTimeout(() => setIsAnimating(false), 500); // Tắt sau khi animation xong

        if (asPath.includes('dang-nhap')) {
            setCheckLayout(true);
        }
        if (asPath.includes('dang-ky')) {
            setCheckLayout(false);
        }
        return () => clearTimeout(timeout);
    }, [location.pathname]);

    return (
        <>
            <div className={styles.wrapper_layout}>
                <div className={styles.wrapper_body}>
                    {/* Nút Back */}
                    <button
                        className={styles.arr_back_btn} // Đổi tên class để tránh trùng với thẻ svg
                        onClick={() => navigate('/')}
                        aria-label="Quay lại trang chủ"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="52"
                            height="27"
                            viewBox="0 0 52 27"
                            fill="none"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M17.9809 4.27177C18.4729 3.79025 18.7408 3.15337 18.7281 2.49531C18.7153 1.83724 18.423 1.20938 17.9126 0.743983C17.4022 0.278589 16.7136 0.0120065 15.9919 0.000395741C15.2703 -0.011215 14.5718 0.233053 14.0437 0.681739L1.96857 11.6889L0 13.4839L1.96857 15.2789L14.04 26.2861C14.5652 26.749 15.2687 27.0054 15.9991 26.9999C16.7295 26.9944 17.4284 26.7276 17.9451 26.2569C18.4618 25.7861 18.7551 25.1492 18.7618 24.4831C18.7685 23.8171 18.4881 23.1754 17.9809 22.6961L10.6637 16.024H49.2143C49.9531 16.024 50.6617 15.7564 51.1841 15.2801C51.7065 14.8037 52 14.1576 52 13.4839C52 12.8102 51.7065 12.1642 51.1841 11.6878C50.6617 11.2114 49.9531 10.9438 49.2143 10.9438H10.6637L17.9809 4.27177Z"
                                fill="currentColor" // Dùng currentColor để màu sắc có thể thay đổi bằng CSS
                            />
                        </svg>
                    </button>

                    <div className={`${styles.container_right} ${isAnimating ? styles.is_animating : ''}`}>
                        <div className={styles.title_right}>
                            <h1 className={styles.title}>
                                {checkLayout ? (
                                    <>
                                        Đăng nhập tài khoản ứng viên và nhà tuyển dụng nhanh chóng
                                        tại đây
                                    </>
                                ) : (
                                    <>
                                        Đăng ký tài khoản miễn phí để tìm việc,
                                        <br className={styles.check_resp} /> tuyển dụng hiệu quả
                                    </>
                                )}
                            </h1>
                            {/* Star image - giữ nguyên */}
                            <img
                                className={styles.star}
                                src="/images/authorization/star.png"
                                alt="Anh minh hoa"
                            />
                        </div>
                        <div className={styles.user}>
                            <div className={styles.type_user}>
                                <div className={styles.type_user_inner}>
                                    <Link
                                        style={{ width: 'fit-content' }}
                                        to={`/${checkLayout ? 'dang-nhap' : 'dang-ky'}-ntd`}
                                    >
                                        <div className={styles.employer}>
                                            {checkLayout ? 'ĐĂNG NHẬP ' : 'ĐĂNG KÝ'} NHÀ TUYỂN DỤNG
                                        </div>
                                    </Link>
                                    <Link
                                        to={`/${checkLayout ? 'dang-nhap' : 'dang-ky'}-ung-vien`}
                                    >
                                        <div className={styles.candidate}>
                                            {checkLayout ? 'ĐĂNG NHẬP ' : 'ĐĂNG KÝ'} ỨNG VIÊN
                                        </div>
                                    </Link>
                                </div>
                            </div>
                            <p className={styles.ask}>
                                {!checkLayout
                                    ? 'Bạn đã có tài khoản?'
                                    : 'Bạn chưa có tài khoản?'}{' '}
                                <Link
                                    to={`/${!checkLayout ? 'dang-nhap' : 'dang-ky'}`}
                                    className={styles.login}
                                >
                                    {' '}
                                    {!checkLayout ? 'ĐĂNG NHẬP ' : 'ĐĂNG KÝ'}{' '}
                                </Link>{' '}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignIn_SignUp;