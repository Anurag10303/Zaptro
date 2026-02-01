import React, { useEffect, useMemo, useState } from "react";
import { getData } from "../context/DataContext";
import FilterSection from "../components/FilterSection";
import Loading from "../assets/Loading4.webm";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import Lottie from "lottie-react";
import notfound from "../assets/notfound.json";
import MobileFilter from "../components/MobileFilter";

const Products = () => {
  const { data } = getData();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [page, setPage] = useState(1);
  const [openFilter, setOpenFilter] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setPage(1);
    setOpenFilter(false);
  };

  const handleBrandChange = (e) => {
    setBrand(e.target.value);
    setPage(1);
    setOpenFilter(false);
  };

  const pageHandler = (selectedPage) => {
    setPage(selectedPage);
    window.scrollTo(0, 0);
  };

  // 🔹 Memoized filtering
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchesSearch = item.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory = category === "All" || item.category === category;

      const matchesBrand = brand === "All" || item.brand === brand;

      const matchesPrice =
        item.price >= priceRange[0] && item.price <= priceRange[1];

      return matchesSearch && matchesCategory && matchesBrand && matchesPrice;
    });
  }, [data, search, category, brand, priceRange]);

  const dynamicPage = Math.ceil(filteredData.length / 8);

  return (
    <div className="max-w-6xl mx-auto px-4 mb-10">
      <MobileFilter
        openFilter={openFilter}
        setOpenFilter={setOpenFilter}
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        brand={brand}
        setBrand={setBrand}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        handleCategoryChange={handleCategoryChange}
        handleBrandChange={handleBrandChange}
      />

      {data.length > 0 ? (
        <div className="flex gap-8">
          <FilterSection
            search={search}
            setSearch={setSearch}
            category={category}
            setCategory={setCategory}
            brand={brand}
            setBrand={setBrand}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            handleCategoryChange={handleCategoryChange}
            handleBrandChange={handleBrandChange}
          />

          {filteredData.length > 0 ? (
            <div className="flex flex-col items-center">
              <div className="grid md:grid-cols-4 grid-cols-2 md:gap-7 gap-2 mt-10">
                {filteredData.slice(page * 8 - 8, page * 8).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              <Pagination
                pageHandler={pageHandler}
                page={page}
                dynamicPage={dynamicPage}
              />
            </div>
          ) : (
            <div className="flex justify-center items-center md:h-[600px] md:w-[900px] mt-10">
              <Lottie animationData={notfound} />
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-center h-[400px]">
          <video muted autoPlay loop>
            <source src={Loading} type="video/webm" />
          </video>
        </div>
      )}
    </div>
  );
};

export default Products;
