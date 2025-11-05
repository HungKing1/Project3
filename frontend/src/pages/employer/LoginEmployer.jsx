/* eslint-disable @next/next/no-css-tags */
import React, { useState } from 'react';
import styles from './login-ntd.module.scss';
import Content_left from '../../components/auth/content_left';
// Dữ liệu mẫu (Không cần thiết cho form này)

const LoginEmployer = () => {
  // --- State cho giao diện ---
  const [isPasswordVisible, setPasswordVisibility] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisibility(!isPasswordVisible);
  };

  // State cho checkbox điều khoản
  const [agreeToTerms, setAgreeToTerms] = useState(true);

  // --- Hàm xử lý mẫu (đã loại bỏ logic) ---
  const handleSubmit = (event) => {
    event.preventDefault(); // Ngăn trình duyệt submit form
    if (!agreeToTerms) {
      alert('Bạn cần đồng ý với điều khoản!');
      return;
    }
    alert('Đăng nhập! (Phần logic đã bị loại bỏ)');
    // Logic gọi API đăng nhập sẽ được thêm ở đây
  };

  return (
    <>
      {/* <Head>...</Head> và <ModalLock> đã bị loại bỏ */}

      <link rel="stylesheet" href="styles/register_select.css" />
      <div
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        {/* <Link> được thay bằng <a> */}
        <a href={'/dang-nhap'}>
          <div
            style={{
              position: 'absolute',
              left: '10px',
              top: '15px',
              width: '50px',
              height: '50px',
              zIndex: 10,
            }}
          >
            <svg
              width="31"
              height="18"
              viewBox="0 0 31 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd" // Chuyển đổi 'fill-rule' thành 'fillRule'
                clipRule="evenodd" // Chuyển đổi 'clip-rule' thành 'clipRule'
                d="M10.7194 2.84785C11.0127 2.52683 11.1724 2.10225 11.1648 1.66354C11.1572 1.22483 10.9829 0.806251 10.6787 0.495988C10.3744 0.185726 9.96389 0.00800433 9.53366 0.000263828C9.10342 -0.00747668 8.68703 0.155368 8.37221 0.454493L1.17357 7.79261L0 8.98928L1.17357 10.186L8.37 17.5241C8.68307 17.8327 9.10249 18.0036 9.53793 17.9999C9.97337 17.9963 10.39 17.8184 10.698 17.5046C11.0061 17.1908 11.1809 16.7661 11.1849 16.3221C11.1889 15.8781 11.0217 15.4502 10.7194 15.1307L6.35721 10.6827H29.3393C29.7797 10.6827 30.2021 10.5043 30.5136 10.1867C30.825 9.86913 31 9.43841 31 8.98928C31 8.54016 30.825 8.10944 30.5136 7.79186C30.2021 7.47429 29.7797 7.29587 29.3393 7.29587H6.35721L10.7194 2.84785Z"
                fill="#F8F8F8"
              />
            </svg>
          </div>
        </a>
        <div className={styles.wrapper_layout}>
          <div className={styles.wrapper_body}>
            <div className={styles.wrapper_content}>
              <div className={styles.container_left}>
                <Content_left />
              </div>
              <form
                className={styles.container_right}
                onSubmit={handleSubmit}
              >
                <h1 className={styles.title_right}>
                  ĐĂNG NHẬP NGAY ĐỂ TIẾP CẬN HÀNG NGÀN HỒ SƠ ỨNG VIÊN CHẤT LƯỢNG
                </h1>
                <div className={styles.box_top_info}>
                  <div className={styles.form_gr}>
                    {/* Loại bỏ Controller, dùng input chuẩn */}
                    <div className={`${styles.form_reg}`}>
                      <svg
                        className={styles.prev_icon}
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M19.8974 19.1201C19.8299 19.2356 19.7327 19.3315 19.6158 19.3982C19.4988 19.4649 19.3661 19.5 19.231 19.5H0.768484C0.633516 19.4999 0.500959 19.4647 0.384124 19.3979C0.26729 19.3312 0.17029 19.2352 0.102866 19.1197C0.0354414 19.0042 -3.46252e-05 18.8732 2.53589e-08 18.7399C3.46759e-05 18.6066 0.0355787 18.4756 0.103063 18.3602C1.56757 15.8591 3.82442 14.0658 6.45822 13.2157C5.15542 12.4495 4.14323 11.2822 3.57709 9.89281C3.01094 8.50345 2.92215 6.96893 3.32434 5.52489C3.72653 4.08085 4.59746 2.80715 5.8034 1.89939C7.00934 0.991631 8.48359 0.5 9.99976 0.5C11.5159 0.5 12.9902 0.991631 14.1961 1.89939C15.4021 2.80715 16.273 4.08085 16.6752 5.52489C17.0774 6.96893 16.9886 8.50345 16.4224 9.89281C15.8563 11.2822 14.8441 12.4495 13.5413 13.2157C16.1751 14.0658 18.432 15.8591 19.8965 18.3602C19.9641 18.4756 19.9998 18.6066 20 18.74C20.0002 18.8734 19.9648 19.0044 19.8974 19.1201Z"
                          fill="#2268A7"
                        />
                      </svg>
                      <input
                        type="text"
                        name="sdt"
                        className={`${styles.form_control} ${styles.numbersonly} ${styles.valid}`}
                        placeholder="Vui lòng nhập email hoặc số điện thoại"
                        required
                      />
                      {/* Phần hiển thị lỗi đã bị loại bỏ */}
                    </div>

                    {/* Loại bỏ Controller, dùng input chuẩn */}
                    <div className={`${styles.form_reg} `}>
                      <svg
                        className={styles.prev_icon}
                        xmlns="http://www.w3.org/2000/svg"
                        width="15"
                        height="21"
                        viewBox="0 0 15 21"
                        fill="none"
                      >
                        <path
                          d="M7.5 15.7381C7.99728 15.7381 8.47419 15.5374 8.82582 15.1802C9.17746 14.823 9.375 14.3385 9.375 13.8333C9.375 13.3282 9.17746 12.8437 8.82582 12.4865C8.47419 12.1293 7.99728 11.9286 7.5 11.9286C7.00272 11.9286 6.52581 12.1293 6.17418 12.4865C5.82254 12.8437 5.625 13.3282 5.625 13.8333C5.625 14.3385 5.82254 14.823 6.17418 15.1802C6.52581 15.5374 7.00272 15.7381 7.5 15.7381ZM13.125 7.16667C13.6223 7.16667 14.0992 7.36735 14.4508 7.72456C14.8025 8.08177 15 8.56625 15 9.07143V18.5952C15 19.1004 14.8025 19.5849 14.4508 19.9421C14.0992 20.2993 13.6223 20.5 13.125 20.5H1.875C1.37772 20.5 0.900805 20.2993 0.549175 19.9421C0.197544 19.5849 0 19.1004 0 18.5952V9.07143C0 8.56625 0.197544 8.08177 0.549175 7.72456C0.900805 7.36735 1.37772 7.16667 1.875 7.16667H2.8125V5.2619C2.8125 3.99897 3.30636 2.78776 4.18544 1.89473C5.06451 1.0017 6.2568 0.5 7.5 0.5C8.11557 0.5 8.72511 0.62317 9.29383 0.862478C9.86254 1.10179 10.3793 1.45255 10.8146 1.89473C11.2498 2.33691 11.5951 2.86186 11.8307 3.4396C12.0663 4.01734 12.1875 4.63656 12.1875 5.2619V7.16667H13.125ZM7.5 2.40476C6.75408 2.40476 6.03871 2.70578 5.51126 3.2416C4.98382 3.77742 4.6875 4.50414 4.6875 5.2619V7.16667H10.3125V5.2619C10.3125 4.50414 10.0162 3.77742 9.48874 3.2416C8.96129 2.70578 8.24592 2.40476 7.5 2.40476Z"
                          fill="#2268A7"
                        />
                      </svg>
                      <input
                        type={isPasswordVisible ? 'text' : 'password'}
                        name="password"
                        className={styles.form_control}
                        maxLength={20}
                        placeholder="Nhập mật khẩu"
                        required
                      />
                      {isPasswordVisible ? (
                        <svg
                          onClick={togglePasswordVisibility}
                          xmlns="http://www.w3.org/2000/svg"
                          width="22"
                          height="12"
                          viewBox="0 0 22 12"
                          fill="none"
                          className={styles.icon_input_show}
                        >
                          <path
                            d="M11 0C1.7875 0 0 6.65217 0 6.65217C0 6.65217 3.025 12 10.8625 12C18.7 12 22 6.78261 22 6.78261C22 6.78261 20.2125 0 11 0ZM7.2875 1.95652C7.975 1.56522 9.075 1.56522 9.075 1.56522C9.075 1.56522 8.3875 2.73913 8.3875 3.65217C8.3875 4.56522 8.6625 5.08696 8.6625 5.08696L7.15 5.34783C7.15 5.34783 6.7375 4.69565 6.7375 3.78261C6.7375 2.73913 7.2875 1.95652 7.2875 1.95652ZM10.8625 10.6957C5.225 10.6957 2.3375 7.69565 1.5125 6.52174C1.925 5.60869 3.025 3.65217 5.775 2.34783C5.6375 2.86956 5.5 3.3913 5.5 4.04348C5.5 6.91304 7.975 9.26087 11 9.26087C14.025 9.26087 16.5 6.91304 16.5 4.04348C16.5 3.3913 16.3625 2.86956 16.225 2.34783C18.975 3.52174 20.075 5.60869 20.4875 6.52174C19.525 7.69565 16.6375 10.6957 10.8625 10.6957Z"
                            fill="#777777"
                          />
                        </svg>
                      ) : (
                        <svg
                          onClick={togglePasswordVisibility}
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          className={styles.icon_input}
                        >
                          <path
                            d="M16.125 6.5L15.125 7.5C17.25 8.625 18.25 10.375 18.625 11.25C17.75 12.375 15.125 15.125 9.875 15.125C9 15.125 8.375 15 7.625 14.875L6.625 15.875C7.625 16.25 8.75 16.375 9.875 16.375C17 16.375 20 11.375 20 11.375C20 11.375 19.25 8.375 16.125 6.5Z"
                            fill="#777777"
                          />
                          <path
                            d="M15 8.875C15 8.5 15 8.125 14.875 7.875L8.875 13.75C9.25 13.75 9.625 13.875 10 13.875C12.75 13.875 15 11.625 15 8.875ZM19.125 0L13.625 5.5C12.625 5.25 11.375 5 10 5C1.625 5 0 11.375 0 11.375C0 11.375 1.25 13.625 4.125 15.125L0 19.125V20H0.875L20 0.875V0H19.125ZM5 14.125C3 13.25 1.875 11.875 1.375 11.25C1.75 10.375 2.75 8.5 5.25 7.25C5.125 7.75 5 8.25 5 8.875C5 10.25 5.625 11.625 6.625 12.5L5 14.125ZM7.75 9.875L6.5 10.125C6.5 10.125 6.125 9.5 6.125 8.625C6.125 7.625 6.625 6.75 6.625 6.75C7.25 6.375 8.25 6.375 8.25 6.375C8.25 6.375 7.625 7.5 7.625 8.5C7.5 9.375 7.75 9.875 7.75 9.875Z"
                            fill="#777777"
                          />
                        </svg>
                      )}
                      {/* Phần hiển thị lỗi đã bị loại bỏ */}
                    </div>
                  </div>
                </div>
                <div className={styles.box_confirm}>
                  <span className={styles.forgot_pass}>
                    {/* <Link> được thay bằng <a> */}
                    <a
                      href={'/quen-mat-khau'}
                      style={{ cursor: 'pointer' }}
                      className={styles.forgot_pass}
                    >
                      Quên mật khẩu
                    </a>
                  </span>
                  <div
                    className={`${styles.term_condition_container} ${styles['checkbox-wrapper-1']}`}
                  >
                    <input
                      type="checkbox"
                      name="term_condition"
                      id="term_condition"
                      className={styles.substituted}
                      onChange={(e) => setAgreeToTerms(e.target.checked)}
                      checked={agreeToTerms}
                    />
                    <label htmlFor="term_condition">
                      Tôi đã đọc và đồng ý{' '}
                      <a href="/quy-che-hoat-dong" target="_blank" rel="noopener noreferrer">
                        Quy chế hoạt động
                      </a>{' '}
                      và{' '}
                      <a href="/quy-dinh-bao-mat" target="_blank" rel="noopener noreferrer">
                        Chính sách bảo mật
                      </a>{' '}
                      của Job247.vn
                    </label>
                  </div>
                  <button
                    className={styles.btn_confirm}
                    type="submit"
                    disabled={!agreeToTerms}
                    style={{
                      cursor: agreeToTerms ? 'pointer' : 'not-allowed',
                      opacity: agreeToTerms ? '1' : '0.5',
                    }}
                  >
                    ĐĂNG NHẬP
                  </button>
                  <div className={styles.btn_content}>
                    <p>Bạn chưa có tài khoản?</p>
                    {/* <Link> được thay bằng <a> */}
                    <a href={'/dang-ky-ntd'}>ĐĂNG KÝ NGAY</a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginEmployer;