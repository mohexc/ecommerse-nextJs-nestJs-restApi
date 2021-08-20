import { Card, Col, Divider, Row } from "antd";
import React from "react";
import { FC } from "react";

const ProductsPage: FC = () => {
  return (
    <div style={{ maxWidth: 1200, margin: "auto" }}>
      <Row>
        <Col xs={6}>
          <Card>
            <h4>
              <b>ALL CATEGORIES</b>
            </h4>
            <p>Electronic</p>

            <Divider />
            <h4>
              <b>FILTER</b>
            </h4>
          </Card>
        </Col>
        <Col xs={18}></Col>
      </Row>
    </div>
  );
};

export default ProductsPage;
