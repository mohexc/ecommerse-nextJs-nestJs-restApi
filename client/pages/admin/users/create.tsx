import { Button, Form, Input, notification, Row, Select, Typography, PageHeader } from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import NCard from "../../../components/common/n-card";
import { useUsersContext } from "../../../context/users.context";

const CreateUser = () => {
  const { createUser } = useUsersContext();
  const [disableBotton, setDisableBotton] = useState(false);
  const [roles, setRoles] = useState<string[] | undefined>();
  const route = useRouter();
  useEffect(() => {
    setRoles(["user", "admin"]);
  }, []);

  const onFinish = async (values) => {
    setDisableBotton(true);
    try {
      await createUser(values);
      notification.success({
        message: "Create User",
        description: "Success",
      });
      route.push("/admin/users");
    } catch (error) {
      notification.success({
        message: "Create User",
        description: JSON.stringify(error),
      });
    } finally {
      setDisableBotton(false);
    }
  };

  return (
    <PageHeader
      style={{ margin: "0.5rem", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}
      ghost={false}
      onBack={() => route.back()}
      title="Create User"
    >
      <Form
        name="basic"
        labelCol={{ xs: 4 }}
        wrapperCol={{ xs: 20, lg: 12 }}
        onFinish={onFinish}
        initialValues={{ role: "user" }}
      >
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item label="Role" name="role">
          <Select>
            {roles?.map((role) => (
              <Select.Option key={role} value={role}>
                {role}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 4, span: 12 }}>
          <Button disabled={disableBotton} loading={disableBotton} block type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </PageHeader>
  );
};

export default CreateUser;
