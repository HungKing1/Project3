/* eslint-disable @next/next/no-css-tags */
import React, { use, useState } from "react";
import { Select, Spin } from "antd";
import styles from "./register-uv.module.scss";
import * as selectData from "../../assets/selectData.js"
import * as callData from "../../assets/function.js"
import { set } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuthContext } from "../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const RegisterCandidate = () => {
  const {isLoggedIn, setIsLoggedIn, setAccessToken} = useAuthContext()
  const naviagte = useNavigate()

  // --- State cho giao diện ---
  const [isPasswordVisible, setPasswordVisibility] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisibility(!isPasswordVisible);
  };

  const [isRePasswordVisible, setRePasswordVisibility] = useState(false);
  const toggleRePasswordVisibility = () => {
    setRePasswordVisibility(!isRePasswordVisible);
  };

  // State để hiển thị ảnh preview
  const [avatar, setAvatar] = useState("");

  //data ward, district 
  const [wards, setWards] = useState([]);
  const [districts, setDistricts] = useState([]);

  // State
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [careerGoal, setCareerGoal] = useState();
  const [birthday, setBirthday] = useState(); // dùng chuỗi (yyyy-MM-dd) cho <input type="date">
  const [experienceYearId, setExperienceYearId] = useState();
  const [jobLevelId, setJobLevelId] = useState();
  const [workTypeId, setWorkTypeId] = useState();
  const [gender, setGender] = useState();
  const [industryId, setIndustryId] = useState();
  const [salaryId, setSalaryId] = useState();
  const [cityId, setCityId] = useState();
  const [districtId, setDistrictId] = useState();
  const [wardId, setWardId] = useState();

  // State cho checkbox điều khoản
  const [agreeToTerms, setAgreeToTerms] = useState(true);

  // State cho việc chọn Tạo CV hay Tải CV
  const [isCreateCv, setIsCreateCv] = useState(true);

  // --- Hàm xử lý mẫu (đã loại bỏ logic) ---

  // Xử lý khi người dùng chọn file ảnh
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvatar(imageUrl); // Hiển thị ảnh preview
      console.log("File đã chọn:", file.name);
      // Logic tải file lên server sẽ được thêm ở đây
    }
  };

  // Xử lý khi submit form (đã loại bỏ logic)
  const handleSubmit = async (event) => {
    event.preventDefault(); // Ngăn trình duyệt submit form
    const body = {
      email,
      phone,
      name,
      password,
      careerGoal,
      birthday,
      experienceYearId,
      jobLevelId,
      workTypeId,
      gender,
      industryId,
      salaryId,
      cityId,
      districtId,
      wardId
    }
    console.log(body, "body")
    try {
      const {data} = await axios.post(`${API_BASE_URL}/auth/candidate/register`, body, {
        withCredentials: true
      })
      if(data.success) {
        localStorage.getItem("access_token", data.data.accessToken)
        setAccessToken(data.data.accessToken)
        toast.success("Đăng kí thành công")
        setTimeout(() => {
          naviagte('/')
        }, 1000);
      } else {
        toast.error("Đăng kí thất bại")
      }
    } catch (error) {
      console.log(error)    
    }
  };

  const updateDistrictAndWard = async(value) => {
    setCityId(value)
    const districtData = await callData.getDistrictsByCityId(value)
    const wardData = await callData.getWardsByCityId(value)
    setDistricts(districtData)
    setWards(wardData)
  }
  return (
    <>
      {/* <Head>... </Head> bị loại bỏ vì đây là React.js, không phải Next.js */}
      {/* <ModalLock /> và <ModalAvatarUpload /> đã bị loại bỏ */}

      <link rel="stylesheet" href="styles/register_select.css" />
      <div className={styles.wrapper_layout}>
        {/* <Link> được thay bằng <a> */}
        <a href="/dang-ky">
          <div
            style={{
              position: "absolute",
              left: "10px",
              top: "15px",
              width: "50px",
              height: "50px",
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
                    style={{
                      objectFit: "contain",
                    }}
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
              />
            </div>
            <form
              className={styles.container_right}
              onSubmit={handleSubmit} // Sử dụng hàm handleSubmit đã được stub
            >
              <h1 className={styles.title_right}>
                ĐĂNG KÝ TÀI KHOẢN ỨNG VIÊN ĐỂ NHẬN VIỆC LÀM CHẤT LƯỢNG MIỄN PHÍ
              </h1>
              <div className={styles.box_top_info}>
                <h2
                  style={{
                    color: "#3582CD",
                    fontFamily: "Roboto",
                    fontSize: "18px",
                    fontStyle: "normal",
                    alignSelf: "stretch",
                    fontWeight: "500",
                    lineHeight: "33px",
                  }}
                >
                  Thông tin đăng ký
                </h2>
                <div className={styles.box_avatar}>
                  <label className={styles.form_title}>
                    <h3 style={{ all: "inherit" }}>Ảnh đại diện</h3>
                  </label>
                  {avatar ? (
                    <div className={styles.up_avatar}>
                      {/* <Image> được thay bằng <img> */}
                      <img
                        className={styles.avatar}
                        src={avatar}
                        alt="avatar"
                        height={90}
                        width={90}
                        style={{
                          cursor: "pointer",
                        }}
                      />
                      {/* Label trỏ đến input file */}
                      <label htmlFor="up_avatar">
                        <img
                          height={28}
                          width={28}
                          className={styles.nut_up}
                          src={"/images/authorization/img_uploadlogo.png"}
                          alt="upload"
                          style={{ cursor: "pointer" }}
                        />
                      </label>
                    </div>
                  ) : (
                    <div className={styles.up_avatar}>
                      {/* <Image> được thay bằng <img> */}
                      <img
                        className={styles.avatar}
                        src="/images/candidate/ava_default.jpg"
                        alt="avatar mau"
                        height={90}
                        width={90}
                        style={{
                          cursor: "pointer",
                        }}
                      />
                      {/* Label trỏ đến input file */}
                      <label htmlFor="up_avatar">
                        <img
                          height={28}
                          width={28}
                          className={styles.nut_up}
                          src={"/images/authorization/img_uploadlogo.png"}
                          alt="upload"
                          style={{ cursor: "pointer" }}
                        />
                      </label>
                    </div>
                  )}
                  <input
                    type="file"
                    hidden
                    id="up_avatar"
                    onChange={handleFileChange}
                    accept=".jpg, .jpeg, .png, .gif"
                  />
                </div>
                <div className={styles.form_gr}>
                  {/* Loại bỏ Controller, sử dụng input chuẩn */}
                  <div className={`${styles.form_reg}`}>
                    <label htmlFor="email" className={styles.form_title}>
                      <h3 style={{ all: "inherit" }}>
                        Email <span className={styles.red_star}>*</span>
                      </h3>
                    </label>
                    <input
                      type="text"
                      name="email"
                      className={`${styles.form_control} ${styles.numbersonly} ${styles.valid}`}
                      placeholder="Vui lòng nhập email"
                      onChange={e => setEmail(e.target.value)}
                      required // Thêm required HTML
                    />
                    {/* Phần hiển thị lỗi đã bị loại bỏ */}
                  </div>

                  {/* Loại bỏ Controller, sử dụng input chuẩn */}
                  <div className={`${styles.form_reg} ${styles.reg_left_50}`}>
                    <label htmlFor="sdt" className={styles.form_title}>
                      <h3 style={{ all: "inherit" }}>
                        Số điện thoại <span className={styles.red_star}>*</span>
                      </h3>
                    </label>
                    <input
                      type="text"
                      name="sdt"
                      className={`${styles.form_control} ${styles.numbersonly} ${styles.valid}`}
                      placeholder="Vui lòng nhập số điện thoại"
                      onChange={e => setPhone(e.target.value)}
                      required
                    />
                  </div>

                  {/* Loại bỏ Controller, sử dụng input chuẩn */}
                  <div className={`${styles.form_reg} ${styles.reg_right_50}`}>
                    <label htmlFor="name" className={styles.form_title}>
                      <h3 style={{ all: "inherit" }}>
                        Họ và tên <span className={styles.red_star}>*</span>
                      </h3>
                    </label>
                    <input
                      type="text"
                      name="name"
                      className={`${styles.form_control} ${styles.valid}`}
                      placeholder="Nhập họ tên"
                      onChange={e => setName(e.target.value)}
                      required
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      className={styles.icon_input}
                    >
                      <path
                        d="M10 8.22222C10.4086 8.22222 10.8131 8.14175 11.1906 7.9854C11.568 7.82906 11.911 7.59989 12.1999 7.311C12.4888 7.02211 12.7179 6.67914 12.8743 6.30168C13.0306 5.92422 13.1111 5.51967 13.1111 5.11111C13.1111 4.70255 13.0306 4.298 12.8743 3.92054C12.7179 3.54308 12.4888 3.20012 12.1999 2.91122C11.911 2.62233 11.568 2.39317 11.1906 2.23682C10.8131 2.08047 10.4086 2 10 2C9.17488 2 8.38356 2.32778 7.80011 2.91122C7.21667 3.49467 6.88889 4.28599 6.88889 5.11111C6.88889 5.93623 7.21667 6.72755 7.80011 7.311C8.38356 7.89445 9.17488 8.22222 10 8.22222ZM2 17.4667V18H18V17.4667C18 15.4756 18 14.48 17.6124 13.7191C17.2716 13.0501 16.7277 12.5062 16.0587 12.1653C15.2978 11.7778 14.3022 11.7778 12.3111 11.7778H7.68889C5.69778 11.7778 4.70222 11.7778 3.94133 12.1653C3.27234 12.5062 2.72843 13.0501 2.38756 13.7191C2 14.48 2 15.4756 2 17.4667Z"
                        fill="#777777"
                        stroke="#777777"
                        strokeWidth="2.91667"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>

                  {/* Loại bỏ Controller, sử dụng input chuẩn */}
                  <div className={`${styles.form_reg} ${styles.reg_left_50}`}>
                    <label
                      htmlFor="txtpassword"
                      className={styles.form_title}
                    >
                      <h3 style={{ all: "inherit" }}>
                        Mật khẩu <span className={styles.red_star}>*</span>
                      </h3>
                    </label>
                    <input
                      type={isPasswordVisible ? "text" : "password"}
                      name="password"
                      className={styles.form_control}
                      maxLength={20}
                      placeholder="Nhập mật khẩu"
                      onChange={e => setPassword(e.target.value)}
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
                  </div>

                  {/* Loại bỏ Controller, sử dụng input chuẩn */}
                  <div className={`${styles.form_reg} ${styles.reg_right_50}`}>
                    <label
                      htmlFor="txtrepassword"
                      className={styles.form_title}
                    >
                      <h3 style={{ all: "inherit" }}>
                        Nhập lại mật khẩu{" "}
                        <span className={styles.red_star}>*</span>
                      </h3>
                    </label>
                    <input
                      type={isRePasswordVisible ? "text" : "password"}
                      name="confirmPassword"
                      className={styles.form_control}
                      maxLength={20}
                      placeholder="Nhập lại mật khẩu"
                      onChange={e => setConfirmPassword(e.target.value)}
                      required
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

                  {/* Loại bỏ Controller, sử dụng input chuẩn */}
                  <div className={`${styles.form_reg} ${styles.reg_left_50}`}>
                    <label htmlFor="position" className={styles.form_title}>
                      <h3 style={{ all: "inherit" }}>
                        Vị trí mong muốn{" "}
                        <span className={styles.red_star}>*</span>
                      </h3>
                    </label>
                    <input
                      type="text"
                      name="position"
                      className={styles.form_control}
                      id="position"
                      placeholder="Nhập vị trí mong muốn"
                      onChange={e => setCareerGoal(e.target.value)}
                      required
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="14"
                      viewBox="0 0 16 14"
                      fill="none"
                      className={styles.icon_input}
                    >
                      <path
                        d="M1.6 14C1.16 14 0.783201 13.8556 0.469601 13.5667C0.156001 13.2779 -0.000531975 12.9311 1.35823e-06 12.5263V4.42105C1.35823e-06 4.01579 0.156801 3.66874 0.470401 3.3799C0.784001 3.09105 1.16053 2.94688 1.6 2.94737H4.8V1.47369C4.8 1.06842 4.9568 0.721369 5.2704 0.432527C5.584 0.143685 5.96053 -0.000489977 6.4 1.25101e-06H9.6C10.04 1.25101e-06 10.4168 0.144422 10.7304 0.433264C11.044 0.722106 11.2005 1.06891 11.2 1.47369V2.94737H14.4C14.84 2.94737 15.2168 3.09179 15.5304 3.38063C15.844 3.66947 16.0005 4.01628 16 4.42105V12.5263C16 12.9316 15.8432 13.2786 15.5296 13.5675C15.216 13.8563 14.8395 14.0005 14.4 14H1.6ZM6.4 2.94737H9.6V1.47369H6.4V2.94737Z"
                        fill="#777777"
                      />
                    </svg>
                  </div>

                  <div className={`${styles.form_reg} ${styles.reg_right_50}`}>
                    <label htmlFor="dob" className={styles.form_title}>
                      <h3 style={{ all: "inherit" }}>
                        Ngày sinh <span className={styles.red_star}>*</span>
                      </h3>
                    </label>
                    <input
                      type="date"
                      id="dob"
                      name="dob"
                      value={birthday} // state dob, dùng useState để quản lý
                      onChange={(e) => setBirthday(e.target.value)}
                      style={{
                        width: "98%",
                        marginLeft: "1%",
                        padding: "8px",
                        fontSize: "14px",
                        borderRadius: "4px",
                        border: "1px solid #d9d9d9",
                      }}
                    />
                    {/* Yêu cầu bắt buộc (required) sẽ được xử lý logic trong hàm handleSubmit */}
                  </div>

                  <div className={`${styles.form_reg} ${styles.reg_left_50}`}>
                    <label htmlFor="txtlastname" className={styles.form_title}>
                      <h3 style={{ all: "inherit" }}>
                        Ngành nghề{" "}
                        <span className={styles.red_star}>*</span>
                      </h3>
                    </label>
                    <Select
                      placeholder="Chọn ngành nghề mong muốn"
                      value={industryId}
                      onChange={value => setIndustryId(value)}
                      style={{
                        width: "98%",
                        marginLeft: "1%",
                      }}
                      filterOption={(inputValue, option) =>
                        option?.label
                          ?.toLowerCase()
                          ?.includes(inputValue?.toLowerCase())
                      }
                      size="large"
                      fieldNames={{label: 'name', value: 'id'}}
                      options={selectData.industries} 
                    />
                  </div>
                  <div className={`${styles.form_reg} ${styles.reg_right_50}`}>
                    <label htmlFor="txtlastname" className={styles.form_title}>
                      <h3 style={{ all: "inherit" }}>
                        Mức lương{" "}
                        <span className={styles.red_star}>*</span>
                      </h3>
                    </label>
                    <Select
                      placeholder="Chọn mức lương mong muốn"
                      value={salaryId}
                      onChange={value => setSalaryId(value)}
                      style={{
                        width: "98%",
                        marginLeft: "1%",
                      }}
                      filterOption={(inputValue, option) =>
                        option?.label
                          ?.toLowerCase()
                          ?.includes(inputValue?.toLowerCase())
                      }
                      size="large"
                      fieldNames={{label: 'name', value: 'id'}}
                      options={selectData.salaries} 
                    />
                  </div>
                  <div className={`${styles.form_reg} ${styles.reg_left_50}`}>
                    <label htmlFor="txtlastname" className={styles.form_title}>
                      <h3 style={{ all: "inherit" }}>
                        Kinh nghiệm{" "}
                        <span className={styles.red_star}>*</span>
                      </h3>
                    </label>
                    <Select
                      placeholder="Chọn kinh nghiệm"
                      value={experienceYearId}
                      onChange={value => setExperienceYearId(value)}
                      style={{
                        width: "98%",
                        marginLeft: "1%",
                      }}
                      filterOption={(inputValue, option) =>
                        option?.label
                          ?.toLowerCase()
                          ?.includes(inputValue?.toLowerCase())
                      }
                      size="large"
                      fieldNames={{label: 'name', value: 'id'}}
                      options={selectData.experienceYears} 
                    />
                  </div>

                  {/* Loại bỏ Controller, sử dụng Select chuẩn của AntD với state */}
                  <div className={`${styles.form_reg} ${styles.reg_right_50}`}>
                    <label htmlFor="txtlastname" className={styles.form_title}>
                      <h3 style={{ all: "inherit" }}>
                        Cấp bậc{" "}
                        <span className={styles.red_star}>*</span>
                      </h3>
                    </label>
                    <Select
                      placeholder="Chọn cấp bậc"
                      value={jobLevelId}
                      onChange={value => setJobLevelId(value)}
                      style={{
                        width: "98%",
                        marginLeft: "1%",
                      }}
                      filterOption={(inputValue, option) =>
                        option?.label
                          ?.toLowerCase()
                          ?.includes(inputValue?.toLowerCase())
                      }
                      size="large"
                      fieldNames={{label: 'name', value: 'id'}}
                      options={selectData.jobLevels} 
                    />
                  </div>

                  <div className={`${styles.form_reg} ${styles.reg_left_50}`}>
                    <label htmlFor="txtlastname" className={styles.form_title}>
                      <h3 style={{ all: "inherit" }}>
                        Hình thức làm việc{" "}
                        <span className={styles.red_star}>*</span>
                      </h3>
                    </label>
                    <Select
                      placeholder="Chọn hình thức làm việc"
                      value={workTypeId}
                      onChange={value => setWorkTypeId(value)}
                      style={{
                        width: "98%",
                        marginLeft: "1%",
                      }}
                      filterOption={(inputValue, option) =>
                        option?.label
                          ?.toLowerCase()
                          ?.includes(inputValue?.toLowerCase())
                      }
                      size="large"
                      fieldNames={{label: 'name', value: 'id'}}
                      options={selectData.workTypes} 
                    />
                  </div>

                  <div className={`${styles.form_reg} ${styles.reg_right_50}`}>
                    <label htmlFor="txtlastname" className={styles.form_title}>
                      <h3 style={{ all: "inherit" }}>
                        Giới tính{" "}
                        <span className={styles.red_star}>*</span>
                      </h3>
                    </label>
                    <Select
                      placeholder="Chọn giới tính"
                      value={gender}
                      onChange={value => setGender(value)}
                      style={{
                        width: "98%",
                        marginLeft: "1%",
                      }}
                      filterOption={(inputValue, option) =>
                        option?.label
                          ?.toLowerCase()
                          ?.includes(inputValue?.toLowerCase())
                      }
                      size="large"
                      fieldNames={{label: 'name', value: 'id'}}
                      options={
                        [
                          {"id": 1, "name": "Nam"},
                          {"id": 2, "name": "Nữ"}
                        ]
                      } 
                    />
                  </div>
 
                  {/* Loại bỏ Controller, sử dụng Select chuẩn của AntD với state */}
                  <div className={`${styles.form_reg} ${styles.reg_left_50}`}>
                    <label htmlFor="txtlastname" className={styles.form_title}>
                      <h3 style={{ all: "inherit" }}>
                        Tỉnh, thành làm việc{" "}
                        <span className={styles.red_star}>*</span>
                      </h3>
                    </label>
                    <Select
                      placeholder="Chọn tỉnh, thành"
                      value={cityId}
                      onChange={(value) => updateDistrictAndWard(value)}
                      style={{
                        width: "98%",
                        marginLeft: "1%",
                      }}
                      filterOption={(inputValue, option) =>
                        option?.label
                          ?.toLowerCase()
                          ?.includes(inputValue?.toLowerCase())
                      }
                      size="large"
                      fieldNames={{label: 'name', value: 'id'}}
                      options={selectData.cities} // Dùng dữ liệu mẫu
                    />
                  </div>

                  {/* Loại bỏ Controller, sử dụng Select chuẩn của AntD với state */}
                  <div className={`${styles.form_reg} ${styles.reg_right_50}`}>
                    <label htmlFor="txtlastname" className={styles.form_title}>
                      <h3 style={{ all: "inherit" }}>
                        Quận, huyện làm việc{" "}
                        <span className={styles.red_star}>*</span>
                      </h3>
                    </label>
                    <Select
                      placeholder="Chọn quận, huyện"
                      value={districtId}
                      onChange={value => setDistrictId(value)}
                      style={{
                        width: "98%",
                        marginLeft: "1%",
                      }}
                      filterOption={(inputValue, option) =>
                        option?.label
                          ?.toLowerCase()
                          ?.includes(inputValue?.toLowerCase())
                      }
                      fieldNames={{label: 'name', value: 'id'}}
                      size="large"
                      options={districts} 
                    />
                  </div>

                  <div className={`${styles.form_reg} ${styles.reg_left_50}`}>
                    <label htmlFor="txtlastname" className={styles.form_title}>
                      <h3 style={{ all: "inherit" }}>
                        Phường xã làm việc{" "}
                        <span className={styles.red_star}>*</span>
                      </h3>
                    </label>
                    <Select
                      placeholder="Chọn phường xã làm việc"
                      value={wardId}
                      onChange={value => setWardId(value)}
                      style={{
                        width: "98%",
                        marginLeft: "1%",
                      }}
                      filterOption={(inputValue, option) =>
                        option?.label
                          ?.toLowerCase()
                          ?.includes(inputValue?.toLowerCase())
                      }
                      fieldNames={{label: 'name', value: 'id'}}
                      size="large"
                      options={wards} 
                    />
                  </div>

                </div>
              </div>
              <div className={styles.box_confirm}>
                <div className={styles.box_choose}>
                  <div className={styles.cv_local}>
                    <div
                      className={styles.btn_cv2}
                      style={{ opacity: !agreeToTerms ? "0.5" : "1" }}
                    >
                      <button
                        type="submit"
                        style={{
                          cursor: "pointer",
                        }}
                        onClick={() => {
                        }}
                      >
                        <h3 style={{ all: "inherit" }}>
                          Đăng kí{" "}
                          {/* Loại bỏ <Spin /> */}
                        </h3>
                      </button>
                    </div>
                  </div>
                  
                </div>
              </div>
              <div className={styles.redirect_login}>
                <div className={styles.content}>
                  <p className={styles.ask}>Bạn đã có tài khoản?</p>
                  <pre>{" "}</pre>
                  {/* <Link> được thay bằng <a> */}
                  <a
                    href={"/dang-nhap-ung-vien"}
                    className={styles.now_login}
                  >
                    ĐĂNG NHẬP NGAY
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterCandidate;