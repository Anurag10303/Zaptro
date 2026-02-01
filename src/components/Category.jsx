import React from "react";
import { getData } from "../context/DataContext";
import { useNavigate } from "react-router-dom";

const Category = () => {
  const navigate = useNavigate();
  const { categoryOnlyData } = getData();

  return (
    <div className="bg-[#101829]">
      <div className="max-w-7xl mx-auto flex flex-wrap gap-4 items-center justify-center md:justify-around py-7 px-4">
        {categoryOnlyData
          .filter((cat) => cat !== "All")
          .map((category) => (
            <button
              key={category}
              className="uppercase bg-gradient-to-r from-red-500 to-purple-500 text-white px-3 py-1 rounded-md cursor-pointer"
              onClick={() =>
                navigate(`/category/${encodeURIComponent(category)}`)
              }
            >
              {category}
            </button>
          ))}
      </div>
    </div>
  );
};

export default Category;
