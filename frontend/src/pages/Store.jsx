import React, { useContext, useEffect, useState } from 'react';
import Card from '../components/Card';
import { ProductContext } from '../contexts/ProductsContext';
import { ProductCategoryProvider } from '../contexts/ProductCategoryContext';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';
import '../style/store.css';
import Sidebar from '../components/Store/Sidebar';

function Store() {
  const { products, loading, error, hasMore, loadMore } = useContext(ProductContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchedProducts, setSearchedProducts] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);

  useEffect(() => {
    const fetchSearchedProducts = async () => {
      if (searchQuery === '') {
        setSearchedProducts([]); 
      }

      setSearchLoading(true);
      try {
        const response = await axios.get(`http://localhost:8080/api/products/search/${searchQuery}`);
        setSearchedProducts(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setSearchLoading(false);
      }
    };

    fetchSearchedProducts();
  }, [searchQuery]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  if (loading && products.length === 0) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;


  return (
    <ProductCategoryProvider>
    <div className="store">

      <div className="search-container">
        <i className="fas fa-search search-icon"></i>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search for products"
          className="search-input"
        />
      </div>
      <div className="container">

        <Sidebar/>

        <div className="products">
          {searchQuery === '' ? (
            <InfiniteScroll
              dataLength={products.length}
              next={loadMore}
              hasMore={hasMore}
              loader={<p>Loading more products...</p>}
              endMessage={<p>No more products to display.</p>}
            >
              <ul className="products-list">
                {products.map((product, index) => (
                  <li key={index} className="product-item">
                    <Card name={product.product} price={product.sale_price} rating={product.rating} />
                  </li>
                ))}
              </ul>
            </InfiniteScroll>
          ) : (
            <ul className="products-list">
              {searchLoading ? (
                <li>Loading search results...</li>
              ) : searchedProducts.length > 0 ? (
                searchedProducts.map((product, index) => (
                  <li key={index} className="product-item">
                    <Card name={product.product} price={product.sale_price} rating={product.rating} />
                  </li>
                ))
              ) : (
                <li>No products found</li>
              )}
            </ul>
          )}
        </div>

      </div>

    </div>
    </ProductCategoryProvider>
  );
}

export default Store;
