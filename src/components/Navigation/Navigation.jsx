import React from 'react'
import { Wishlist } from '../common/Wishlist'
import { AccountIcon } from '../common/AccountIcon'
import { CartIcon } from '../common/CartIcon'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import './Navigation.css'
import { useSelector } from 'react-redux'
import { countCartItems } from '../../store/features/cart'

const Navigation = ({ variant = 'default' }) => {
  const cartLength = useSelector(countCartItems)
  const navigate = useNavigate()
  return (
    <nav className="flex items-center py-6 px-16 justify-between gap-40">
      <div className="flex items-center gap-6">
        {/*logo*/}
        <a className="text-3xl font-bold text text-black gap-8" href="/">
          ShopEase
        </a>
      </div>
      {variant === 'default' && (
        <div className="flex flex-wrap items-center gap-10 flex-1">
          <ul className="flex gap-14 text-gray-600 hover:text-black">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? 'active-link' : '')}>
                Shop
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/men"
                className={({ isActive }) => (isActive ? 'active-link' : '')}>
                Men
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/women"
                className={({ isActive }) => (isActive ? 'active-link' : '')}>
                Women
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/kids"
                className={({ isActive }) => (isActive ? 'active-link' : '')}>
                Kids
              </NavLink>
            </li>
          </ul>
        </div>
      )}
      {variant === 'default' && (
        <div className="flex justify-center">
          {/*search bar*/}
          <div className="border rounded flex overflow-hidden">
            <div className="flex items-center justify-center px-4 border-1">
              <svg
                className="h-4 w-4 text-grey-dark"
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#5f6368">
                <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
              </svg>
              <input
                type="text"
                className="px-4 py-2 outline-none"
                placeholder="Search"
              />
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-wrap items-center gap-4">
        {/*action items*/}
        {variant === 'default' && (
          <ul className="flex items-center gap-8">
            <li>
              <button>
                <Wishlist />
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  navigate('/account-details/profile')
                }}>
                <AccountIcon />
              </button>
            </li>
            <li>
              <Link to="/cart-items" className="flex flex-wrap">
                {cartLength > 0 && (
                  <div className="absolute ml-6 inline-flex items-center justify-center h-6 w-6 bg-black text-white rounded-full border-2 text-xs ">
                    {cartLength}
                  </div>
                )}
                <CartIcon />
              </Link>
            </li>
          </ul>
        )}
        {variant === 'auth' && (
          <ul className="flex gap-8">
            <li className="text-black border border-black hover:bg-slate-100 focus:ring-4 focus:ring-blue-300 focus:outline-none text-sm px-5 py-2.5 font-medium rounded-lg">
              <NavLink
                to={'/v1/login'}
                className={({ isActive }) => (isActive ? 'active-link' : '')}>
                Login
              </NavLink>
            </li>
            <li className="text-black border border-black hover:bg-slate-100 focus:ring-4 focus:ring-blue-300 focus:outline-none text-sm px-5 py-2.5 font-medium rounded-lg">
              <NavLink
                to={'/v1/register'}
                className={({ isActive }) => (isActive ? 'active-link' : '')}>
                Signup
              </NavLink>
            </li>
          </ul>
        )}
      </div>
    </nav>
  )
}

export default Navigation
