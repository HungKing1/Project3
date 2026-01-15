import React, { useEffect, useState } from "react";
import { Select, Spin } from "antd"; 
import axios from "axios";
import toast from "react-hot-toast";
import s from "./ContactInformation.module.scss";
import ModalAvatarUpload from "./modal_avatar_upload/ModalAvatarUpload";
import * as selectData from "../../../../assets/selectData.js";
import * as callData from "../../../../assets/function.js";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

const ContactInformation = () => {
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatarBlob, setAvatarBlob] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [openModalAva, setOpenModalAva] = useState(false);
  const [birthdayError, setBirthdayError] = useState(null);

  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    birthday: "",
    gender: 1,
    maritalStatus: null,
    cityId: null,
    districtId: null,
    wardId: null,
    address: "",
    avatarUrl: ""
  });

  const updateOptionsByCity = async (cityId) => {
    try {
      const [districtData, wardData] = await Promise.all([
        callData.getDistrictsByCityId(cityId),
        callData.getWardsByCityId(cityId),
      ]);
      setDistricts(districtData || []);
      setWards(wardData || []);
    } catch (error) {
      console.error("Lỗi lấy dữ liệu địa lý:", error);
    }
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      setIsLoading(true);
      try {
        const response = await api.get("/candidate/get-personal-info");
        if (response.data.success) {
          const userData = response.data.data;
          setFormData(userData);

          if (userData.avatarUrl) {
            setAvatarPreview(userData.avatarUrl);
            if (userData.avatarUrl) {
              setAvatarPreview(userData.avatarUrl);

              const storedCandidate = localStorage.getItem('candidate');
              if (storedCandidate) {
                  try {
                      const parsedCandidate = JSON.parse(storedCandidate);
                      parsedCandidate.avatar = userData.avatarUrl; 
                      localStorage.setItem('candidate', JSON.stringify(parsedCandidate));
                      
                      window.dispatchEvent(new Event("storage"));
                  } catch (e) {
                      console.error("Lỗi cập nhật localStorage:", e);
                  }
              }
            }
          }

          if (userData.cityId) {
            await updateOptionsByCity(userData.cityId);
          }
        }
      } catch (error) {
        toast.error("Không thể tải thông tin người dùng!"); // Thay message.error
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  const handleCityChange = async (value) => {
    setFormData({ ...formData, cityId: value, districtId: null, wardId: null });
    await updateOptionsByCity(value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (value, name) => {
    setFormData({ ...formData, [name]: value });
  };

  const validateBirthday = (birthday) => {
    if (!birthday) return "Vui lòng chọn ngày sinh";
    const birthDate = new Date(birthday);
    const age = new Date().getFullYear() - birthDate.getFullYear();
    if (age < 6 || age > 100) return "Tuổi phải từ 6 đến 100";
    return null;
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.phone || !formData.cityId) {
      toast.error("Vui lòng điền các trường bắt buộc (*)"); // Thay message.warning
      return;
    }

    setIsLoading(true);

    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key] !== null && formData[key] !== undefined) {
          data.append(key, formData[key]);
        }
      });

      if (avatarBlob) {
        data.append("avatarFile", avatarBlob, "avatar.png");
      }

      const response = await api.post("/candidate/update-personal-info", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        toast.success("Cập nhật thông tin thành công!"); // Thay message.success
      }
    } catch (error) {
      console.error("Error submitting:", error);
      toast.error("Đã có lỗi xảy ra khi cập nhật!"); // Thay message.error
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={s.container}>
      <div className={s.body}>
        <div className={s.title}>
          <div className={s.title_1}>THÔNG TIN LIÊN HỆ</div>
        </div>

        {isLoading && !formData.name ? (
          <div style={{ textAlign: "center", padding: "50px" }}><Spin size="large" /></div>
        ) : (
          <div className={s.form}>
            <div className={s.form_above}>
              <div className={s.form_above_avatar}>
                <img
                  alt="avatar"
                  src={avatarPreview || "/images/candidate/applicant1.png"}
                  style={{ borderRadius: "100%", width: "190px", height: "190px", objectFit: "cover" }}
                />
                <div className={s.upload} onClick={() => setOpenModalAva(true)}>
                  <img alt="camera" src="/images/ung-vien/ho-so-xin-viec/img_uploadlogo.png.png" style={{ width: "44px", cursor: 'pointer' }} />
                </div>
              </div>

              <div className={s.form_above_input}>
                <div className={s.form_above_input_div}>
                  <label>Họ và tên <span style={{ color: "red" }}>*</span></label>
                  <div className={s.form_above_input_div_border}>
                    <input className={s.input} name="name" value={formData.name || ""} onChange={handleInputChange} />
                  </div>
                </div>

                <div className={s.form_above_input_div}>
                  <label>Số điện thoại <span style={{ color: "red" }}>*</span></label>
                  <div className={s.form_above_input_div_border}>
                    <input className={s.input} name="phone" value={formData.phone || ""} onChange={handleInputChange} />
                  </div>
                </div>

                <div className={s.form_above_input_div}>
                  <label>Ngày sinh <span style={{ color: "red" }}>*</span></label>
                  <div className={s.form_above_input_div_border}>
                    <input
                      className={s.input_date}
                      type="date"
                      name="birthday"
                      value={formData.birthday || ""}
                      onChange={(e) => {
                        handleInputChange(e);
                        setBirthdayError(validateBirthday(e.target.value));
                      }}
                    />
                  </div>
                  {birthdayError && <div style={{ color: "red", fontSize: "12px" }}>{birthdayError}</div>}
                </div>

                <div className={s.form_above_input_div_1}>
                  <label>Giới tính <span style={{ color: "red" }}>*</span></label>
                  <div className={s.form_above_input_div_2}>
                    <label><input type="radio" name="gender" checked={Number(formData.gender) === 1} onChange={() => handleSelectChange(1, "gender")} /> Nam</label>
                    <label><input type="radio" name="gender" checked={Number(formData.gender) === 2} onChange={() => handleSelectChange(2, "gender")} /> Nữ</label>
                  </div>
                </div>

                <div className={s.form_above_input_div_1}>
                  <label>Hôn nhân</label>
                  <div className={s.form_above_input_div_2}>
                    <label><input type="radio" name="maritalStatus" checked={Number(formData.maritalStatus) === 1} onChange={() => handleSelectChange(1, "maritalStatus")} /> Độc thân</label>
                    <label><input type="radio" name="maritalStatus" checked={Number(formData.maritalStatus) === 2} onChange={() => handleSelectChange(2, "maritalStatus")} /> Đã kết hôn</label>
                  </div>
                </div>
              </div>
            </div>

            <div className={s.form_under}>
              <div className={s.form_under_city}>
                <label>Tỉnh thành <span style={{ color: "red" }}>*</span></label>
                <Select
                  value={formData.cityId}
                  options={selectData.cities}
                  onChange={handleCityChange}
                  showSearch
                  placeholder="Chọn tỉnh thành"
                  style={{ width: "100%" }}
                  fieldNames={{ label: "name", value: "id" }}
                  filterOption={(input, option) => (option?.name ?? "").toLowerCase().includes(input.toLowerCase())}
                />
              </div>

              <div className={s.form_under_city}>
                <label>Quận/Huyện <span style={{ color: "red" }}>*</span></label>
                <Select
                  value={formData.districtId}
                  options={districts}
                  onChange={(val) => handleSelectChange(val, "districtId")}
                  showSearch
                  disabled={!formData.cityId}
                  placeholder="Chọn quận huyện"
                  fieldNames={{ label: "name", value: "id" }}
                  style={{ width: "100%" }}
                  filterOption={(input, option) => (option?.name ?? "").toLowerCase().includes(input.toLowerCase())}
                />
              </div>

              <div className={s.form_under_city}>
                <label>Phường/Xã <span style={{ color: "red" }}>*</span></label>
                <Select
                  value={formData.wardId}
                  options={wards}
                  onChange={(val) => handleSelectChange(val, "wardId")}
                  showSearch
                  disabled={!formData.districtId}
                  placeholder="Chọn phường xã"
                  fieldNames={{ label: "name", value: "id" }}
                  style={{ width: "100%" }}
                  filterOption={(input, option) => (option?.name ?? "").toLowerCase().includes(input.toLowerCase())}
                />
              </div>

              <div className={s.form_under_address}>
                <label>Địa chỉ cụ thể</label>
                <div className={s.form_above_input_div_border}>
                  <input
                    className={s.input}
                    name="address"
                    value={formData.address || ""}
                    onChange={handleInputChange}
                    placeholder="Số nhà, tên đường..."
                  />
                </div>
              </div>
            </div>

            <button disabled={isLoading} className={s.btn_submit} onClick={handleSubmit}>
              {isLoading ? <Spin /> : "Cập nhật"}
            </button>
          </div>
        )}
      </div>

      {openModalAva && (
        <ModalAvatarUpload
          onClose={() => setOpenModalAva(false)}
          setResult={(blob) => {
            setAvatarBlob(blob);
            setAvatarPreview(URL.createObjectURL(blob));
          }}
        />
      )}
    </div>
  );
};

export default ContactInformation;