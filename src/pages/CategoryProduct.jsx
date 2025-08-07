import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import loading from "../assets/Loading4.webm";
import { ChevronLeft } from "lucide-react";
import ProductListView from "../components/ProductListView";

const CategoryProduct = () => {
  const [searchData, setSearchData] = useState([]);
  const params = useParams();
  const category = params.category;
  const navigate = useNavigate();
  const filterData = async () => {
    try {
      const res = await axios.get(
        `https://fakestoreapi.in/api/products/category?type=${category}`
      );
      const data = res.data.products;
      setSearchData(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    filterData();
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      {searchData.length > 0 ? (
        <div className=" max-w-6xl mx-auto mt-10 mb-10 px-4">
          <button
            className=" bg-gray-800 text-white rounded-md cursor-pointer mb-5 px-3 py-1 flex gap-1 items-center"
            onClick={() => navigate("/")}
          >
            <ChevronLeft /> Back
          </button>
          {searchData.map((product, index) => {
            return <ProductListView key={index} product={product} />;
          })}
        </div>
      ) : (
        <div className=" flex items-center justify-center h-[400px]">
          <video muted autoPlay loop>
            <source src={loading} type="video/webm" />
          </video>
        </div>
      )}
    </div>
  );
};

export default CategoryProduct;
