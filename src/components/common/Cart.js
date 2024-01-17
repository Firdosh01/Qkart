import React from 'react'
import {useSelector } from 'react-redux'
import {useEffect, useState} from 'react'
import { Link } from "react-router-dom"
import CartItem from './CartItem'

export default function Cart() {
    const {cart} = useSelector((state) => state)
    const [totalAmount, setTotalAmount] = useState(0)

    useEffect( () => {
      setTotalAmount( cart.reduce ( (acc, curr) => acc + curr.price,0));
    }, [cart])
    console.log(cart)

  return (
    <div>
        {
            cart.length > 0 ? 
            (

          <div className='flex flex-wrap max-w-6xl gap-16 p-6 mx-auto lg:flex-nowrap'>
            <div className='lg:w-[70%]'>
              {
                cart.map( (item, index) => (
                  <CartItem key={item.id} item={item} itemIndex={index} />
                ))
              }
            </div>

            <div className='md:w-[30%] w-full flex flex-col gap-8 justify-between'>
              <div className='mt-20'>
                <p className='text-xl text-[#166534] uppercase font-[600]'>Your Cart</p>
                <p className='font-[600] text-5xl text-[#15803d] uppercase mb-4'>Summary</p>
                <p className='font-[600] text-xl text-slate-700'>
                Total Items: <span className='font-normal'> {cart.length} </span>
                </p>
              </div>

            <div className='mb-20'>
              <p className='text-xl text-slate-700 font-[600] mb-5 flex'>Total Amount: <span className='ml-2 font-bold text-black'>&#8377;{totalAmount.toFixed(2)} </span></p>
              <button className='w-full text-lg py-2.5 rounded-lg font-bold text-white bg-[#15803d] border-2 border-[#15803d] hover:bg-white hover:text-[#15803d] transition-all duration-300 ease-linear'>
                CheckOut Now
              </button>
            </div>

          </div>
          </div>
        ) :
        (
          <div className='w-screen h-[calc(100vh-80px)] flex flex-col gap-6 justify-center items-center'>
            <h1 className='font-[600] text-xl'>Cart Empty</h1>
            <Link to= {'/'}>
              <button className='bg-[#16a34a] text-white text-md uppercase font-[600] py-3 px-10 rounded-md border-[#16a34a] border-2 hover:bg-white hover:text-[#16a34a] ease-linear transition-all duration-300'>
                Shop Now
              </button>
            </Link>
          </div>
        )
      }
    </div>
  )
}
