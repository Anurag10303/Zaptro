import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ProductListView = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  return (
    <div className=" space-y-4 rounded-md mt-2">
      <div className=" bg-gray-100 flex gap-7 items-center p-2 rounded-md">
        <img
          src={product.image}
          alt={product.title}
          className=" md:h-60 md:w-60 h-25 w-25 rounded-md cursor-pointer"
          onClick={() => navigate(`/product/${product.id}`)}
        />
        <div className=" space-y-2">
          <h1 className=" font-bold md:text-xl text-lg line-clamp-3 hover:text-red-400 w-[220px] md:w-full">
            {product.title}
          </h1>
          <p className=" font-semibold flex items-center md:text-lg text-sm">
            $<span className=" md:text-4xl text-xl">{product.price}</span>(
            {product.discount}% off)
          </p>
          <p className="text-sm">
            FREE delivery <span className="font-semibold">Fri, 18 Apr</span>{" "}
            <br />
            Or fastest delivery{" "}
            <span className="font-semibold">Tomorrow, 17 Apr</span>
          </p>
          <button
            className=" bg-red-500 text-white px-3 py-1 rounded-md cursor-pointer"
            onClick={() => addToCart(product)}
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductListView;
