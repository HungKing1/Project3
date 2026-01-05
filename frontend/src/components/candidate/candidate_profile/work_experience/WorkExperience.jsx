import React, { useEffect, useState, useCallback } from "react";
import { message, Spin } from "antd";
import s from "./WorkExperience.module.scss";
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

const ExperienceForm = ({ handleDelete, handleData, onSave, dataInit, index, isLoading }) => {
  const [formData, setFormData] = useState(dataInit);

  useEffect(() => { setFormData(dataInit); }, [dataInit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...formData, [name]: value };
    setFormData(updated);
    handleData(updated, index);
  };

  return (
    <div className={s.degree_card}>
      <div className={s.degree_header}>
        <span className={s.degree_number}>Kinh nghiệm #{index + 1}</span>
        <div className={s.header_actions}>
          <button className={s.btn_save_item} onClick={() => onSave(formData)} disabled={isLoading}>
            {formData.id ? "Cập nhật" : "Lưu mới"}
          </button>
          <div className={s.btn_delete_text} onClick={() => handleDelete(formData.id, index)}>Xoá</div>
        </div>
      </div>

      <div className={s.form_grid}>
        <div className={s.form_input}>
          <label>Chức danh / Vị trí <span style={{ color: "red" }}>*</span></label>
          <div className={s.form_input_div}>
            <input name="jobTitle" value={formData.jobTitle || ""} placeholder="VD: Frontend Developer" onChange={handleChange} />
          </div>
        </div>

        <div className={s.form_input}>
          <label>Công ty <span style={{ color: "red" }}>*</span></label>
          <div className={s.form_input_div}>
            <input name="companyName" value={formData.companyName || ""} placeholder="Nhập tên công ty" onChange={handleChange} />
          </div>
        </div>

        <div className={s.time_row}>
          <div className={s.form_input}>
            <label>Thời gian bắt đầu <span style={{ color: "red" }}>*</span></label>
            <div className={s.form_input_div}>
              <input type="date" name="startDate" value={formData.startDate || ""} onChange={handleChange} />
            </div>
          </div>
          <div className={s.form_input}>
            <label>Thời gian kết thúc <span style={{ color: "red" }}>*</span></label>
            <div className={s.form_input_div}>
              <input type="date" name="endDate" value={formData.endDate || ""} onChange={handleChange} />
            </div>
          </div>
        </div>

        <div className={`${s.form_input} ${s.full_width}`}>
          <label>Mô tả công việc</label>
          <div className={s.form_input_div_textarea}>
            <textarea name="jobDescription" value={formData.jobDescription || ""} placeholder="Mô tả ngắn gọn công việc và thành tựu..." onChange={handleChange} />
          </div>
        </div>
      </div>
    </div>
  );
};

const WorkExperience = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [experiences, setExperiences] = useState([]);

  const fetchExperiences = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await api.get("/candidate/get-work-experiences");
      if (res.data.success) setExperiences(res.data.data);
    } catch (err) { message.error("Lỗi tải dữ liệu"); } finally { setIsLoading(false); }
  }, []);

  useEffect(() => { fetchExperiences(); }, [fetchExperiences]);

  const handleSaveIndividual = async (data) => {
    if (!data.jobTitle || !data.companyName || !data.startDate) {
      message.warning("Vui lòng điền đủ thông tin *");
      return;
    }
    setIsLoading(true);
    try {
      const endpoint = data.id ? "/candidate/update-work-experience" : "/candidate/add-work-experience";
      const res = await api.post(endpoint, data);
      if (res.data.success) { message.success("Thành công!"); fetchExperiences(); }
    } catch (err) { message.error("Thao tác thất bại"); } finally { setIsLoading(false); }
  };

  const handleAddMore = () => {
    setExperiences([...experiences, { id: null, jobTitle: "", companyName: "", jobDescription: "", startDate: "", endDate: "" }]);
  };

  const removeExp = async (id, index) => {
    if (window.confirm("Xóa kinh nghiệm này?")) {
      if (id) await api.delete(`/candidate/delete-work-experience/${id}`);
      setExperiences(experiences.filter((_, i) => i !== index));
      message.success("Đã xóa");
    }
  };

  return (
    <Spin spinning={isLoading}>
      <div className={s.body}>
        <div className={s.container}>
          <div className={s.title}>
            <div className={s.title_1}>KINH NGHIỆM LÀM VIỆC</div>
            <div className={s.title_2}></div>
          </div>
          <div className={s.degree_list}>
            {experiences.map((item, index) => (
              <ExperienceForm key={index} index={index} dataInit={item} isLoading={isLoading} 
                handleData={(updated) => { const next = [...experiences]; next[index] = updated; setExperiences(next); }} 
                handleDelete={removeExp} onSave={handleSaveIndividual} />
            ))}
          </div>
          <div className={s.btn_action_group}>
            <div className={s.btn_add} onClick={handleAddMore}>
              <div className={s.btn_add_icon}>+</div>
              <div className={s.btn_add_text}>Thêm kinh nghiệm</div>
            </div>
          </div>
        </div>
      </div>
    </Spin>
  );
};

export default WorkExperience;