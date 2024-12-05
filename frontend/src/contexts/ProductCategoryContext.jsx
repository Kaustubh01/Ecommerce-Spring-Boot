import { createContext, useState, useEffect } from "react";
import axios from "axios";

const ProductCategoryContext = createContext();

export const ProductCategoryProvider = ({ children }) => {
    const [productCategories, setProductCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProductCategories = async () => {
            setLoading(true);
            try {
                const response = await axios.get('http://localhost:8080/api/products/category-counts');
                const categories = Object.entries(response.data).map(([category, numberOfProducts]) => ({
                    category,
                    numberOfProducts,
                }));
                setProductCategories(categories);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProductCategories();
    }, []); // Empty dependency array ensures this runs only once

    return (
        <ProductCategoryContext.Provider value={{ productCategories, loading, error }}>
            {children}
        </ProductCategoryContext.Provider>
    );
};

export default ProductCategoryContext;
