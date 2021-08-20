import React, { FC, useImperativeHandle, useState } from "react";
import { Button, Modal, Form, Input, notification } from "antd";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";

import { useRouter } from "next/router";
import { useAuthContext } from "../../context/auth.context";

interface FinishInput {
  username: string;
  password: string;
  email: string;
}
// main component
const SignUp: React.ForwardRefRenderFunction<unknown, any> = (props, ref) => {
  const [visible, setvisible] = useState(false);
  const { signUp } = useAuthContext();
  const [form] = Form.useForm();

  useImperativeHandle(ref, () => ({
    showModal: () => {
      setvisible(true);
    },
  }));

  const onFinish = async (data: FinishInput) => {
    const result = await signUp(data);
    if (result.error) {
      notification.error({
        message: "Error",
        description: result.message,
      });
    }
    notification.success({
      message: "Sing Up",
      description: "Success",
    });
  };

  return (
    <Modal title="Sign Up" visible={visible} footer={null} onCancel={() => setvisible(false)}>
      <Form form={form} name="normal_login" initialValues={{ remember: true }} onFinish={onFinish}>
        <Form.Item
          name="email"
          rules={[
            { required: true, message: "Please input your Email!" },
            { type: "email", message: "Please input your Email!" },
          ]}
        >
          <Input prefix={<MailOutlined />} placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="username"
          rules={[
            { required: true, message: "Please input your Username!" },
            { min: 6, message: "Please input your 6 character!" },
          ]}
        >
          <Input prefix={<UserOutlined className="" />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            { required: true, message: "Please input your Password!" },
            { min: 6, message: "Please input your 6 character!" },
          ]}
        >
          <Input prefix={<LockOutlined className="" />} type="password" placeholder="Password" />
        </Form.Item>

        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Sing Up
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default React.forwardRef(SignUp);
