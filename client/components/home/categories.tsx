import { Card, Col, Row, Typography } from "antd";
import React from "react";
import { FC } from "react";

const Categories: FC = () => {
  return (
    <div style={{ padding: "0.5rem" }}>
      <Typography.Title level={3}>Categories</Typography.Title>
      <Row>
        {Array.from(Array(24).keys()).map((element) => (
          <Col xs={2}>
            <Card style={{ height: 120 }}></Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Categories;
