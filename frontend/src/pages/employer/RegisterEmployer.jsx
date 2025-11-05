/* eslint-disable @next/next/no-css-tags */
import React, { useState } from 'react';
import { Select, Spin } from 'antd';
import styles from './register-ntd.module.scss';
// import Upload_img_ntd from '@/components/common/upload_img_ntd'; // Giả định component này tồn tại

// --- Dữ liệu mẫu (Mock Data) ---
const mockCities = [
  { value: 1, label: 'Hà Nội' },
  { value: 2, label: 'Hồ Chí Minh' },
  { value: 45, label: 'Đà Nẵng' },
  { value: 13, label: 'Bắc Ninh' },
  { value: 33, label: 'Hải Phòng' },
];
// --- Kết thúc Dữ liệu mẫu ---

const RegisterEmployer = () => {
  // --- State cho giao diện ---
  const [isPasswordVisible, setPasswordVisibility] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisibility(!isPasswordVisible);
  };

  const [isRePasswordVisible, setRePasswordVisibility] = useState(false);
  const toggleRePasswordVisibility = () => {
    setRePasswordVisibility(!isRePasswordVisible);
  };

  // State cho component upload ảnh
  const [parentImages, setParentImages] = useState([]);
  const handleImagesChange = (newImages) => {
    setParentImages(newImages);
    console.log('Ảnh đã được cập nhật:', newImages);
  };

  // State cho nút submit và checkbox
  const [loading, setLoading] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(true);

  // State cho các trường (vì đã loại bỏ react-hook-form)
  const [selectedCity, setSelectedCity] = useState(null);

  // --- Hàm xử lý mẫu (đã loại bỏ logic) ---
  const handleSubmit = (event) => {
    event.preventDefault(); // Ngăn trình duyệt submit
    if (!agreeToTerms) {
      alert('Bạn cần đồng ý với điều khoản!');
      return;
    }
    setLoading(true);
    alert('Biểu mẫu đã được gửi! (Phần logic đã bị loại bỏ)');
    console.log('Dữ liệu form (đã loại bỏ logic):', {
      city: selectedCity,
      images: parentImages,
    });
    // Giả lập thời gian chờ
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  return (
    <>
      {/* <Head>...</Head> bị loại bỏ vì đây là React.js, không phải Next.js */}
      {/* <ModalLock /> đã bị loại bỏ */}

      <link rel="stylesheet" href="styles/register_select.css" />
      <div
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        {/* <Link> được thay bằng <a> */}
        <a href={'/dang-ky-ntd'}>
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
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.7194 2.84785C11.0127 2.52683 11.1724 2.10225 11.1648 1.66354C11.1572 1.22483 10.9829 0.806251 10.6787 0.495988C10.3744 0.185726 9.96389 0.00800433 9.53366 0.000263828C9.10342 -0.00747668 8.68703 0.155368 8.37221 0.454493L1.17357 7.79261L0 8.98928L1.17357 10.186L8.37 17.5241C8.68307 17.8327 9.10249 18.0036 9.53793 17.9999C9.97337 17.9963 10.39 17.8184 10.698 17.5046C11.0061 17.1908 11.1809 16.7661 11.1849 16.3221C11.1889 15.8781 11.0217 15.4502 10.7194 15.1307L6.35721 10.6827H29.3393C29.7797 10.6827 30.2021 10.5043 30.5136 10.1867C30.825 9.86913 31 9.43841 31 8.98928C31 8.54016 30.825 8.10944 30.5136 7.79186C30.2021 7.47429 29.7797 7.29587 29.3393 7.29587H6.35721L10.7194 2.84785Z"
                fill="#F8F8F8"
              />
            </svg>
          </div>
        </a>
        {/* <Image> được thay bằng <img> (loại bỏ 'fill') */}
        <img
          src="/images/authorization/bg-regis-768.png"
          alt="Anh minh hoa"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: -1,
          }}
        />

        <div className={styles.wrapper_layout}>
          <div className={styles.wrapper_body}>
            <div className={styles.wrapper_content}>
              <div className={styles.container_left}>
                <div className={styles.content_left}>
                  <div className={styles.wrapper_img}>
                    {/* <Image> được thay bằng <img> */}
                    <img
                      height={124}
                      width={377}
                      src="/images/authorization/img_right.png"
                      alt="Anh minh hoa"
                      style={{ objectFit: 'contain' }}
                    />
                  </div>
                  <p className={styles.title}>
                    Tìm việc nhanh, tuyển dụng hiệu quả
                  </p>
                </div>
                {/* <Image> được thay bằng <img> */}
                <img
                  height={354}
                  width={606}
                  src="/images/authorization/img_bot_left.svg"
                  className={styles.images_bot}
                  alt="Anh minh hoa"
                ></img>
              </div>
              <form
                className={styles.container_right}
                onSubmit={handleSubmit}
              >
                <h1 className={styles.title_right}>
                  ĐĂNG KÝ TÀI KHOẢN NGƯỜI ĐĂNG TIN ĐỂ TUYỂN DỤNG HIỆU QUẢ
                </h1>
                <div className={styles.box_top_info}>
                  <h2
                    style={{
                      fontFamily: 'Roboto',
                      fontSize: '18px',
                      fontStyle: 'normal',
                      fontWeight: '500',
                      lineHeight: 'normal',
                      marginBottom: '10px',
                      color: '#3582CD',
                    }}
                  >
                    Thông tin đăng ký
                  </h2>
                  <div className={styles.form_gr}>
                    {/* Loại bỏ Controller, dùng input chuẩn */}
                    <div className={`${styles.form_reg} ${styles.reg_left_50}`}>
                      <label htmlFor="txtemail" className={styles.form_title}>
                        <h3 style={{ all: 'inherit' }}>
                          Tài khoản (Email){' '}
                          <span className={styles.red_star}>*</span>
                        </h3>
                      </label>
                      <input
                        type="text"
                        name="email"
                        className={`${styles.form_control} ${styles.valid}`}
                        placeholder="Nhập email"
                        required
                        disabled={loading}
                      />
                    </div>

                    {/* Loại bỏ Controller, dùng input chuẩn */}
                    <div
                      className={`${styles.form_reg} ${styles.reg_right_50}`}
                    >
                      <label htmlFor="sdt" className={styles.form_title}>
                        <h3 style={{ all: 'inherit' }}>
                          Số điện thoại liên hệ{' '}
                          <span className={styles.red_star}>*</span>
                        </h3>
                      </label>
                      <input
                        type="text"
                        name="sdt"
                        className={`${styles.form_control} ${styles.numbersonly} ${styles.valid}`}
                        placeholder="Vui lòng nhập số điện thoại"
                        required
                        disabled={loading}
                      />
                    </div>

                    {/* Loại bỏ Controller, dùng input chuẩn */}
                    <div className={`${styles.form_reg} ${styles.reg_left_50}`}>
                      <label
                        htmlFor="txtpassword"
                        className={styles.form_title}
                      >
                        <h3 style={{ all: 'inherit' }}>
                          Mật khẩu đăng nhập
                          <span className={styles.red_star}>*</span>
                        </h3>
                      </label>
                      <input
                        type={isPasswordVisible ? 'text' : 'password'}
                        name="password"
                        className={styles.form_control}
                        maxLength={20}
                        placeholder="Nhập mật khẩu"
                        required
                        disabled={loading}
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
                    </div>

                    {/* Loại bỏ Controller, dùng input chuẩn */}
                    <div
                      className={`${styles.form_reg} ${styles.reg_right_50}`}
                    >
                      <label
                        htmlFor="txtrepassword"
                        className={styles.form_title}
                      >
                        <h3 style={{ all: 'inherit' }}>
                          Nhập lại mật khẩu
                          <span className={styles.red_star}>*</span>
                        </h3>
                      </label>
                      <input
                        type={isRePasswordVisible ? 'text' : 'password'}
                        name="confirmPassword"
                        className={styles.form_control}
                        maxLength={20}
                        placeholder="Nhập lại mật khẩu"
                        required
                        disabled={loading}
                      />
                      {isRePasswordVisible ? (
                        <svg
                          onClick={toggleRePasswordVisibility}
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
                          onClick={toggleRePasswordVisibility}
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
                    </div>

                    {/* Loại bỏ Controller, dùng input chuẩn */}
                    <div className={`${styles.form_reg} ${styles.reg_left_50}`}>
                      <label
                        htmlFor="txtlastname"
                        className={styles.form_title}
                      >
                        <h3 style={{ all: 'inherit' }}>
                          Tên công ty{' '}
                          <span className={styles.red_star}>*</span>
                        </h3>
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        className={styles.form_control}
                        id="txtlastname"
                        placeholder="Nhập công ty"
                        required
                        disabled={loading}
                      />
                    </div>

                    {/* Loại bỏ Controller, dùng Select của AntD */}
                    <div
                      className={`${styles.form_reg} ${styles.reg_right_50}`}
                    >
                      <label
                        htmlFor="txtlastname"
                        className={styles.form_title}
                      >
                        <h3 style={{ all: 'inherit' }}>
                          Địa chỉ công ty{' '}
                          <span className={styles.red_star}>*</span>
                        </h3>
                      </label>
                      <Select
                        className={styles.form_control}
                        placeholder="Tỉnh/Thành phố"
                        value={selectedCity}
                        onChange={(value) => setSelectedCity(value)}
                        style={{ width: '100%' }}
                        options={mockCities} // Dùng dữ liệu mẫu
                        size="large"
                        showSearch
                        filterOption={(inputValue, option) =>
                          option?.label
                            ?.toLowerCase()
                            .includes(inputValue?.toLowerCase())
                        }
                        disabled={loading}
                      />
                      {/* Cần thêm logic validation nếu không dùng react-hook-form */}
                    </div>

                    {/* Loại bỏ Controller, dùng textarea chuẩn */}
                    <div className={`${styles.form_reg} `}>
                      <label htmlFor="txtemail" className={styles.form_title}>
                        <h2
                          style={{
                            all: 'inherit',
                            color: '#3582CD',
                            fontSize: '18px',
                          }}
                        >
                          Giới thiệu về công ty
                        </h2>
                      </label>
                      <textarea
                        name="companyDescription"
                        placeholder={`1. Giới thiệu chung về công ty.\n2. Đặc điểm về nhân lực.\n3. Nhu cầu tuyển dụng nhân sự.\n4. Các vị trí thường xuyên tuyển dụng.\n5. Quy trình tuyển dụng.\n6. Quyền lợi làm việc của người lao động tại công ty.\n7. Viết tối ưu nội dung, không sửa trong phần tên công ty. `}
                        className={`${styles.form_control} ${styles.text_area}`}
                        style={{ width: '100%' }}
                        disabled={loading}
                      />
                    </div>

                    {/* Giữ lại component Upload_img_ntd
                    <Upload_img_ntd onImagesChange={handleImagesChange} /> */}

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
                        disabled={loading}
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
                  </div>
                </div>
                <div className={styles.box_confirm}>
                  <button
                    className={styles.btn_confirm}
                    type="submit"
                    disabled={loading || !agreeToTerms}
                    style={{
                      cursor:
                        loading || !agreeToTerms ? 'not-allowed' : 'pointer',
                      opacity: loading || !agreeToTerms ? '0.5' : '1',
                    }}
                  >
                    ĐĂNG KÝ {loading && <Spin />}
                  </button>
                  <div className={styles.btn_content}>
                    <p>Bạn đã có tài khoản?</p>
                    <pre>{' '}</pre>
                    {/* <Link> được thay bằng <a> */}
                    <a href={'/dang-nhap-ntd'}>ĐĂNG NHẬP NGAY</a>
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

export default RegisterEmployer;