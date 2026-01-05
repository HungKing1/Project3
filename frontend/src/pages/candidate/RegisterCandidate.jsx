/* eslint-disable @next/next/no-css-tags */
import React, { useState } from "react";
import { Select } from "antd"; // Bỏ Spin nếu không dùng
import styles from "./register-uv.module.scss";
import * as selectData from "../../assets/selectData.js"
import * as callData from "../../assets/function.js"
import axios from "axios";
import toast from "react-hot-toast";
import { useAuthContext } from "../../context/AuthContext.jsx";
import { useNavigate, Link } from "react-router-dom"; // Import Link

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const RegisterCandidate = () => {
  const { setAccessToken } = useAuthContext()
  const navigate = useNavigate() // Sửa typo naviagte

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
  const [birthday, setBirthday] = useState();
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


  // Xử lý khi người dùng chọn file ảnh
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvatar(imageUrl);
      console.log("File đã chọn:", file.name);
    }
  };

  // Xử lý khi submit form
  const handleSubmit = async (event) => {
    event.preventDefault();
    const body = {
      email, phone, name, password, careerGoal, birthday,
      experienceYearId, jobLevelId, workTypeId, gender,
      industryId, salaryId, cityId, districtId, wardId
    }
    console.log(body, "body")
    try {
      const { data } = await axios.post(`${API_BASE_URL}/auth/candidate/register`, body, {
        withCredentials: true
      })
      if (data.success) {
        // localStorage.setItem("access_token", data.data.accessToken) // Sửa lại cú pháp setItem
        setAccessToken(data.data.accessToken)
        toast.success("Đăng kí thành công")
        setTimeout(() => {
          navigate('/')
        }, 1000);
      } else {
        toast.error("Đăng kí thất bại")
      }
    } catch (error) {
      console.log(error)
    }
  };

  const updateDistrictAndWard = async (value) => {
    setCityId(value)
    const districtData = await callData.getDistrictsByCityId(value)
    const wardData = await callData.getWardsByCityId(value)
    setDistricts(districtData)
    setWards(wardData)
  }

  return (
    <>
      <div style={{ width: '100%', height: '100%' }}>
        {/* Nút Back */}
        <Link to="/">
          <div
            style={{
              position: "absolute",
              left: "10px",
              top: "15px",
              width: "50px",
              height: "50px",
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
              
              {/* Form chính */}
              <form className={styles.container_right} onSubmit={handleSubmit}>
                <h1 className={styles.title_right}>
                  ĐĂNG KÝ TÀI KHOẢN ỨNG VIÊN
                </h1>
                <p className={styles.sub_title}>Tiếp cận việc làm chất lượng miễn phí</p>
                
                <div className={styles.box_top_info}>
                  <h2 className={styles.section_title}>Thông tin đăng ký</h2>
                  
                  {/* Avatar Upload */}
                  <div className={styles.box_avatar}>
                    <div className={styles.avatar_container}>
                        {avatar ? (
                            <img src={avatar} alt="avatar" className={styles.avatar_img} />
                        ) : (
                            <img src="/images/candidate/applicant.png" alt="avatar default" className={styles.avatar_img} />
                        )}
                        <label htmlFor="up_avatar" className={styles.upload_btn}>
                             <img src="/images/authorization/img_uploadlogo.png" alt="upload" />
                        </label>
                         <input type="file" hidden id="up_avatar" onChange={handleFileChange} accept=".jpg, .jpeg, .png, .gif" />
                    </div>
                    <span className={styles.avatar_text}>Ảnh đại diện</span>
                  </div>

                  <div className={styles.form_gr}>
                    
                    {/* Email - Full Width */}
                    <div className={styles.form_reg}>
                      <label className={styles.form_label}>Email <span className={styles.red_star}>*</span></label>
                      <input type="text" className={styles.form_control} placeholder="Vui lòng nhập email" onChange={e => setEmail(e.target.value)} required />
                    </div>

                    {/* Phone & Name - 50/50 */}
                    <div className={styles.row_input}>
                        <div className={styles.form_reg_50}>
                            <label className={styles.form_label}>Số điện thoại <span className={styles.red_star}>*</span></label>
                            <input type="text" className={`${styles.form_control} ${styles.numbersonly}`} placeholder="Nhập số điện thoại" onChange={e => setPhone(e.target.value)} required />
                        </div>
                        <div className={styles.form_reg_50}>
                            <label className={styles.form_label}>Họ và tên <span className={styles.red_star}>*</span></label>
                            <input type="text" className={styles.form_control} placeholder="Nhập họ tên" onChange={e => setName(e.target.value)} required />
                        </div>
                    </div>

                    {/* Password - 50/50 */}
                    <div className={styles.row_input}>
                         <div className={styles.form_reg_50}>
                            <label className={styles.form_label}>Mật khẩu <span className={styles.red_star}>*</span></label>
                            <div className={styles.input_wrapper}>
                                <input type={isPasswordVisible ? "text" : "password"} className={styles.form_control} placeholder="Nhập mật khẩu" onChange={e => setPassword(e.target.value)} required maxLength={20} />
                                <span onClick={togglePasswordVisibility} className={styles.icon_eye}>
                                    {isPasswordVisible ? (
                                        <svg width="22" height="12" viewBox="0 0 22 12" fill="none"><path d="M11 0C1.7875 0 0 6.65217 0 6.65217C0 6.65217 3.025 12 10.8625 12C18.7 12 22 6.78261 22 6.78261C22 6.78261 20.2125 0 11 0ZM7.2875 1.95652C7.975 1.56522 9.075 1.56522 9.075 1.56522C9.075 1.56522 8.3875 2.73913 8.3875 3.65217C8.3875 4.56522 8.6625 5.08696 8.6625 5.08696L7.15 5.34783C7.15 5.34783 6.7375 4.69565 6.7375 3.78261C6.7375 2.73913 7.2875 1.95652 7.2875 1.95652ZM10.8625 10.6957C5.225 10.6957 2.3375 7.69565 1.5125 6.52174C1.925 5.60869 3.025 3.65217 5.775 2.34783C5.6375 2.86956 5.5 3.3913 5.5 4.04348C5.5 6.91304 7.975 9.26087 11 9.26087C14.025 9.26087 16.5 6.91304 16.5 4.04348C16.5 3.3913 16.3625 2.86956 16.225 2.34783C18.975 3.52174 20.075 5.60869 20.4875 6.52174C19.525 7.69565 16.6375 10.6957 10.8625 10.6957Z" fill="#777777" /></svg>
                                    ) : (
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M16.125 6.5L15.125 7.5C17.25 8.625 18.25 10.375 18.625 11.25C17.75 12.375 15.125 15.125 9.875 15.125C9 15.125 8.375 15 7.625 14.875L6.625 15.875C7.625 16.25 8.75 16.375 9.875 16.375C17 16.375 20 11.375 20 11.375C20 11.375 19.25 8.375 16.125 6.5Z" fill="#777777" /><path d="M15 8.875C15 8.5 15 8.125 14.875 7.875L8.875 13.75C9.25 13.75 9.625 13.875 10 13.875C12.75 13.875 15 11.625 15 8.875ZM19.125 0L13.625 5.5C12.625 5.25 11.375 5 10 5C1.625 5 0 11.375 0 11.375C0 11.375 1.25 13.625 4.125 15.125L0 19.125V20H0.875L20 0.875V0H19.125ZM5 14.125C3 13.25 1.875 11.875 1.375 11.25C1.75 10.375 2.75 8.5 5.25 7.25C5.125 7.75 5 8.25 5 8.875C5 10.25 5.625 11.625 6.625 12.5L5 14.125ZM7.75 9.875L6.5 10.125C6.5 10.125 6.125 9.5 6.125 8.625C6.125 7.625 6.625 6.75 6.625 6.75C7.25 6.375 8.25 6.375 8.25 6.375C8.25 6.375 7.625 7.5 7.625 8.5C7.5 9.375 7.75 9.875 7.75 9.875Z" fill="#777777" /></svg>
                                    )}
                                </span>
                            </div>
                        </div>
                        <div className={styles.form_reg_50}>
                            <label className={styles.form_label}>Nhập lại mật khẩu <span className={styles.red_star}>*</span></label>
                            <div className={styles.input_wrapper}>
                                <input type={isRePasswordVisible ? "text" : "password"} className={styles.form_control} placeholder="Nhập lại mật khẩu" onChange={e => setConfirmPassword(e.target.value)} required maxLength={20} />
                                <span onClick={toggleRePasswordVisibility} className={styles.icon_eye}>
                                    {isRePasswordVisible ? (
                                        <svg width="22" height="12" viewBox="0 0 22 12" fill="none"><path d="M11 0C1.7875 0 0 6.65217 0 6.65217C0 6.65217 3.025 12 10.8625 12C18.7 12 22 6.78261 22 6.78261C22 6.78261 20.2125 0 11 0ZM7.2875 1.95652C7.975 1.56522 9.075 1.56522 9.075 1.56522C9.075 1.56522 8.3875 2.73913 8.3875 3.65217C8.3875 4.56522 8.6625 5.08696 8.6625 5.08696L7.15 5.34783C7.15 5.34783 6.7375 4.69565 6.7375 3.78261C6.7375 2.73913 7.2875 1.95652 7.2875 1.95652ZM10.8625 10.6957C5.225 10.6957 2.3375 7.69565 1.5125 6.52174C1.925 5.60869 3.025 3.65217 5.775 2.34783C5.6375 2.86956 5.5 3.3913 5.5 4.04348C5.5 6.91304 7.975 9.26087 11 9.26087C14.025 9.26087 16.5 6.91304 16.5 4.04348C16.5 3.3913 16.3625 2.86956 16.225 2.34783C18.975 3.52174 20.075 5.60869 20.4875 6.52174C19.525 7.69565 16.6375 10.6957 10.8625 10.6957Z" fill="#777777" /></svg>
                                    ) : (
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M16.125 6.5L15.125 7.5C17.25 8.625 18.25 10.375 18.625 11.25C17.75 12.375 15.125 15.125 9.875 15.125C9 15.125 8.375 15 7.625 14.875L6.625 15.875C7.625 16.25 8.75 16.375 9.875 16.375C17 16.375 20 11.375 20 11.375C20 11.375 19.25 8.375 16.125 6.5Z" fill="#777777" /><path d="M15 8.875C15 8.5 15 8.125 14.875 7.875L8.875 13.75C9.25 13.75 9.625 13.875 10 13.875C12.75 13.875 15 11.625 15 8.875ZM19.125 0L13.625 5.5C12.625 5.25 11.375 5 10 5C1.625 5 0 11.375 0 11.375C0 11.375 1.25 13.625 4.125 15.125L0 19.125V20H0.875L20 0.875V0H19.125ZM5 14.125C3 13.25 1.875 11.875 1.375 11.25C1.75 10.375 2.75 8.5 5.25 7.25C5.125 7.75 5 8.25 5 8.875C5 10.25 5.625 11.625 6.625 12.5L5 14.125ZM7.75 9.875L6.5 10.125C6.5 10.125 6.125 9.5 6.125 8.625C6.125 7.625 6.625 6.75 6.625 6.75C7.25 6.375 8.25 6.375 8.25 6.375C8.25 6.375 7.625 7.5 7.625 8.5C7.5 9.375 7.75 9.875 7.75 9.875Z" fill="#777777" /></svg>
                                    )}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Position & DOB - 50/50 */}
                    <div className={styles.row_input}>
                         <div className={styles.form_reg_50}>
                            <label className={styles.form_label}>Vị trí mong muốn <span className={styles.red_star}>*</span></label>
                            <input type="text" className={styles.form_control} placeholder="Nhập vị trí mong muốn" onChange={e => setCareerGoal(e.target.value)} required />
                        </div>
                        <div className={styles.form_reg_50}>
                            <label className={styles.form_label}>Ngày sinh <span className={styles.red_star}>*</span></label>
                            <input type="date" className={styles.form_control} value={birthday} onChange={(e) => setBirthday(e.target.value)} required />
                        </div>
                    </div>

                     {/* Industry & Salary - 50/50 */}
                     <div className={styles.row_input}>
                        <div className={styles.form_reg_50}>
                            <label className={styles.form_label}>Ngành nghề <span className={styles.red_star}>*</span></label>
                            <Select placeholder="Chọn ngành nghề" 
                            className={styles.ant_select_custom} 
                            onChange={setIndustryId} 
                            fieldNames={{label: 'name', value: 'id'}} 
                            options={selectData.industries} 
                            showSearch 
                            filterOption={(input, option) => (option?.name ?? '').toLowerCase().includes(input.toLowerCase())} />
                        </div>
                        <div className={styles.form_reg_50}>
                             <label className={styles.form_label}>Mức lương <span className={styles.red_star}>*</span></label>
                             <Select placeholder="Chọn mức lương" 
                             className={styles.ant_select_custom} 
                             onChange={setSalaryId} 
                             fieldNames={{label: 'name', value: 'id'}} 
                             options={selectData.salaries} />
                        </div>
                    </div>

                    {/* Experience & Level - 50/50 */}
                    <div className={styles.row_input}>
                        <div className={styles.form_reg_50}>
                             <label className={styles.form_label}>Kinh nghiệm <span className={styles.red_star}>*</span></label>
                             <Select placeholder="Chọn kinh nghiệm" 
                             className={styles.ant_select_custom} 
                             onChange={setExperienceYearId} 
                             fieldNames={{label: 'name', value: 'id'}} 
                             options={selectData.experienceYears} />
                        </div>
                        <div className={styles.form_reg_50}>
                             <label className={styles.form_label}>Cấp bậc <span className={styles.red_star}>*</span></label>
                             <Select placeholder="Chọn cấp bậc" 
                             className={styles.ant_select_custom} 
                             onChange={setJobLevelId} 
                             fieldNames={{label: 'name', value: 'id'}} 
                             options={selectData.jobLevels} />
                        </div>
                    </div>

                    {/* WorkType & Gender - 50/50 */}
                    <div className={styles.row_input}>
                        <div className={styles.form_reg_50}>
                             <label className={styles.form_label}>Hình thức làm việc <span className={styles.red_star}>*</span></label>
                             <Select placeholder="Chọn hình thức" 
                             className={styles.ant_select_custom} 
                             onChange={setWorkTypeId} 
                             fieldNames={{label: 'name', value: 'id'}} 
                             options={selectData.workTypes} />
                        </div>
                        <div className={styles.form_reg_50}>
                             <label className={styles.form_label}>Giới tính <span className={styles.red_star}>*</span></label>
                             <Select placeholder="Chọn giới tính" className={styles.ant_select_custom} onChange={setGender} fieldNames={{label: 'name', value: 'id'}} options={[{id: 1, name: "Nam"}, {id: 2, name: "Nữ"}]} />
                        </div>
                    </div>

                     {/* City & District - 50/50 */}
                     <div className={styles.row_input}>
                        <div className={styles.form_reg_50}>
                             <label className={styles.form_label}>Tỉnh/Thành phố <span className={styles.red_star}>*</span></label>
                             <Select placeholder="Chọn tỉnh/thành" 
                             className={styles.ant_select_custom} 
                             onChange={updateDistrictAndWard} 
                             fieldNames={{label: 'name', value: 'id'}} 
                             options={selectData.cities} showSearch 
                             filterOption={(input, option) => (option?.name ?? '').toLowerCase().includes(input.toLowerCase())}/>
                        </div>
                        <div className={styles.form_reg_50}>
                             <label className={styles.form_label}>Quận/Huyện <span className={styles.red_star}>*</span></label>
                             <Select placeholder="Chọn quận/huyện" 
                             className={styles.ant_select_custom} 
                             onChange={setDistrictId} 
                             fieldNames={{label: 'name', value: 'id'}} 
                             options={districts} showSearch filterOption={(input, option) => (option?.name ?? '').toLowerCase().includes(input.toLowerCase())}/>
                        </div>
                    </div>

                     {/* Ward - 100% or 50% */}
                     <div className={styles.row_input}>
                        <div className={styles.form_reg_50}>
                             <label className={styles.form_label}>Phường/Xã <span className={styles.red_star}>*</span></label>
                             <Select placeholder="Chọn phường/xã" className={styles.ant_select_custom} onChange={setWardId} fieldNames={{label: 'name', value: 'id'}} options={wards} showSearch filterOption={(input, option) => (option?.name ?? '').toLowerCase().includes(input.toLowerCase())} />
                        </div>
                    </div>

                  </div>
                </div>

                <div className={styles.box_confirm}>
                  <button type="submit" className={styles.btn_submit} style={{ opacity: !agreeToTerms ? "0.8" : "1", cursor: "pointer" }}>
                      ĐĂNG KÝ NGAY
                  </button>
                </div>
                
                <div className={styles.redirect_login}>
                   <p>Bạn đã có tài khoản? <a href="/dang-nhap-ung-vien" className={styles.now_login}>ĐĂNG NHẬP NGAY</a></p>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterCandidate;