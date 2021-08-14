import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Card, Row, Col, Table, Button, Select, Input, Modal } from "antd";
import { useRouter } from "next/router";
import React, { FC } from "react";
import NCard from "../../../components/common/n-card";
import { useUsersContext } from "../../../context/users.context";

const UsersPage: FC = () => {
  const { users, deleteUser } = useUsersContext();
  const route = useRouter();
  const handlerSelect = (id: number, e: any) => {
    e === "View" && route.push(`/admin/users/${id}`);
    e === "Delete" &&
      Modal.confirm({
        title: "Confirm",
        icon: <ExclamationCircleOutlined />,
        content: "Are you sure deleted",
        onOk: () => deleteUser(id),
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
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Active",
      dataIndex: "isActive",
      key: "isActive",
      render: (record) => `${record}`,
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
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
      <Row style={{ marginBottom: "0.5rem" }}>
        <Col xs={12}>
          <Input.Search enterButton />
        </Col>
        <Col xs={12}>
          <Row justify="end">
            <Button onClick={() => route.push("/admin/users/create")} type="primary">
              CREATE
            </Button>
          </Row>
        </Col>
      </Row>
      <Table rowKey={(user) => user.id} bordered dataSource={users} columns={columns} />
    </NCard>
  );
};

export default UsersPage;
