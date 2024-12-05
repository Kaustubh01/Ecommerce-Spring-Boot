import React, { useContext, useState } from "react";
import "../../style/store/sidebar.css";
import ProductCategoryContext from "../../contexts/ProductCategoryContext";

function Sidebar() {
    const { productCategories, loading, error } = useContext(ProductCategoryContext);
    const [checkedCategories, setCheckedCategories] = useState([]);

    const handleCategoryCheckboxes = (event) => {
        const { name, checked } = event.target;
        setCheckedCategories((prev) =>
            checked
                ? [...prev, name] // Add the category if checked
                : prev.filter((category) => category !== name) // Remove the category if unchecked
        );
    };

    if (loading) return <div className="loading-message">Loading...</div>;
    if (error) return <div className="error-message">Error: {error.message}</div>;

    return (
        <nav className="sidebar">
            <p className="title">Categories</p>
            {productCategories.length > 0 ? (
                <ul>
                    {productCategories.map((category) => (
                        <li key={category.category} className="category-item">
                            <label className="category-name">
                                {category.category}
                                <input
                                    className="category-checkbox"
                                    type="checkbox"
                                    name={category.category}
                                    checked={checkedCategories.includes(category.category)}
                                    onChange={handleCategoryCheckboxes}
                                />
                            </label>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="empty-message">No categories available.</p>
            )}
            <p>Selected Categories: {checkedCategories.join(", ") || "None"}</p>
        </nav>
    );
}

export default Sidebar;
