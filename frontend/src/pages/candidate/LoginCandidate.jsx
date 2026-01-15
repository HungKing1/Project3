import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './login-ntd.module.scss'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useAuthContext } from '../../context/AuthContext'
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

const LoginCandidate = () => {
  const { setAccessToken } = useAuthContext()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [errors, setErrors] = useState({})

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
        toast.success('Đăng nhập thành công')

        const candidate = {
          candidateId: data.data.candidateId,
          email: data.data.email,
          role: 'candidate',
          phone: data.data.phone,
          name: data.data.name,
          avatar: data.data.avatar,
        }

        localStorage.setItem('access_token', data.data.accessToken)
        localStorage.setItem('candidate', JSON.stringify(candidate))
        setAccessToken(data.data.accessToken)

        setTimeout(() => navigate('/'), 1000)
      } else {
        toast.error('Đăng nhập thất bại')
      }
    } catch (error) {
      console.error(error)
      toast.error('Có lỗi xảy ra. Vui lòng thử lại')
    }
  }

  return (
    <div className={styles.wrapper_layout}>
      <div className={styles.wrapper_body}>
        <div className={styles.wrapper_content}>
          <form className={styles.container_right} onSubmit={handleSubmit}>
            <h1 className={styles.title_right}>ĐĂNG NHẬP ỨNG VIÊN</h1>
            <p className={styles.subtitle}>
              Tiếp cận danh sách việc làm chất lượng, uy tín
            </p>

            {/* EMAIL */}
            <div className={styles.form_reg}>
              <FaUser className={styles.prev_icon} />
              <input
                type="text"
                className={styles.form_control}
                placeholder="Email hoặc số điện thoại"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {errors.email && <span className={styles.text_error}>{errors.email}</span>}

            {/* PASSWORD */}
            <div className={styles.form_reg}>
              <FaLock className={styles.prev_icon} />
              <input
                type={isPasswordVisible ? 'text' : 'password'}
                className={styles.form_control}
                placeholder="Mật khẩu"
                value={password}
                maxLength={20}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div
                className={styles.icon_wrapper}
                onClick={togglePasswordVisibility}
              >
                {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
            {errors.password && <span className={styles.text_error}>{errors.password}</span>}

            <div className={styles.box_confirm}>
              {/* <div className={styles.forgot_pass}>
                <Link to="/quen-mat-khau">Quên mật khẩu?</Link>
              </div> */}

              <button type="submit" className={styles.btn_confirm}>
                ĐĂNG NHẬP
              </button>

              <div className={styles.btn_content}>
                <span>Bạn chưa có tài khoản?</span>
                <Link to="/dang-ky-ung-vien">Đăng ký ngay</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginCandidate
