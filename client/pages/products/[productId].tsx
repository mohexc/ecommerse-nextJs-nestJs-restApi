import { Row, Col, Carousel, Rate, Button } from "antd";
import { useRouter } from "next/router";
import React, { FC, useEffect } from "react";
import { useState } from "react";
import ProductSlide from "../../components/product/poduct-slide";
import { useAuthContext } from "../../context/auth.context";
import { useCartContext } from "../../context/carts.context";
import { Product } from "../../context/products.context";

const ProductDetailPage: FC = () => {
  const route = useRouter();
  const { productId } = route.query;
  const { httpRequests } = useAuthContext();
  const [product, setProduct] = useState<Product | undefined>();
  const { addCartItem } = useCartContext();

  useEffect(() => {
    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const fetchProduct = async () => {
    try {
      const { data } = await httpRequests.get(`/product/${productId}`);
      setProduct(data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!product) {
    return <p>Loading...</p>;
  }
  return (
    <div style={{ width: 1200, margin: "auto", paddingTop: "1rem" }}>
      <Row gutter={16}>
        <Col xs={12}>
          <ProductSlide images={product.images} video={product.video} />
        </Col>
        <Col xs={12} style={{ position: "relative" }}>
          <h4>{product.name}</h4>
          <p>Brand : {product.brand}</p>
          <p>Category : {product.category}</p>
          <p>{product.description}</p>

          <div style={{ position: "absolute", bottom: 10, width: "100%" }}>
            <Row align="middle">
              <Rate defaultValue={5} />
              <span style={{ margin: "0 1rem " }}>|</span>
              <span>20000 Rating</span>
              <span style={{ margin: "0 1rem " }}>|</span>
              <span>345 sales</span>
            </Row>
            <h4>${product.price}</h4>
            <Button
              type="primary"
              block
              onClick={() => {
                addCartItem(product);
              }}
            >
              Add to Cart
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ProductDetailPage;
