import { Card, Row, Col, Table, Button, Select, Input } from "antd";
import React, { FC } from "react";
import NCard from "../../../components/common/n-card";
import { useUsersContext } from "../../../context/users.context";

const UsersPage: FC = () => {
  const { users } = useUsersContext();

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
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Action",
      width: 10,
      key: "operation",

      render: () => {
        return (
          <Select placeholder="Operation" style={{ width: "100%" }}>
            <Select.Option value="View">View</Select.Option>
            <Select.Option value="Edit">Edit</Select.Option>
            <Select.Option value="Delete">Delete</Select.Option>
          </Select>
        );
      },
    },
  ];
  return (
    <>
      <NCard>
        <Row style={{ marginBottom: "0.5rem" }}>
          <Col xs={12}>
            <Input.Search enterButton />
          </Col>
          <Col xs={12}>
            <Row justify="end">
              <Button type="primary">CREATE</Button>
            </Row>
          </Col>
        </Row>
        <Table bordered dataSource={users} columns={columns} />
      </NCard>
    </>
  );
};

export default UsersPage;
