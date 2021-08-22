import { Col, Row, Typography } from "antd";
import React, { FC } from "react";
import Banner from "../components/home/banner";
import ProductCard from "../components/product/product-card";
import { useProductsContext } from "../context/products.context";

const HomePage: FC = () => {
  const { products } = useProductsContext();
  return (
    <div style={{ maxWidth: 1200, marginLeft: "auto", marginRight: "auto" }}>
      <Banner />

      <div style={{ padding: "0.5rem" }}>
        <Typography.Title level={3}>False Sale</Typography.Title>
        <Row gutter={[16, 16]} style={{ marginBottom: "1rem" }}>
          {products?.map((product) => {
            return (
              <Col xs={6}>
                <ProductCard product={product} />
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
};

export default HomePage;
