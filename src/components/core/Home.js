import React from "react";
import { useState, useEffect } from "react";
import Spinner from "../common/Spinner";
import Product from "./Product";

export default function Home({ setSearch, search }) {
  const API_URL = "https://fakestoreapi.com/products";
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);

  async function fetchProductData() {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setItems(data);
      console.log(data);
    } catch (error) {
      console.log("Error in api", error);
      setItems([]);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchProductData();
  }, [search]);

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : items.length > 0 ? (
        <div className="grid max-w-6xl gap-5 p-6 mx-auto xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-8 my-7 ">
          {items
            .filter((item) => {
              return search.toLowerCase() === ""
                ? item
                : item.title.toLowerCase().includes(search);
            })
            .map((items) => {
              return <Product key={items.id} items={items} />;
            })}
        </div>
      ) : (
        <div className="flex items-center justify-center pt-24">
          <p className="text-lg font-medium">No products found</p>
        </div>
      )}
    </div>
  );
}
