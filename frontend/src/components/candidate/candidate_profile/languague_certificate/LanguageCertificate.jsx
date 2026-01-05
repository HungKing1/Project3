import React, { useEffect, useState, useCallback } from "react";
import { Select, message, Spin } from "antd";
import s from "./LanguageCertificate.module.scss";
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

const CertificateForm = ({ handleDelete, handleData, onSave, dataInit, index, isLoading }) => {
  const [formData, setFormData] = useState(dataInit);

  useEffect(() => { setFormData(dataInit); }, [dataInit]);

  const handleChange = (field, value) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    handleData(updated, index);
  };

  return (
    <div className={s.degree_card}>
      <div className={s.degree_header}>
        <span className={s.degree_number}>Chứng chỉ #{index + 1}</span>
        <div className={s.header_actions}>
          <button 
            className={s.btn_save_item} 
            onClick={() => onSave(formData)}
            disabled={isLoading}
          >
            {formData.id ? "Cập nhật" : "Lưu mới"}
          </button>
          <div className={s.btn_delete_text} onClick={() => handleDelete(formData.id, index)}>
            Xoá
          </div>
        </div>
      </div>

      <div className={s.form_grid}>
        <div className={s.form_input}>
          <label>Tên chứng chỉ (VD: IELTS, JLPT) <span style={{ color: "red" }}>*</span></label>
          <div className={s.form_input_div}>
            <input
              value={formData.name || ""}
              placeholder="Nhập tên chứng chỉ"
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>
        </div>

        <div className={s.form_input}>
          <label>Đơn vị cấp chứng chỉ <span style={{ color: "red" }}>*</span></label>
          <div className={s.form_input_div}>
            <input
              value={formData.issuingOrganization || ""}
              placeholder="Nhập đơn vị cấp (VD: British Council)"
              onChange={(e) => handleChange("issuingOrganization", e.target.value)}
            />
          </div>
        </div>

        <div className={s.time_row}>
          <div className={s.form_input}>
            <label>Ngày cấp <span style={{ color: "red" }}>*</span></label>
            <div className={s.form_input_div}>
              <input
                type="date"
                value={formData.startDate || ""}
                onChange={(e) => handleChange("startDate", e.target.value)}
              />
            </div>
          </div>
          <div className={s.form_input}>
            <label>Ngày hết hạn</label>
            <div className={s.form_input_div}>
              <input
                type="date"
                value={formData.endDate || ""}
                onChange={(e) => handleChange("endDate", e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className={s.form_input}>
          <label>Kết quả / Điểm số <span style={{ color: "red" }}>*</span></label>
          <div className={s.form_input_div}>
            <input
              value={formData.result || ""}
              placeholder="Nhập kết quả (VD: 7.5, N2)"
              onChange={(e) => handleChange("result", e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const LanguageCertificate = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [certificates, setCertificates] = useState([]);

  const fetchCertificates = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await api.get("/candidate/get-language-certificates");
      if (res.data.success) setCertificates(res.data.data);
    } catch (err) {
      message.error("Lỗi tải dữ liệu");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { fetchCertificates(); }, [fetchCertificates]);

  const handleSaveIndividual = async (certData) => {
    if (!certData.name || !certData.issuingOrganization || !certData.startDate || !certData.result) {
      message.warning("Vui lòng điền đủ thông tin *");
      return;
    }
    setIsLoading(true);
    try {
      const endpoint = certData.id ? "/candidate/update-language-certificate" : "/candidate/add-language-certificate";
      const res = await api.post(endpoint, certData);
      if (res.data.success) {
        message.success("Thành công!");
        fetchCertificates();
      }
    } catch (err) {
      message.error("Thao tác thất bại");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddMore = () => {
    setCertificates([...certificates, { id: null, name: "", issuingOrganization: "", result: "", startDate: "", endDate: "" }]);
  };

  const updateLocalState = (updatedItem, index) => {
    const newCerts = [...certificates];
    newCerts[index] = updatedItem;
    setCertificates(newCerts);
  };

  const removeCertificate = async (id, index) => {
    if (window.confirm("Xóa chứng chỉ này?")) {
      if (id) {
        try {
          await api.delete(`/candidate/delete-language-certificate/${id}`);
        } catch (err) { return; }
      }
      setCertificates(certificates.filter((_, i) => i !== index));
      message.success("Đã xóa");
    }
  };

  return (
    <Spin spinning={isLoading}>
      <div className={s.body}>
        <div className={s.container}>
          <div className={s.title}>
            <div className={s.title_1}>CHỨNG CHỈ NGOẠI NGỮ</div>
            <div className={s.title_2}></div>
          </div>
          <div className={s.degree_list}>
            {certificates.map((item, index) => (
              <CertificateForm
                key={index}
                index={index}
                dataInit={item}
                isLoading={isLoading}
                handleData={updateLocalState}
                handleDelete={removeCertificate}
                onSave={handleSaveIndividual}
              />
            ))}
          </div>
          <div className={s.btn_action_group}>
            <div className={s.btn_add} onClick={handleAddMore}>
              <div className={s.btn_add_icon}>+</div>
              <div className={s.btn_add_text}>Thêm chứng chỉ</div>
            </div>
          </div>
        </div>
      </div>
    </Spin>
  );
};

export default LanguageCertificate;