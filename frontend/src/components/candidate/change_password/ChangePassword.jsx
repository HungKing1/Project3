import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import s from "./styles.module.scss";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function ChangePassword() {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateInput = (_, value) => {
    if (value && value.length > 5) {
      const hasWhitespace = /\s/.test(value);
      if (hasWhitespace) {
        return Promise.reject("Mật khẩu không được chứa khoảng trắng");
      }
      const hasLetter = /[a-zA-Z]/.test(value);
      const hasNumber = /[0-9]/.test(value);
      if (!hasLetter || !hasNumber) {
        return Promise.reject(
          "Mật khẩu phải bao gồm có ít nhất 1 chữ và 1 số."
        );
      }
    }
    return Promise.resolve();
  };

  const resetPassword = async (values) => {
    setIsLoading(true);

    try {
      const token = localStorage.getItem("access_token");

      if (!token) {
        toast.error("Vui lòng đăng nhập lại!");
        navigate("/ung-vien/dang-nhap");
        return;
      }

      const requestData = {
        oldPassword: values.old_password,
        newPassword: values.new_password,
        confirmPassword: values.repassword,
      };

      const response = await axios.post(
        `${API_BASE_URL}/auth/candidate/change-password`,
        requestData,
        {
          withCredentials: true
        }
      );

      if (response.data && response.data.success) {
        toast.success(response.data.message || "Đổi mật khẩu thành công!");
        form.resetFields();
        setTimeout(() => {
          navigate("/candidate/change-password");
        }, 1000);
      } else {
        toast.error(response.data.message || "Đổi mật khẩu thất bại");
      }
    } catch (error) {
      console.error("Change password error:", error);
      const errorMsg =
        error.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại!";
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    navigate("/ung-vien/quan-ly-chung");
  };

  return (
    <>
      <div className={s.container_table}>
        <div className={s.title}>
          <div className={s.label}>Đổi Mật Khẩu </div>
          <span></span>
        </div>
        <div className={s.form_change}>
          <Form
            className={s.form_content}
            name="info_password"
            onFinish={resetPassword}
            form={form}
            layout="vertical"
          >
            <Form.Item
              className={s.form_item}
              label="Mật khẩu hiện tại"
              name="old_password"
              rules={[
                { required: true, message: "Vui lòng nhập mật khẩu cũ" },
                { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự" },
                { validator: validateInput },
              ]}
            >
              <Input.Password placeholder="Nhập mật khẩu hiện tại" />
            </Form.Item>

            <Form.Item
              className={s.form_item}
              label="Mật khẩu mới"
              name="new_password"
              rules={[
                { required: true, message: "Vui lòng nhập mật khẩu mới" },
                { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự" },
                { validator: validateInput },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("old_password") !== value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Mật khẩu mới phải khác với mật khẩu cũ")
                    );
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Nhập mật khẩu mới" />
            </Form.Item>

            <Form.Item
              className={s.form_item}
              label="Nhập lại mật khẩu mới"
              name="repassword"
              dependencies={["new_password"]}
              rules={[
                { required: true, message: "Vui lòng nhập lại mật khẩu mới" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("new_password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Mật khẩu không khớp"));
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Nhập lại mật khẩu mới" />
            </Form.Item>

            <Form.Item className={s.group_button}>
              <Button type="primary" htmlType="submit" loading={isLoading}>
                Đổi mật khẩu
              </Button>
              <Button
                htmlType="button"
                style={{ color: "#3A85D4", borderColor: "#3A85D4" }}
                onClick={handleCancel}
              >
                Hủy
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
}