import React, { useState } from "react";
import { Row, Col, Card, Form, notification, Input, Button, Typography } from "antd";
import { useAuthContext } from "../../context/auth.context";
import { useRouter } from "next/router";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useThemeContext } from "../../context/them.context";

interface FinishInput {
  username: string;
  password: string;
}

const SignUpPage = () => {
  const { signIn } = useAuthContext();
  const { color } = useThemeContext();
  const router = useRouter();
  const [form] = Form.useForm();
  const [submitBtn, setsubmitBtn] = useState(false);
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
    router.push("/");
    return setsubmitBtn(false);
  };
  return (
    <Row justify="center" align="middle" style={{ background: color }}>
      <Col xs={8} style={{ margin: "5rem" }}>
        <Card>
          <Typography.Title level={3}>Sign In</Typography.Title>
          <Form form={form} name="normal_login" initialValues={{ remember: true }} onFinish={onFinish}>
            <Form.Item name="username" rules={[{ required: true, message: "Please input your Username!" }]}>
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: "Please input your Password!" }]}>
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Button loading={submitBtn} disabled={submitBtn} block type="primary" htmlType="submit">
                Sing In
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default SignUpPage;
