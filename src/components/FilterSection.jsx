import React from "react";
import { getData } from "../context/DataContext";

const FilterSection = ({
  search,
  setSearch,
  category,
  setCategory,
  brand,
  setBrand,
  priceRange,
  setPriceRange,
  handleCategoryChange,
  handleBrandChange,
}) => {
  const { categoryOnlyData, brandOnlyData } = getData();

  const safeBrands =
    brandOnlyData?.filter(
      (item) => typeof item === "string" && item.trim() !== "",
    ) || [];

  return (
    <div className="bg-gray-100 mt-10 p-4 rounded-md h-max hidden md:block">
      {/* Search */}
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="bg-white p-2 rounded-md border-gray-400 border-2 w-full"
      />

      {/* Category */}
      <h1 className="mt-5 font-semibold text-xl">Category</h1>
      <div className="flex flex-col gap-2 mt-3">
        {/* ALL */}
        <label className="flex gap-2 items-center cursor-pointer">
          <input
            type="radio"
            name="category"
            value="All"
            checked={category === "All"}
            onChange={(e) => setCategory(e.target.value)}
          />
          <span className="uppercase">All</span>
        </label>

        {categoryOnlyData
          ?.filter((item) => item !== "All")
          .map((item) => (
            <label
              key={item}
              className="flex gap-2 items-center cursor-pointer"
            >
              <input
                type="radio"
                name="category"
                value={item}
                checked={category === item}
                onChange={(e) => setCategory(e.target.value)}
              />
              <span className="uppercase">{item}</span>
            </label>
          ))}
      </div>

      {/* Brand */}
      <h1 className="mt-5 font-semibold text-xl mb-3">Brand</h1>
      <select
        value={brand}
        onChange={handleBrandChange}
        className="bg-white w-full p-2 border-gray-200 border-2 rounded-md"
      >
        <option value="All">ALL</option>
        {safeBrands.map((item) => (
          <option key={item} value={item}>
            {item.toUpperCase()}
          </option>
        ))}
      </select>

      {/* Price Range */}
      <h1 className="mt-5 font-semibold text-xl">Price Range</h1>
      <div className="flex flex-col gap-2">
        <label>
          Price Range : ${priceRange[0]} - ${priceRange[1]}
        </label>
        <input
          type="range"
          min="0"
          max="5000"
          value={priceRange[1]}
          onChange={(e) =>
            setPriceRange([priceRange[0], Number(e.target.value)])
          }
        />
      </div>

      {/* Reset */}
      <button
        className="bg-red-500 text-white rounded-md px-3 py-1 mt-5 cursor-pointer w-full"
        onClick={() => {
          setSearch("");
          setCategory("All");
          setBrand("All");
          setPriceRange([0, 5000]);
        }}
      >
        Reset Filters
      </button>
    </div>
  );
};

export default FilterSection;
