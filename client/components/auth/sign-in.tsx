import React, { FC, useImperativeHandle, useState } from "react";
import { Button, Modal, Form, Input, Checkbox, Row, notification } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

import { useRouter } from "next/router";
import { useAuthContext } from "../../context/auth.context";

interface FinishInput {
  username: string;
  password: string;
}
// main component
const SignUp: React.ForwardRefRenderFunction<unknown, any> = (props, ref) => {
  const [visible, setvisible] = useState(false);
  const { signIn } = useAuthContext();
  const router = useRouter();
  const [form] = Form.useForm();
  const [submitBtn, setsubmitBtn] = useState(false);

  useImperativeHandle(ref, () => ({
    showModal: () => {
      setvisible(true);
    },
  }));

  const onFinish = async (data: FinishInput) => {
    setsubmitBtn(true);
    const result = await signIn(data);
    if (result.error) {
      notification.error({
        message: "Error",
        description: "Check Email and Password",
      });
      return setsubmitBtn(false);
    }
    notification.success({
      message: "Sign In",
      description: "Success",
    });
    return setsubmitBtn(false);
  };

  return (
    <Modal title="Sign In" visible={visible} footer={null} onCancel={() => setvisible(false)}>
      <Form form={form} name="normal_login" initialValues={{ remember: true }} onFinish={onFinish}>
        <Form.Item name="username" rules={[{ required: true, message: "Please input your Username!" }]}>
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: "Please input your Password!" }]}>
          <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button loading={submitBtn} disabled={submitBtn} block type="primary" htmlType="submit">
            Sing In
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default React.forwardRef(SignUp);
