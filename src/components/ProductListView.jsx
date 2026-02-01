import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ProductListView = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  return (
    <div className="space-y-4 rounded-md mt-2">
      <div className="bg-gray-100 flex gap-7 items-center p-4 rounded-md">
        <img
          src={product.thumbnail || product.images?.[0]}
          alt={product.title}
          className="md:h-60 md:w-60 h-32 w-32 rounded-md cursor-pointer object-contain bg-white"
          onClick={() => navigate(`/product/${product.id}`)}
        />

        <div className="space-y-2">
          <h1 className="font-bold md:text-xl text-lg line-clamp-3 hover:text-red-400 md:w-full w-[220px]">
            {product.title}
          </h1>

          <p className="font-semibold flex items-center md:text-lg text-sm">
            $
            <span className="md:text-4xl text-xl">
              {product.price}
            </span>
            <span className="ml-2 text-green-600">
              ({Math.round(product.discountPercentage)}% off)
            </span>
          </p>

          <p className="text-sm text-gray-700">
            FREE delivery <span className="font-semibold">Fri, 18 Apr</span>
            <br />
            Or fastest delivery{" "}
            <span className="font-semibold">Tomorrow, 17 Apr</span>
          </p>

          <button
            className="bg-red-500 text-white px-3 py-1 rounded-md cursor-pointer"
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
