import { PlusOutlined } from "@ant-design/icons";
import { Button, Card, Col, Form, Input, notification, Row, Typography, Upload } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { FC } from "react";
import { useState } from "react";
import { useProductsContext } from "../../../context/products.context";
import getBase64 from "../../../utils/get-base64";
import ReactPlayer from "react-player";
import { useEffect } from "react";
import { useAuthContext } from "../../../context/auth.context";
import { useRouter } from "next/router";

// main
const CreateProductPage: FC = () => {
  const [form] = Form.useForm();
  const { createProduct } = useProductsContext();
  const [video, setVideo] = useState<string | undefined>();
  const [submitBtn, setSubmitBtn] = useState(false);
  const { httpRequests, currentUser } = useAuthContext();
  const route = useRouter();
  const [pictures, setPictures] = useState({
    previewVisible: false,
    previewImage: "",
    previewTitle: "",
    fileList: [],
  });

  useEffect(() => {
    if (currentUser?.role !== "admin") {
      route.push("/");
    }
  }, [currentUser]);

  const handleCancel = () => setPictures({ ...pictures, previewVisible: false });

  const handleChange = ({ fileList }) => setPictures({ ...pictures, fileList });

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPictures({
      ...pictures,
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
    });
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 1 }}>Upload</div>
    </div>
  );

  const onFinish = async (values: any) => {
    setSubmitBtn(true);
    const formData = new FormData();
    pictures.fileList.forEach((file) => {
      formData.append("files", file.originFileObj);
    });
    const { data } = await httpRequests.post(`multiple-uploadfile`, formData);
    values.images = data;
    const result = await createProduct(values);
    if (result.error) {
      setSubmitBtn(false);
      return notification.error({
        message: "Create Product",
        description: result.message,
      });
    }
    notification.success({
      message: "Create Product",
      description: "Success",
    });
    setSubmitBtn(false);
  };

  const handleChenageInputVideo = (e) => {
    const _video = form.getFieldValue("video");
    setVideo(_video);
  };

  return (
    <Card style={{ margin: "0.5rem" }}>
      <Typography.Title level={3}>Create Product</Typography.Title>
      <Form form={form} name="Create_Product" onFinish={onFinish} labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
        <Form.Item label="Name" name="name" rules={[{ required: true, message: "Please input your username!" }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Title" name="title">
          <Input />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please input your description!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Brand" name="brand" rules={[{ required: true, message: "Please input your Brand!" }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Category"
          name="category"
          rules={[{ required: true, message: "Please input your Category!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Count In Stock"
          name="countInStock"
          rules={[{ required: true, message: "Please input your Count In Stock!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Price" name="price" rules={[{ required: true, message: "Please input your price!" }]}>
          <Input />
        </Form.Item>
        <Row>
          <Col lg={{ span: 18, offset: 6 }}>
            <Upload
              listType="picture-card"
              fileList={pictures.fileList}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {pictures.fileList.length >= 7 ? null : uploadButton}
            </Upload>
          </Col>
        </Row>
        <Modal visible={pictures.previewVisible} title={pictures.previewTitle} footer={null} onCancel={handleCancel}>
          <img alt="example" style={{ width: "100%" }} src={pictures.previewImage} />
        </Modal>

        <Form.Item label="Video" name="video">
          <Input onChange={handleChenageInputVideo} />
        </Form.Item>
        <Row>
          <Col xs={{ span: 18, offset: 6 }}>
            {video && <ReactPlayer url={video} style={{ marginBottom: "1rem" }} width={"100%"} height={500} />}
          </Col>
        </Row>

        <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
          <Button loading={submitBtn} disabled={submitBtn} block type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default CreateProductPage;
