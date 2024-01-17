import React, { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { add, addToCart, remove } from '../slices/cartSlice';
import toast from 'react-hot-toast';
import ReactStarsRating from 'react-awesome-stars-rating';
import jsonData from '../data/productdata.json'

function SingleItem() {
   
    const dispatch = useDispatch();
    const {id} = useParams()
    const singleItem = useMemo(() => jsonData.find(item => item.id ===  parseInt(id)) ,[id])
    const { cart } = useSelector((state) => state);
    const { token } = useSelector((state) => state.auth)
    const number = useMemo(() => Math.random()*5 ,[]) 
    const [mainImg, setMainImg] = useState(singleItem?.images?.[0])

    const addToCart = () => {
      if (token) {
         toast.success('Item added to Cart');
        dispatch(add(singleItem));
      }else{
         toast.error('Login to add an item to the Cart');      
      }
    }
  
  return (
    <section className="max-w-6xl mx-auto text-gray-600 body-font">
    <div className="px-5">
      <div className="single_container">
          <div className="flex flex-row gap-2 image_container">
            <div className='smallImages_container'>
            {
                 singleItem?.images?.map((img)=> (
                   <div key={img.id} className="small_image">
                        <img alt="Product image" loading='lazy' className="object-cover w-full h-full rounded-sm" src={img} onClick={() => setMainImg(img)}/>
                    </div>
                ))
            }
            </div>
               <img src={mainImg} alt="Product image" className='singleImg' />
          </div>
        <div className='singleItem_content'>
          <h2 className="text-sm tracking-widest text-gray-500 uppercase title-font">{singleItem?.category?.name}</h2>
          <h1 className="mb-1 text-3xl font-medium text-gray-900 title-font">{singleItem.title}</h1>
          <div className="flex mb-4">
            <span className="flex items-center ">
              <ReactStarsRating value={number}  size={20} isHalf={true}  primaryColor={'#6366f1'} secondaryColor={"#fff"} isEdit={false} className='flex' />
             <span className="ml-5 text-gray-600">{Math.floor(number)} Reviews</span>
            </span>
            <span className="flex py-2 pl-3 ml-3 border-l-2 border-red-900 space-x-2s">
              <div className="text-gray-500">
                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
                     
              </div>
              <a className="text-gray-500">
                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                </svg>
              </a>
              <a className="text-gray-500">
                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                </svg>
              </a>
            </span>
          </div>
          <div>
          <p className="">{singleItem.description}</p>
       
          <div className="flex items-center gap-5 mt-5">
            <span className="text-2xl font-medium text-gray-900 title-font">&#8377;{singleItem.price}</span>
            <div>
              {cart.some((p) => p.id == singleItem.id) ?
              (
                <div className="text-white bg-indigo-500 border-0 cursor-pointer select-none focus:outline-none hover:bg-indigo-600 btn">        
                <button 
                  onClick={() => toast.error("Item added already")} 
                  
                 >
                    Item Added
                </button>
                </div>
                
              ) : (
                <div className="text-white bg-indigo-500 border-0 cursor-pointer select-none focus:outline-none hover:bg-blue-900 btn">
                  
                <button 
                  onClick={addToCart} 
                 >
                   Add To Cart
                </button>
                </div>
              )
              
            }
            </div>
           
          </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  )
}

export default SingleItem
