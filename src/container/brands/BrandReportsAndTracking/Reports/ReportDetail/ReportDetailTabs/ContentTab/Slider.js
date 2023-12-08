import ProxyImage from "@components/ProxyImage";
import React from "react";
import { ImPlay2 } from "react-icons/im";
import { Link } from "react-router-dom";
import Slider from "react-slick";

export default function SimpleSlider({ batch, setCurrentSlide }) {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: (index) => {
      const nextIndex = index % batch.length;
      setCurrentSlide(batch[nextIndex]);
    },
  };
  return (
    <Slider {...settings}>
      {batch.map((content) => (
        <div className="relative w-full h-[300px]">
          <ProxyImage
            className="rounded-[8px] w-full h-full"
            alt=""
            url={content.media_pic}
            addCancelToken={() => {}}
          />
          {content.media_url && (
            <Link
              to={content.media_url}
              target="_blank"
              className="absolute inset-0 flex items-center justify-center"
            >
              <ImPlay2 size={60} color="white" />
            </Link>
          )}
        </div>
      ))}
    </Slider>
  );
}
