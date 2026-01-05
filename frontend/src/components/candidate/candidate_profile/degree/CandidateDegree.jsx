import React, { useEffect, useState, useCallback } from "react";
import { Select, message, Spin } from "antd";
import s from "./CandidateDegree.module.scss";
import * as selectData from "../../../../assets/selectData.js";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

const DegreeForm = ({ handleDelete, handleData, onSave, dataInit, index, isLoading }) => {
  const [formData, setFormData] = useState(dataInit);

  useEffect(() => {
    setFormData(dataInit);
  }, [dataInit]);

  const handleChange = (field, value) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    handleData(updated, index);
  };

  const xepLoaiOptions = [
    { label: "Trung bình", value: "Trung bình" },
    { label: "Khá", value: "Khá" },
    { label: "Giỏi", value: "Giỏi" },
    { label: "Xuất sắc", value: "Xuất sắc" }
  ];

  return (
    <div className={s.degree_card}>
      <div className={s.degree_header}>
        <span className={s.degree_number}>Bằng cấp #{index + 1}</span>
        <div className={s.header_actions}>
          {/* Nút Cập nhật/Thêm mới riêng cho từng bằng cấp */}
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
          <label>Trình độ đào tạo <span style={{ color: "red" }}>*</span></label>
          <div className={`${s.form_input_div} ${s.select_wrapper}`}>
            <Select
              placeholder="Chọn trình độ"
              options={selectData.educationLevels}
              value={formData.educationLevelId || undefined}
              onChange={(val) => handleChange("educationLevelId", val)}
              bordered={false}
              className={s.antd_select_custom}
              fieldNames={{ label: "name", value: "id" }}
              showSearch
              filterOption={(input, option) => (option?.name ?? "").toLowerCase().includes(input.toLowerCase())}
            />
          </div>
        </div>

        <div className={s.form_input}>
          <label>Tên bằng cấp / Chứng chỉ <span style={{ color: "red" }}>*</span></label>
          <div className={s.form_input_div}>
            <input
              value={formData.name || ""}
              placeholder="Nhập tên bằng"
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>
        </div>

        <div className={s.form_input}>
          <label>Tên trường, đào tạo <span style={{ color: "red" }}>*</span></label>
          <div className={s.form_input_div}>
            <input
              value={formData.institutionName || ""}
              placeholder="Nhập tên trường học"
              onChange={(e) => handleChange("institutionName", e.target.value)}
            />
          </div>
        </div>

        <div className={s.time_row}>
          <div className={s.form_input}>
            <label>Thời gian bắt đầu <span style={{ color: "red" }}>*</span></label>
            <div className={s.form_input_div}>
              <input
                type="date"
                className={s.input_date}
                value={formData.startDate || ""}
                onChange={(e) => handleChange("startDate", e.target.value)}
              />
            </div>
          </div>
          <div className={s.form_input}>
            <label>Thời gian kết thúc <span style={{ color: "red" }}>*</span></label>
            <div className={s.form_input_div}>
              <input
                type="date"
                className={s.input_date}
                value={formData.endDate || ""}
                onChange={(e) => handleChange("endDate", e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className={s.form_input}>
          <label>Chuyên ngành <span style={{ color: "red" }}>*</span></label>
          <div className={s.form_input_div}>
            <input
              value={formData.major || ""}
              placeholder="Nhập chuyên ngành"
              onChange={(e) => handleChange("major", e.target.value)}
            />
          </div>
        </div>

        <div className={s.form_input}>
          <label>Xếp loại <span style={{ color: "red" }}>*</span></label>
          <div className={`${s.form_input_div} ${s.select_wrapper}`}>
            <Select
              placeholder="Chọn xếp loại"
              options={xepLoaiOptions}
              value={formData.classification || undefined}
              onChange={(val) => handleChange("classification", val)}
              bordered={false}
              className={s.antd_select_custom}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const CandidateDegree = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [degrees, setDegrees] = useState([]);

  const fetchDegrees = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await api.get("/candidate/get-degrees");
      if (response.data.success) {
        const normalizedData = response.data.data.map(item => ({
          ...item,
          educationLevelId: item.educationLevelId || item.educationLevel?.id
        }));
        setDegrees(normalizedData);
      }
    } catch (error) {
      message.error("Không thể tải dữ liệu.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDegrees();
  }, [fetchDegrees]);

  // Logic xử lý cập nhật hoặc thêm mới cho từng bản ghi đơn lẻ
  const handleSaveIndividual = async (degreeData) => {
    // Validation cơ bản
    if (!degreeData.name || !degreeData.educationLevelId || !degreeData.startDate) {
      message.warning("Vui lòng điền đủ thông tin bắt buộc (*)");
      return;
    }

    setIsLoading(true);
    try {
      const endpoint = degreeData.id ? "/candidate/update-degree" : "/candidate/add-degree";
      const response = await api.post(endpoint, degreeData);
      
      if (response.data.success) {
        message.success(degreeData.id ? "Cập nhật thành công!" : "Thêm mới thành công!");
        fetchDegrees(); // Reload để lấy ID mới nhất từ BE
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error("Thao tác thất bại.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddMore = () => {
    setDegrees([...degrees, { 
      id: null, 
      educationLevelId: null, 
      name: "", 
      institutionName: "", 
      startDate: "", 
      endDate: "", 
      major: "", 
      classification: "" 
    }]);
  };

  const updateLocalState = (updatedItem, index) => {
    const newDegrees = [...degrees];
    newDegrees[index] = updatedItem;
    setDegrees(newDegrees);
  };

  const removeDegree = async (degreeId, index) => {
    if (window.confirm("Xác nhận xóa bằng cấp này?")) {
      if (degreeId) {
        try {
          await api.delete(`/candidate/delete-degree/${degreeId}`);
          message.success("Xóa thành công.");
        } catch (error) {
          message.error("Lỗi khi xóa.");
          return;
        }
      }
      setDegrees(degrees.filter((_, i) => i !== index));
    }
  };

  return (
    <Spin spinning={isLoading}>
      <div className={s.body}>
        <div className={s.container}>
          <div className={s.title}>
            <div className={s.title_1}>HỒ SƠ BẰNG CẤP</div>
            <div className={s.title_2}></div>
          </div>

          <div className={s.degree_list}>
            {degrees.map((item, index) => (
              <DegreeForm
                key={index}
                index={index}
                dataInit={item}
                isLoading={isLoading}
                handleData={updateLocalState}
                handleDelete={removeDegree}
                onSave={handleSaveIndividual}
              />
            ))}
          </div>

          <div className={s.btn_action_group}>
            <div className={s.btn_add} onClick={handleAddMore}>
              <div className={s.btn_add_icon}>+</div>
              <div className={s.btn_add_text}>Thêm bằng cấp mới</div>
            </div>
            {/* Đã loại bỏ nút cập nhật tổng ở đây */}
          </div>
        </div>
      </div>
    </Spin>
  );
};

export default CandidateDegree;