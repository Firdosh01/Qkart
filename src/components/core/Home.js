import React from "react";
import { useState, useEffect } from "react";
import Spinner from "../common/Spinner";
import Product from "./Product";
import { BiUpsideDown } from "react-icons/bi";

export default function Home({ setSearch, search }) {
  const API_URL = "https://fakestoreapi.com/products";
  const [loading, setLoading] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [errMsg, setErrMsg] = useState("");

  async function fetchProductData() {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      if (data && data.length > 0) {
        setAllProducts(data);
        setDisplayedProducts(data);
        setErrMsg("");
      } else {
        setAllProducts([]);
        setDisplayedProducts([]);
        setErrMsg("No products found");
      }
    } catch (error) {
      setErrMsg("Error fetching products. Please try again.");
      setAllProducts([]);
      setDisplayedProducts([]);
    }
    setLoading(false);
  }

  const filterProducts = (search) => {
    const filtered = allProducts.filter((product) =>
      product.title.toLowerCase().includes(search.toLowerCase())
    );
    setDisplayedProducts(filtered);
    setSearch(search);
  };

  useEffect(() => {
    fetchProductData();
  }, []);

  useEffect(() => {
    filterProducts(search);
  }, [search]);

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : displayedProducts.length > 0 ? (
        <div className="grid max-w-6xl gap-5 p-6 mx-auto xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-8 my-7 ">
          {displayedProducts.map((items) => {
            return <Product key={items.id} items={items} />;
          })}
        </div>
      ) : (
        !errMsg && (
          <div>
            <p className="flex items-center justify-center gap-1 mt-24 text-center">No product found <BiUpsideDown /></p>
          </div>
        )
      )}
      <div>{errMsg && <p className="flex items-center justify-center gap-1 mt-24 text-center">{errMsg}</p>}</div>
    </div>
  );
}
