import { Card } from "antd";
import React, { FC } from "react";

const NCard: FC = ({ children }) => {
  return <Card style={{ margin: "0.5rem", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}>{children}</Card>;
};

export default NCard;
