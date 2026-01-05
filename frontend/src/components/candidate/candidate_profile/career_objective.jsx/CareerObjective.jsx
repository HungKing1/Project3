import React, { useEffect, useState } from "react";
import s from "../personal_skill/PersonalSkill.module.scss";
import { Spin } from "antd";
import axios from "axios";
import toast from "react-hot-toast";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

const CareerObjective = () => {
  const [error, setError] = useState("");
  const [target, setTarget] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitChange = (e) => {
    e.preventDefault();
    if (target && target.trim() !== "") {
      setIsLoading(true);
      updateCareerObjective();
      setIsLoading(false);
    } else {
      setError("Vui lòng nhập trường này.");
    }
  };

  const updateCareerObjective = async () => {
    try {
      const response = await api.post("/candidate/update-career-goal", {
        careerGoal: target,
      });
      if (response.data.success) {
        toast.success("Cập nhật thành công.");
      }
    } catch (error) {
      toast.error("Error updating career objective:", error);
    }
  };
  
  const fetchCareerObjective = async () => {
    try {
      const response = await api.get("/candidate/get-career-goal");
      if (response.data.success) {
        setTarget(response.data.data);
      }
    } catch (error) {
      toast.error("Error fetching career objective:", error);
    }
  };
  
  useEffect(() => {
    fetchCareerObjective();
  }, [])

  return (
    <>
      <div className={s.body}>
        <div className={s.container}>
          <div className={s.title}>
            <div className={s.title_1}>MỤC TIÊU NGHỀ NGHIỆP</div>
            <div className={s.title_2}></div>
          </div>
          <div className={s.form_input}>
            <label htmlFor="descriptions">
              Mô tả ngắn mục tiêu của bản thân{" "}
              <span style={{ color: "red" }}>*</span>
            </label>
            <div className={s.form_input_div}>
              <textarea
                name="descriptions"
                value={target}
                placeholder="Viết mô tả ngắn mục tiêu của bản thân"
                onChange={(e) => setTarget(e.target.value)}
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

export default CareerObjective;