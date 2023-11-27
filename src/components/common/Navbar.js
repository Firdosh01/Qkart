import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from "react-router-dom"
import logo from '../../assets/logo_light.svg'
import { logout } from '../../services/operations/authAPI'
import { AiOutlineSearch } from "react-icons/ai";
import { FaShoppingCart } from 'react-icons/fa'


export default function Navbar({setSearch}) {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const { cart } = useSelector((state) => state);

  const dispatch = useDispatch()
  const navigate = useNavigate()
  return (
    <>
      <div className='w-full border-b-[1px] '>
        <div className='flex items-center justify-between px-5 h-14'>

          <div>
            <Link to='/'>
              <img src={logo} alt="logo" width={80} />
            </Link>
          </div>

          <div class="relative md:flex w-[40%] flex-wrap items-stretch hidden">
            
            <input
              type="text"
              className="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded border 
              border-solid border-[#00A278] bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] select-none"
              placeholder="Search for items/categories" onChange={(e) => setSearch(e.target.value)} 
              />

            {/* <!--Search button--> */}
            <div className='absolute top-[25%] right-0'>
              < AiOutlineSearch color='#00A278' fontSize={20} className='cursor-pointer' />

            </div>

          </div>

          <div className='flex items-center'>
            {token === null && (
              <Link to="/login">
                <button className='text-sm capitalize outline-none text-[#00A278] mr-3'>
                  LOGIN
                </button>
              </Link>
            )}
            {token === null && (
              <Link to="/signup">
                <button className='text-white bg-[#00A278] px-6 py-2 rounded-md text-sm'>
                  REGISTER
                </button>
              </Link>
            )}
            <div className='flex items-center gap-2'>
              {token !== null &&
                <Link to='/cart'>
                  <div className='relative'>
                    < FaShoppingCart className='text-2xl text-[#00A278]' />
                    {
                      cart.length > 0 &&
                      <span className='absolute flex items-center justify-center w-5 h-5 text-xs text-white bg-green-600 rounded-full -top-1 -right-2 animate-bounce'>{cart.length}</span>
                    }
                  </div>
                </Link>
              }

              {token !== null &&
                <div>
                  <button onClick={() => dispatch(logout(navigate))} className='text-sm capitalize outline-none text-[#00A278]'>LOGOUT</button>
                </div>
              }
            </div>

          </div>

        </div>
      </div>
    </>
  )
}
