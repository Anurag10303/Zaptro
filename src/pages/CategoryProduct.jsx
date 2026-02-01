import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import loading from "../assets/Loading4.webm";
import { ChevronLeft } from "lucide-react";
import ProductListView from "../components/ProductListView";

const CategoryProduct = () => {
  const [products, setProducts] = useState([]);
  const { category } = useParams();
  const navigate = useNavigate();

  const fetchCategoryProducts = async () => {
    try {
      const res = await axios.get(
        `https://dummyjson.com/products/category/${category}`,
      );
      setProducts(res.data.products); // ✅ correct
    } catch (error) {
      console.error("Failed to fetch category products:", error);
    }
  };

  useEffect(() => {
    fetchCategoryProducts();
    window.scrollTo(0, 0);
  }, [category]);

  return (
    <div>
      {products.length > 0 ? (
        <div className="max-w-6xl mx-auto mt-10 mb-10 px-4">
          <button
            className="bg-gray-800 text-white rounded-md cursor-pointer mb-5 px-3 py-1 flex gap-1 items-center"
            onClick={() => navigate("/")}
          >
            <ChevronLeft /> Back
          </button>

          {products.map((product) => (
            <ProductListView key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-[400px]">
          <video muted autoPlay loop>
            <source src={loading} type="video/webm" />
          </video>
        </div>
      )}
    </div>
  );
};

export default CategoryProduct;
