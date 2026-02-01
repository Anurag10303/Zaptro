import React from "react";
import { getData } from "../context/DataContext";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import Category from "./Category";

const Carousel = () => {
  const { data } = getData();
  const navigate = useNavigate(); // ✅ add this

  const SamplePrevArrow = ({ className, style, onClick }) => (
    <div
      onClick={onClick}
      className={`arrow ${className}`}
      style={{ zIndex: 3 }}
    >
      <AiOutlineArrowLeft
        style={{
          ...style,
          display: "block",
          borderRadius: "50px",
          background: "#f53347",
          color: "white",
          position: "absolute",
          padding: "2px",
          left: "50px",
        }}
      />
    </div>
  );

  const SampleNextArrow = ({ className, style, onClick }) => (
    <div onClick={onClick} className={`arrow ${className}`}>
      <AiOutlineArrowRight
        style={{
          ...style,
          display: "block",
          borderRadius: "50px",
          background: "#f53347",
          color: "white",
          position: "absolute",
          padding: "2px",
          right: "50px",
        }}
      />
    </div>
  );

  const settings = {
    dots: false,
    autoplay: true,
    autoplaySpeed: 2000,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: false,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div>
      <Slider {...settings}>
        {data.slice(0, 7).map((item) => (
          <div
            key={item.id}
            className="bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e]"
          >
            <div className="flex flex-col md:flex-row gap-10 justify-center h-[600px] items-center px-4">
              <div className="md:space-y-6 space-y-3">
                <h3 className="text-red-500 font-semibold text-sm">
                  Powering Your World with the Best in Electronics
                </h3>
                <h1 className="md:text-4xl text-xl font-bold uppercase line-clamp-2 md:w-[500px] text-white">
                  {item.title}
                </h1>
                <p className="md:w-[500px] line-clamp-3 text-gray-400 pr-7">
                  {item.description}
                </p>

                {/* ✅ redirect to products page */}
                <button
                  onClick={() => navigate("/product")}
                  className="bg-gradient-to-r from-red-500 to-purple-500 text-white px-3 py-2 rounded-md cursor-pointer mt-2"
                >
                  Shop Now
                </button>
              </div>

              <div>
                <img
                  src={item.thumbnail || item.images?.[0]}
                  alt={item.title}
                  className="rounded-full w-[450px] object-contain hover:scale-105 transition-all shadow-2xl shadow-red-400"
                />
              </div>
            </div>
          </div>
        ))}
      </Slider>

      <Category />
    </div>
  );
};

export default Carousel;
