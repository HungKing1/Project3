import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './login-ntd.module.scss' // Đảm bảo tên file SCSS đúng
import axios from 'axios'
import toast from 'react-hot-toast'
import { useAuthContext } from '../../context/AuthContext'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const LoginCandidate = () => {
  const { setAccessToken } = useAuthContext()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [errors, setErrors] = useState({}) // để hiển thị lỗi

  const navigate = useNavigate()

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(prev => !prev)
  }

  const validateForm = () => {
    const newErrors = {}
    if (!email.trim()) newErrors.email = 'Vui lòng nhập tài khoản đăng nhập'
    if (!password) newErrors.password = 'Vui lòng nhập mật khẩu'
    else if (password.replace(/\s/g, '').length < 6)
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự'
    else if (/\s/.test(password))
      newErrors.password = 'Mật khẩu không được chứa khoảng trắng'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    try {
      const { data } = await axios.post(
        `${API_BASE_URL}/auth/candidate/login`,
        { email, password },
        { withCredentials: true }
      )
      if (data.success) {
        toast.success("Đăng nhập thành công")
        const candidate = {
          candidateId : data.data.candidateId,
          email : data.data.email,
          role: "candidate"
        }
        localStorage.setItem("access_token", data.data.accessToken)
        localStorage.setItem("candidate", JSON.stringify(candidate))

        setAccessToken(data.data.accessToken)
        setTimeout(() => {
          navigate('/')
        }, 1000);
      } else {
        toast.error("Đăng nhập thất bại")
      }
    } catch (error) {
      console.log(error)
      toast.error("Có lỗi xảy ra. Vui lòng thử lại")
    }
  }

  return (
    <div style={{ width: '100%', height: '100%' }}>
      {/* Nút Back về trang chủ/trang trước */}
      <Link to={'/'}>
        <div
          style={{
            position: 'absolute',
            left: '10px',
            top: '15px',
            width: '50px',
            height: '50px',
            zIndex: 10,
            cursor: 'pointer'
          }}
        >
          <svg width="31" height="18" viewBox="0 0 31 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M10.7194 2.84785C11.0127 2.52683 11.1724 2.10225 11.1648 1.66354C11.1572 1.22483 10.9829 0.806251 10.6787 0.495988C10.3744 0.185726 9.96389 0.00800433 9.53366 0.000263828C9.10342 -0.00747668 8.68703 0.155368 8.37221 0.454493L1.17357 7.79261L0 8.98928L1.17357 10.186L8.37 17.5241C8.68307 17.8327 9.10249 18.0036 9.53793 17.9999C9.97337 17.9963 10.39 17.8184 10.698 17.5046C11.0061 17.1908 11.1809 16.7661 11.1849 16.3221C11.1889 15.8781 11.0217 15.4502 10.7194 15.1307L6.35721 10.6827H29.3393C29.7797 10.6827 30.2021 10.5043 30.5136 10.1867C30.825 9.86913 31 9.43841 31 8.98928C31 8.54016 30.825 8.10944 30.5136 7.79186C30.2021 7.47429 29.7797 7.29587 29.3393 7.29587H6.35721L10.7194 2.84785Z" fill="#F8F8F8" />
          </svg>
        </div>
      </Link>

      <div className={styles.wrapper_layout}>
        <div className={styles.wrapper_body}>
          <div className={styles.wrapper_content}>
            
            {/* Form đăng nhập (Giờ là duy nhất) */}
            <form className={styles.container_right} onSubmit={handleSubmit}>
              <h1 className={styles.title_right}>
                ĐĂNG NHẬP ỨNG VIÊN
              </h1>
              <p style={{textAlign: 'center', color: '#666', marginBottom: '20px'}}>
                Tiếp cận danh sách việc làm chất lượng, uy tín
              </p>

              <div className={styles.box_top_info}>
                <div className={styles.form_gr}>
                  {/* --- TÀI KHOẢN --- */}
                  <div className={styles.form_reg}>
                    <svg className={styles.prev_icon} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M19.8974 19.1201C19.8299 19.2356 19.7327 19.3315 19.6158 19.3982C19.4988 19.4649 19.3661 19.5 19.231 19.5H0.768484C0.633516 19.4999 0.500959 19.4647 0.384124 19.3979C0.26729 19.3312 0.17029 19.2352 0.102866 19.1197C0.0354414 19.0042 -3.46252e-05 18.8732 2.53589e-08 18.7399C3.46759e-05 18.6066 0.0355787 18.4756 0.103063 18.3602C1.56757 15.8591 3.82442 14.0658 6.45822 13.2157C5.15542 12.4495 4.14323 11.2822 3.57709 9.89281C3.01094 8.50345 2.92215 6.96893 3.32434 5.52489C3.72653 4.08085 4.59746 2.80715 5.8034 1.89939C7.00934 0.991631 8.48359 0.5 9.99976 0.5C11.5159 0.5 12.9902 0.991631 14.1961 1.89939C15.4021 2.80715 16.273 4.08085 16.6752 5.52489C17.0774 6.96893 16.9886 8.50345 16.4224 9.89281C15.8563 11.2822 14.8441 12.4495 13.5413 13.2157C16.1751 14.0658 18.432 15.8591 19.8965 18.3602C19.9641 18.4756 19.9998 18.6066 20 18.74C20.0002 18.8734 19.9648 19.0044 19.8974 19.1201Z" fill="#2268A7" />
                    </svg>

                    <input
                      type="text"
                      className={styles.form_control}
                      placeholder="Vui lòng nhập email hoặc số điện thoại"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  {/* Hiển thị lỗi Email ra ngoài div input để tránh vỡ layout */}
                  {errors.email && <span className={styles.text_error} style={{display: 'block', marginBottom: '10px', marginTop: '-10px'}}>{errors.email}</span>}

                  {/* --- MẬT KHẨU --- */}
                  <div className={styles.form_reg}>
                    <svg className={styles.prev_icon} xmlns="http://www.w3.org/2000/svg" width="15" height="21" viewBox="0 0 15 21" fill="none">
                      <path d="M7.5 15.7381C7.99728 15.7381 8.47419 15.5374 8.82582 15.1802C9.17746 14.823 9.375 14.3385 9.375 13.8333C9.375 13.3282 9.17746 12.8437 8.82582 12.4865C8.47419 12.1293 7.99728 11.9286 7.5 11.9286C7.00272 11.9286 6.52581 12.1293 6.17418 12.4865C5.82254 12.8437 5.625 13.3282 5.625 13.8333C5.625 14.3385 5.82254 14.823 6.17418 15.1802C6.52581 15.5374 7.00272 15.7381 7.5 15.7381Z" fill="#2268A7" />
                    </svg>

                    <input
                      type={isPasswordVisible ? 'text' : 'password'}
                      className={styles.form_control}
                      placeholder="Nhập mật khẩu"
                      value={password}
                      maxLength={20}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    
                    <div onClick={togglePasswordVisibility} className={styles.icon_wrapper}>
                        {isPasswordVisible ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="12" viewBox="0 0 22 12" fill="none">
                            <path d="M11 0C1.7875 0 0 6.65217 0 6.65217C0 6.65217 3.025 12 10.8625 12C18.7 12 22 6.78261 22 6.78261C22 6.78261 20.2125 0 11 0Z" fill="#777777" />
                        </svg>
                        ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M16.125 6.5L15.125 7.5C17.25 8.625 18.25 10.375 18.625 11.25C17.75 12.375 15.125 15.125 9.875 15.125Z" fill="#777777" />
                        </svg>
                        )}
                    </div>
                  </div>
                   {/* Hiển thị lỗi Password */}
                   {errors.password && <span className={styles.text_error} style={{display: 'block', marginBottom: '10px', marginTop: '-10px'}}>{errors.password}</span>}
                </div>
              </div>

              <div className={styles.box_confirm}>
                <span className={styles.forgot_pass}>
                   <Link to="/quen-mat-khau" style={{color: '#F8971C'}}>Quên mật khẩu?</Link>
                </span>
                <button
                  className={styles.btn_confirm}
                  type="submit"
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
    </div>
  )
}

export default LoginCandidate