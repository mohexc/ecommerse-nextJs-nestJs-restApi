import { Col, Row } from "antd";
import { Layout } from "antd";
import React, { FC } from "react";
import { useThemeContext } from "../../context/them.context";

const FootBar: FC = () => {
  const { color } = useThemeContext();
  return (
    <Layout.Footer style={{ background: "#232528", borderTop: `5px solid ${color}` }}>
      <Row gutter={16} style={{ minHeight: 300, color: "white", maxWidth: 1100, margin: "auto" }}>
        <Col xs={6}>Help Center</Col>
        <Col xs={6}>About Shopee</Col>
        <Col xs={6}>Payment method</Col>
        <Col xs={6}>Follow</Col>
      </Row>
    </Layout.Footer>
  );
};

export default FootBar;
