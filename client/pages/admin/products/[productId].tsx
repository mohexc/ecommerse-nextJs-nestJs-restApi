import { Card, Input, Form, Button, notification, Typography } from "antd";

import { useRouter } from "next/router";
import React, { FC, useEffect } from "react";
import { useProductsContext } from "../../../context/products.context";

const ProductDetailPage: FC = () => {
  const router = useRouter();
  const { productId } = router.query;
  const { product, loadingProduct, errorProduct, getProduct, updateProduct } = useProductsContext();
  useEffect(() => {
    if (productId) {
      getProduct(productId);
    }
  }, []);

  const onFinish = (values: any) => {
    updateProduct(productId, values);
    notification.success({
      message: "Update Product",
      description: "Update success",
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  if (loadingProduct) {
    return <p>Loading...</p>;
  }

  return (
    <Card style={{ margin: "1rem" }}>
      <Typography.Title level={3}>Edit & View Product</Typography.Title>
      <Form
        name="basic"
        initialValues={product}
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

export default ProductDetailPage;
