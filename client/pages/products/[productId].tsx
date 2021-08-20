import { Row, Col } from "antd";
import React, { FC } from "react";

const ProductDetailPage: FC = () => {
  return (
    <Row>
      <Col xs={6}>
        <h3>
          <b>ALL CATEGORIES</b>
        </h3>
      </Col>
      <Col xs={18}></Col>
    </Row>
  );
};

export default ProductDetailPage;
