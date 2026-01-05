import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import s from "./styles.module.scss";

export default function ChangePassword() {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  const validateInput = (_, value) => {
    if (value && value.length > 5) {
      const hasWhitespace = /\s/.test(value);
      if (hasWhitespace) {
        return Promise.reject('Mật khẩu không được chứa khoảng trắng');
      }
      const hasLetter = /[a-zA-Z]/.test(value);
      const hasNumber = /[0-9]/.test(value);
      if (!hasLetter || !hasNumber) {
        return Promise.reject('Mật khẩu phải bao gồm có ít nhất 1 chữ và 1 số.');
      }
    }
    return Promise.resolve();
  };

  const resetPassword = (values) => {
    setIsLoading(true);
    console.log("Form Values:", values);

    // Simulate API Call
    setTimeout(() => {
        setIsLoading(false);
        if (values.old_password === '123456') { 
             alert("Đổi mật khẩu thành công!");
             form.resetFields();
             // In a real app, redirect here using react-router-dom's useNavigate
             // navigate('/ung-vien/quan-ly-chung');
             console.log("Redirect to: /ung-vien/quan-ly-chung");
        } else {
             alert("Mật khẩu cũ không chính xác (Demo: nhập 123456)");
        }
    }, 1000);
  };
  
  const handleCancel = () => {
      form.resetFields();
      // navigate('/ung-vien/quan-ly-chung');
      console.log("Cancelled, redirect to: /ung-vien/quan-ly-chung");
  }

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
                  { required: true, message: 'Vui lòng nhập mật khẩu cũ' },
                  { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự' },
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
                  { required: true, message: 'Vui lòng nhập mật khẩu mới' },
                  { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự' },
                  { validator: validateInput },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('old_password') !== value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error('Mật khẩu mới phải khác với mật khẩu cũ')
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
                dependencies={['new_password']}
                rules={[
                  { required: true, message: 'Vui lòng nhập lại mật khẩu mới' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('new_password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('Mật khẩu không khớp'));
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