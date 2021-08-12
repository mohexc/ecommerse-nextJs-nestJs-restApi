import React, { FC, useImperativeHandle, RefForwardingComponent, useState } from "react";
import { Button, Modal, Form, Input, Checkbox, Row, notification } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

import { useRouter } from "next/router";
import { useAuthContext } from "../../context/auth.context";

interface ionFinishInput {
  username: string;
  password: string;
  rememberMe: boolean;
}
// main component
const SignIn: React.ForwardRefRenderFunction<unknown, any> = (props, ref) => {
  const [visible, setvisible] = useState(false);
  const { signIn: loggin } = useAuthContext();
  const router = useRouter();
  const [form] = Form.useForm();

  useImperativeHandle(ref, () => ({
    showModal: () => {
      setvisible(true);
    },
  }));

  const onFinish = (data: ionFinishInput) => {
    try {
      const result = loggin(data);
      notification.success({
        message: "Sing In success",
        description: result,
      });
      router.push("/admin/dashboard");
      setvisible(false);
      form.resetFields();
    } catch (error) {
      notification.error({
        message: "Sing In faile",
        description: "Sing In faile",
      });
    }
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
          <Row justify="space-between">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </Row>
        </Form.Item>

        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Sing In
          </Button>
          Or <a href="">register now!</a>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default React.forwardRef(SignIn);
