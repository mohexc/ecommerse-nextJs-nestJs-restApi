import { Carousel } from "antd";
import React from "react";
import { FC } from "react";
import ReactPlayer from "react-player";

interface PropInterface {
  images: string[];
  video: string;
}

const ProductSlide: FC<PropInterface> = ({ images, video }) => {
  const onChange = (v) => {
    console.log();
  };

  return (
    <div>
      <Carousel autoplay afterChange={onChange}>
        {images.map((image) => (
          <img src={image} style={{ width: "100%", height: "300px", objectFit: "cover" }} />
        ))}
        {video && <ReactPlayer url={video} width="100%" />}
      </Carousel>
      <div style={{ margin: "0.5rem 0.5rem 0.5rem 0" }}>
        {images.map((image) => (
          <span style={{ margin: "1rem 0.5rem 0.5rem 0" }}>
            <img src={image} style={{ height: 100 }} />
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProductSlide;
