import React from "react";
import { useState, useEffect } from "react";
import Spinner from "../common/Spinner";
import Product from "./Product";
import jsonData from '../../data/productdata.json'

export default function Home({ setSearch, search }) {
  const [items, setItems] = useState([])
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true)

  const handleSearch = () => {
    const trimmedQuery = search.trim();
    if (trimmedQuery === '') {
      /* If the search query is empty, show all products */
      setItems(jsonData);
      setError('');
    } else {
      /* Filter products based on the search query */
      const filteredProducts = jsonData.filter(product =>
        product?.category?.name.toLowerCase().includes(trimmedQuery.toLowerCase())
      );
      if (filteredProducts.length > 0) {
        setItems(filteredProducts);
        setError('');
      } else {
        /* No matching products found for the search query */
        setItems([]);
        setError('No products found for the search query.');
      }
    }
  };
  
  useEffect(() => {
      handleSearch()
      setLoading(false)
  },[search])
  
  return (
    <div>
      { loading ? <Spinner /> : items.length > 0 ? (
        <div className="grid max-w-6xl gap-5 p-6 mx-auto xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-8 my-7 ">
          {items.map((items) => {
              return <Product key={items.id} items={items} />;
            })}
        </div>
      ) : ( 
        <div className="flex items-center justify-center pt-24">
          <p className="text-lg font-medium">{error}</p>
        </div>
      )}
    </div>
  );
}
