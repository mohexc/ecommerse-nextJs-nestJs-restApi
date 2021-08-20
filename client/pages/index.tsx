import { Col, Row, Typography } from "antd";
import React, { FC } from "react";
import Banner from "../components/home/banner";
import Categories from "../components/home/categories";
import ProductCard from "../components/product/product-card";

const HomePage: FC = () => {
  return (
    <div style={{ maxWidth: 1200, marginLeft: "auto", marginRight: "auto" }}>
      <Banner />
      <Categories />
      <div style={{ padding: "0.5rem" }}>
        <Typography.Title level={3}>False Sale</Typography.Title>
        <Row gutter={[16, 16]} style={{ marginBottom: "1rem" }}>
          {Array.from(Array(6).keys()).map((element) => (
            <Col xs={4}>
              <ProductCard />
            </Col>
          ))}
        </Row>

        <Typography.Title level={3}>Most Popular</Typography.Title>
        <Row gutter={[16, 16]} style={{ marginBottom: "1rem" }}>
          {Array.from(Array(18).keys()).map((element) => (
            <Col xs={4}>
              <ProductCard />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default HomePage;
