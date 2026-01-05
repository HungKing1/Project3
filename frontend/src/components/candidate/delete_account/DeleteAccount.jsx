import React, { useState } from "react";
import { Button, Input, Modal } from "antd";
import s from "./styles.module.scss";

export default function DeleteAccount() {
  const [isopenMOdal, setIsopenMOdal] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const testStr = "Xóa tài khoản của tôi";

  const xoaTaiKhoan = async () => {
    
    console.log("Mock API Call: deleting user...");
    
    setTimeout(() => {
        alert("Xóa tài khoản thành công");
        setIsopenMOdal(false);
        setConfirmText("");
        
        console.log("Redirecting to home...");
        window.location.href = "/"; 
    }, 500);
  };

  return (
    <>
        <div className={s.container_table}>
          <div className={s.title}>
            <div className={s.label}>Xóa tài khoản </div>
            <span></span>
          </div>
          <div className={s.form_change}>
            <div className={s.form_content}>
              <p className={s.warning}>Chú ý</p>
              <div className={s.warningContent}>
                Bạn xóa tài khoản có nghĩa là xóa toàn bộ thông tin đã tạo và
                chấm dứt sử dụng dịch vụ.
              </div>
              <div className={s.group_button}>
                <Button
                  type="primary"
                  onClick={() => {
                    console.log("Redirect to /ung-vien/quan-ly-chung");
                  }}
                >
                  Quay về Quản lý chung
                </Button>
                <Button
                  type="primary"
                  danger
                  onClick={() => setIsopenMOdal(true)}
                >
                  Tôi muốn xóa
                </Button>
              </div>
            </div>
          </div>
        </div>
      <Modal
        open={isopenMOdal}
        title="Xóa tài khoản"
        closable={false}
        footer={
          <>
            <Button
              type="primary"
              onClick={() => {
                setConfirmText("");
                setIsopenMOdal(false);
              }}
            >
              Hủy
            </Button>
            <Button
              type="primary"
              danger
              onClick={xoaTaiKhoan}
              disabled={confirmText !== testStr}
            >
              Xóa
            </Button>
          </>
        }
      >
        <p>
          Bạn xóa tài khoản có nghĩa là xóa toàn bộ thông tin đã tạo và chấm dứt
          mọi sử dụng dịch vụ trên Job247.vn, bạn có muốn tiếp tục?
        </p>
        <p>
          Để tiếp tục xóa, hãy gõ <strong>{testStr}</strong> và bấm Xóa
        </p>
        <Input onChange={(e) => setConfirmText(e.target.value)} />
      </Modal>
    </>
  );
}