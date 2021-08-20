import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Button, Card, Col, Input, Row, Select, Table, Modal, Typography } from "antd";
import { useRouter } from "next/router";
import React, { FC } from "react";
import ReactPlayer from "react-player";
import NCard from "../../../components/common/n-card";
import { useProductsContext } from "../../../context/products.context";

// main
const ProductsPage: FC = () => {
  const { products, deleteProduct } = useProductsContext();
  const route = useRouter();

  const handlerSelect = (id: string, e: any) => {
    e === "View" && route.push(`/admin/products/${id}`);
    e === "Delete" &&
      Modal.confirm({
        title: "Confirm",
        icon: <ExclamationCircleOutlined />,
        content: "Are you sure deleted",
        onOk: () => deleteProduct(id),
        okText: "Delete",
        cancelText: "Cancle",
      });
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "image",
      dataIndex: "images",
      key: "images",
      render: (record) => {
        return <img src={record[0]} height={50} />;
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Action",
      width: 10,
      key: "operation",

      render: (record) => {
        return (
          <Select
            allowClear
            placeholder="Operation"
            style={{ width: "100%" }}
            onSelect={(e) => handlerSelect(record.id, e)}
          >
            <Select.Option value="View">View & EDIT</Select.Option>
            <Select.Option value="Delete">Delete</Select.Option>
          </Select>
        );
      },
    },
  ];

  return (
    <NCard>
      <Typography.Title level={3}>Products</Typography.Title>
      <Row style={{ marginBottom: "0.5rem" }}>
        <Col span={12}>
          <Input.Search placeholder="Search Product" enterButton />
        </Col>
        <Col span={12}>
          <Row justify="end">
            <Button onClick={() => route.push("/admin/products/create")} type="primary">
              CREATE
            </Button>
          </Row>
        </Col>
      </Row>
      <Table rowKey={(record) => record.description} bordered columns={columns} dataSource={products} />
    </NCard>
  );
};

export default ProductsPage;
