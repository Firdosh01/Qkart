import React from 'react'
import { Link } from 'react-router-dom';

export default function Product({ items }) {

  return (
    <div>
      <Link to={`/product/${items.id}`} className="w-full p-4 lg:w-1/4 md:w-1/2">
        <a className="relative block h-48 overflow-hidden rounded">
          <img alt="ecommerce" className="block object-cover object-center w-full h-full" src={items.images[0]} />
        </a>
        <div className="flex items-center justify-between mt-4">
          <div className="">
            <h3 className="mb-1 text-xs tracking-widest text-gray-500 uppercase title-font">{items?.category?.name}</h3>
          <h2 className="text-lg font-medium text-gray-900 title-font">{items.title.split(" ").slice(0,4).join(" ") + "..."}</h2>
          <p className="mt-1">&#8377;{items.price}</p>
          </div>
          <div>
            <button className="px-5 py-2 text-white bg-[#00A278] rounded-lg">Cart</button>
          </div>
        </div>
      </Link>
    </div>
  )
}
