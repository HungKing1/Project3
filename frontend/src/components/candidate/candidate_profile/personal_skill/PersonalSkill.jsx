import React, { useEffect, useState } from "react";
import s from "./PersonalSkill.module.scss";
import { Spin } from "antd";
import toast from "react-hot-toast";
import axios from "axios";
  
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

const PersonalSkill = () => {
  const [skill, setSkill] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitChange = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (skill && skill.trim() !== "") {
      updatePersonalSkill();
      setIsLoading(false)
    } else {
      setIsLoading(false);
      setError("Vui lòng nhập trường này.");
    }
  };

  const fetchPersonalSkill = async () => {
    try {
      const response = await api.get("/candidate/get-personal-skill");
      if (response.data.success) {
        setSkill(response.data.data);
      }
    } catch {
      toast.error("Error fetching personal skill:", error);
    }
  };

  const updatePersonalSkill = async () => {
    try {
      const response = await api.post("/candidate/update-personal-skill", {
        personalSkill: skill,
      });
      if (response.data.success) {
        toast.success("Cập nhật thành công.");
      }
    } catch (error) {
      toast.error("Error updating personal skill:", error);
    }
  };

  useEffect(() => {
    fetchPersonalSkill();
  }, [])

  return (
    <>
      <div className={s.body}>
        <div className={s.container}>
          <div className={s.title}>
            <div className={s.title_1}>KỸ NĂNG BẢN THÂN</div>
            <div className={s.title_2}></div>
          </div>
          <div className={s.form_input}>
            <label htmlFor="descriptions">
              Mô tả ngắn kỹ năng của bản thân{" "}
              <span style={{ color: "red" }}>*</span>
            </label>
            <div className={s.form_input_div}>
              <textarea
                value={skill}
                name="descriptions"
                placeholder="Viết mô tả ngắn kỹ năng của bản thân"
                onChange={(e) => setSkill(e.target.value)}
              ></textarea>
            </div>
            <p className={s.error_message}>{error}</p>
          </div>
          <button
            disabled={isLoading}
            type="submit"
            className={s.btn_submit}
            onClick={(e) => handleSubmitChange(e)}
          >
            {isLoading ? <Spin /> : "Cập nhật"}
          </button>
        </div>
      </div>
    </>
  );
};

export default PersonalSkill;