import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create the Product Context
export const ProductContext = createContext();

// Create the Provider Component
export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0); 
  const [hasMore, setHasMore] = useState(true); 

 
  const fetchProducts = async (pageNumber = 0) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8080/api/products?page=${pageNumber}&size=10`);
      const { content, last } = response.data;

      setProducts((prevProducts) => [...prevProducts, ...content]);
      setHasMore(!last); 
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  const loadMore = () => {
    if (hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <ProductContext.Provider value={{ products, loading, error, hasMore, loadMore }}>
      {children}
    </ProductContext.Provider>
  );
};
