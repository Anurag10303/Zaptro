import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]); // ✅ always an array
  const [loading, setLoading] = useState(false);

  // Fetch all products
  const fetchAllProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://dummyjson.com/products");
      setData(res.data.products || []);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  // Get unique, CLEAN values
  const getUniqueValues = (data, property) => {
    if (!Array.isArray(data)) return ["All"];

    const values = data
      .map((item) => item[property])
      .filter((val) => typeof val === "string" && val.trim().length > 0);

    return ["All", ...new Set(values)];
  };

  const categoryOnlyData = getUniqueValues(data, "category");
  const brandOnlyData = getUniqueValues(data, "brand");

  // Optional: auto-fetch once (recommended)
  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <DataContext.Provider
      value={{
        data,
        loading,
        fetchAllProducts,
        categoryOnlyData,
        brandOnlyData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const getData = () => useContext(DataContext);
