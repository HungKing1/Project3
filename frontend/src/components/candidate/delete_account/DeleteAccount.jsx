import React, { useState } from "react";
import { Button, Input, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuthContext } from "../../../context/AuthContext";
import s from "./styles.module.scss";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function DeleteAccount() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { setAccessToken } = useAuthContext();

  const handleDeleteAccount = async () => {
    if (!password) {
      toast.error("Vui lòng nhập mật khẩu để xác nhận!");
      return;
    }

    setIsLoading(true);
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        toast.error("Phiên đăng nhập hết hạn.");
        navigate("/candidate/login");
        return;
      }

      const response = await axios.post(
        `${API_BASE_URL}/auth/candidate/delete-account`,
        { password: password },
        {
          withCredentials: true,
        }
      );

      if (response.data && response.data.success) {
        toast.success("Xóa tài khoản thành công");

        setIsOpenModal(false);
        setPassword("");

        localStorage.removeItem("access_token");
        localStorage.removeItem("candidate");
        setAccessToken(null);

        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        toast.error(response.data.message || "Xóa tài khoản thất bại");
      }
    } catch (error) {
      console.error("Delete account error:", error);
      const errorMsg =
        error.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại!";
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setIsOpenModal(false);
    setPassword("");
  };

  return (
    <>
      <div className={s.container_table}>
        <div className={s.title}>
          <div className={s.label}>Xóa tài khoản</div>
          <span></span>
        </div>
        <div className={s.form_change}>
          <div className={s.form_content}>
            <p className={s.warning}>Chú ý</p>
            <div className={s.warningContent}>
              Bạn xóa tài khoản có nghĩa là xóa toàn bộ thông tin đã tạo và chấm
              dứt sử dụng dịch vụ.
            </div>
            <div className={s.group_button}>
              <Button
                type="primary"
                danger
                onClick={() => setIsOpenModal(true)}
              >
                Xóa tài khoản
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Modal
        open={isOpenModal}
        title="Xác nhận xóa tài khoản"
        closable={false}
        footer={
          <>
            <Button onClick={handleCancel} disabled={isLoading}>
              Hủy
            </Button>
            <Button
              type="primary"
              danger
              onClick={handleDeleteAccount}
              loading={isLoading}
              disabled={!password}
            >
              Xóa vĩnh viễn
            </Button>
          </>
        }
      >
        <p>
          Hành động này <strong>không thể hoàn tác</strong>. Toàn bộ hồ sơ,
          lịch sử ứng tuyển của bạn sẽ bị xóa khỏi hệ thống.
        </p>
        <p>
          Vui lòng nhập <strong>mật khẩu hiện tại</strong> để xác nhận:
        </p>

        <Input.Password
          placeholder="Nhập mật khẩu của bạn"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onPressEnter={handleDeleteAccount}
        />
      </Modal>
    </>
  );
}