import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import ContentLeft from '../../components/auth/content_left'
import styles from './login-ntd.module.scss'

const LoginCandidate = () => {
  // ✅ hook của react-hook-form
  const { control, handleSubmit, formState: { errors } } = useForm()

  // ✅ các state còn thiếu
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const [isBtnDisabled, setIsBtnDisabled] = useState(false)

  // ✅ toggle hiển thị mật khẩu
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(prev => !prev)
  }

  // ✅ xử lý submit
  const onSubmit = async (data) => {
    console.log('Form Data:', data)
    setIsBtnDisabled(true)

    try {
      // Giả lập API login
      await new Promise(resolve => setTimeout(resolve, 1000))
      alert('Đăng nhập thành công!')
    } catch (error) {
      console.error('Đăng nhập thất bại:', error)
    } finally {
      setIsBtnDisabled(false)
    }
  }

  return (
    <div className={styles.wrapper_layout}>
      <div className={styles.wrapper_body}>
        <div className={styles.wrapper_content}>
          {/* Bên trái */}
          <div className={styles.container_left}>
            <ContentLeft />
          </div>

          {/* Form đăng nhập */}
          <form
            className={styles.container_right}
            onSubmit={handleSubmit(onSubmit)} // ✅ sửa lỗi ở đây
          >
            <h1 className={styles.title_right}>
              ĐĂNG NHẬP ỨNG VIÊN ĐỂ TIẾP CẬN DANH SÁCH VIỆC LÀM CHẤT LƯỢNG, UY TÍN
            </h1>

            <div className={styles.box_top_info}>
              <div className={styles.form_gr}>
                {/* --- TÀI KHOẢN --- */}
                <div className={styles.form_reg}>
                  <svg className={styles.prev_icon} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M19.8974 19.1201C19.8299 19.2356 19.7327 19.3315 19.6158 19.3982C19.4988 19.4649 19.3661 19.5 19.231 19.5H0.768484C0.633516 19.4999 0.500959 19.4647 0.384124 19.3979C0.26729 19.3312 0.17029 19.2352 0.102866 19.1197C0.0354414 19.0042 -3.46252e-05 18.8732 2.53589e-08 18.7399C3.46759e-05 18.6066 0.0355787 18.4756 0.103063 18.3602C1.56757 15.8591 3.82442 14.0658 6.45822 13.2157C5.15542 12.4495 4.14323 11.2822 3.57709 9.89281C3.01094 8.50345 2.92215 6.96893 3.32434 5.52489C3.72653 4.08085 4.59746 2.80715 5.8034 1.89939C7.00934 0.991631 8.48359 0.5 9.99976 0.5C11.5159 0.5 12.9902 0.991631 14.1961 1.89939C15.4021 2.80715 16.273 4.08085 16.6752 5.52489C17.0774 6.96893 16.9886 8.50345 16.4224 9.89281C15.8563 11.2822 14.8441 12.4495 13.5413 13.2157C16.1751 14.0658 18.432 15.8591 19.8965 18.3602C19.9641 18.4756 19.9998 18.6066 20 18.74C20.0002 18.8734 19.9648 19.0044 19.8974 19.1201Z" fill="#2268A7" />
                  </svg>

                  <Controller
                    name="sdt"
                    control={control}
                    rules={{
                      required: 'Vui lòng nhập tài khoản đăng nhập',
                    }}
                    render={({ field }) => (
                      <>
                        <input
                          type="text"
                          {...field}
                          className={styles.form_control}
                          placeholder="Vui lòng nhập email hoặc số điện thoại"
                        />
                        {errors.sdt && (
                          <span className={styles.text_error}>{errors.sdt.message}</span>
                        )}
                      </>
                    )}
                  />
                </div>

                {/* --- MẬT KHẨU --- */}
                <div className={styles.form_reg}>
                  <svg className={styles.prev_icon} xmlns="http://www.w3.org/2000/svg" width="15" height="21" viewBox="0 0 15 21" fill="none">
                    <path d="M7.5 15.7381C7.99728 15.7381 8.47419 15.5374 8.82582 15.1802C9.17746 14.823 9.375 14.3385 9.375 13.8333C9.375 13.3282 9.17746 12.8437 8.82582 12.4865C8.47419 12.1293 7.99728 11.9286 7.5 11.9286C7.00272 11.9286 6.52581 12.1293 6.17418 12.4865C5.82254 12.8437 5.625 13.3282 5.625 13.8333C5.625 14.3385 5.82254 14.823 6.17418 15.1802C6.52581 15.5374 7.00272 15.7381 7.5 15.7381Z" fill="#2268A7" />
                  </svg>

                  <Controller
                    name="password"
                    control={control}
                    rules={{
                      required: 'Vui lòng nhập mật khẩu',
                      validate: {
                        minLength: (value) => {
                          const trimmedValue = value.replace(/\s/g, '')
                          return trimmedValue.length >= 6 || 'Mật khẩu phải có ít nhất 6 ký tự'
                        },
                        noSpace: (value) => !/\s/.test(value) || 'Mật khẩu không được chứa khoảng trắng',
                      },
                    }}
                    render={({ field }) => (
                      <>
                        <input
                          type={isPasswordVisible ? 'text' : 'password'}
                          {...field}
                          className={styles.form_control}
                          maxLength={20}
                          placeholder="Nhập mật khẩu"
                        />
                        {errors.password && (
                          <span className={styles.text_error}>{errors.password.message}</span>
                        )}
                      </>
                    )}
                  />

                  {/* Nút ẩn/hiện mật khẩu */}
                  {isPasswordVisible ? (
                    <svg onClick={togglePasswordVisibility} xmlns="http://www.w3.org/2000/svg" width="22" height="12" viewBox="0 0 22 12" fill="none" className={styles.icon_input_show}>
                      <path d="M11 0C1.7875 0 0 6.65217 0 6.65217C0 6.65217 3.025 12 10.8625 12C18.7 12 22 6.78261 22 6.78261C22 6.78261 20.2125 0 11 0Z" fill="#777777" />
                    </svg>
                  ) : (
                    <svg onClick={togglePasswordVisibility} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" className={styles.icon_input}>
                      <path d="M16.125 6.5L15.125 7.5C17.25 8.625 18.25 10.375 18.625 11.25C17.75 12.375 15.125 15.125 9.875 15.125Z" fill="#777777" />
                    </svg>
                  )}
                </div>
              </div>
            </div>

            {/* --- ĐIỀU KHOẢN VÀ NÚT XÁC NHẬN --- */}
            <div className={styles.box_confirm}>
              <span className={styles.forgot_pass}>
                <Link to="/quen-mat-khau" className={styles.forgot_pass}>Quên mật khẩu</Link>
              </span>

              <div className={styles.term_condition_container}>
                <input
                  type="checkbox"
                  id="term_condition"
                  onChange={(e) => setAgreeToTerms(e.target.checked)}
                  checked={agreeToTerms}
                />
                <label htmlFor="term_condition">
                  Tôi đã đọc và đồng ý <a href="/quy-che-hoat-dong" target="_blank">Quy chế hoạt động</a> và <a href="/quy-dinh-bao-mat" target="_blank">Chính sách bảo mật</a>
                </label>
              </div>

              <button
                className={styles.btn_confirm}
                type="submit"
                disabled={isBtnDisabled || !agreeToTerms}
                style={{
                  cursor: agreeToTerms ? 'pointer' : 'not-allowed',
                  opacity: agreeToTerms ? '1' : '0.5'
                }}
              >
                ĐĂNG NHẬP
              </button>

              <div className={styles.btn_content}>
                <p>Bạn chưa có tài khoản?</p>
                <Link to="/dang-ky-ung-vien">ĐĂNG KÝ NGAY</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginCandidate
