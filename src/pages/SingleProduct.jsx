import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../assets/Loading4.webm";
import Breadcrums from "../components/Breadcrums";
import { IoCartOutline } from "react-icons/io5";
import { useCart } from "../context/CartContext";

const SingleProduct = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [singleProduct, setSingleProduct] = useState(null);

  const getSingleProduct = async () => {
    try {
      const res = await axios.get(`https://dummyjson.com/products/${id}`);
      setSingleProduct(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, [id]);

  if (!singleProduct) {
    return (
      <div className="flex items-center justify-center h-screen">
        <video muted autoPlay loop>
          <source src={Loading} type="video/webm" />
        </video>
      </div>
    );
  }

  const originalPrice = Math.round(
    singleProduct.price +
      (singleProduct.price * singleProduct.discountPercentage) / 100,
  );

  return (
    <div className="px-4 pb-4 md:px-0">
      <Breadcrums title={singleProduct.title} />

      <div className="max-w-6xl mx-auto md:p-6 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Image */}
        <div className="w-full">
          <img
            src={singleProduct.thumbnail}
            alt={singleProduct.title}
            className="rounded-2xl w-full object-cover"
          />
        </div>

        {/* Details */}
        <div className="flex flex-col gap-6">
          <h1 className="md:text-3xl text-xl text-gray-800 font-bold">
            {singleProduct.title}
          </h1>

          <div className="text-gray-700">
            {singleProduct.brand.toUpperCase()} /
            {singleProduct.category.toUpperCase()}
          </div>

          <p className="text-xl text-red-500 font-bold flex items-center gap-2 flex-wrap">
            ${singleProduct.price}
            <span className="line-through text-gray-700">${originalPrice}</span>
            <span className="bg-red-500 text-white px-4 py-2 rounded-full">
              {Math.round(singleProduct.discountPercentage)}% Discount
            </span>
          </p>

          <p className="text-gray-600">{singleProduct.description}</p>

          <div className="flex gap-4 mt-4">
            <button
              className="px-6 flex gap-2 py-2 text-lg bg-red-500 text-white rounded-md cursor-pointer"
              onClick={() => addToCart(singleProduct)}
            >
              <IoCartOutline className="h-6 w-6" /> Add To Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
