import { Button, Card, Form, Input, Checkbox, notification, Typography } from "antd";

import React, { FC } from "react";
import { useProductsContext } from "../../../context/products.context";

const CreateProductPage: FC = () => {
  const { createProduct } = useProductsContext();
  const onFinish = async (values: any) => {
    await createProduct(values);
    notification.success({
      message: "Create Product",
      description: "Success",
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Card style={{ margin: "0.5rem" }}>
      <Typography.Title level={3}>Create Product</Typography.Title>
      <Form
        name="Create_Product"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
      >
        <Form.Item label="Name" name="name" rules={[{ required: true, message: "Please input your username!" }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Title" name="title" rules={[{ required: true, message: "Please input your title!" }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please input your description!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Price" name="price" rules={[{ required: true, message: "Please input your price!" }]}>
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
          <Button block type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default CreateProductPage;
