import { Card, Carousel, Col, Row } from "antd";
import React, { FC } from "react";

const Banner: FC = () => {
  const onChange = (value) => {
    console.log(value);
  };

  const contentStyle = {
    height: "300px",
    color: "#fff",
    lineHeight: "160px",
    background: "#364d79",
  };

  return (
    <div style={{ margin: "0.5rem" }}>
      <Row gutter={12}>
        <Col xs={16}>
          <Carousel afterChange={onChange}>
            <div>
              <h3 style={{ ...contentStyle, textAlign: "center" }}>1</h3>
            </div>
            <div>
              <h3 style={{ ...contentStyle, textAlign: "center" }}>2</h3>
            </div>
            <div>
              <h3 style={{ ...contentStyle, textAlign: "center" }}>3</h3>
            </div>
            <div>
              <h3 style={{ ...contentStyle, textAlign: "center" }}>4</h3>
            </div>
          </Carousel>
        </Col>
        <Col xs={8}>
          <Card style={{ height: 150 }}></Card>
          <Card style={{ height: 150 }}></Card>
        </Col>
      </Row>
    </div>
  );
};

export default Banner;
