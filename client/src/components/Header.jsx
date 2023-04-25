import React, { useEffect, useState } from 'react'
import "./header.scss"
import { FaUserCircle } from "react-icons/fa"
import { AiOutlineHeart , AiOutlineLogout,AiOutlinePlus} from "react-icons/ai"
import { BsBag } from "react-icons/bs"
import {RxDashboard} from "react-icons/rx"
import { Link,useLocation, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { setCart ,resetCart} from "../redux/cartSlice"
import { logout } from '../redux/authSlice' 
import axios from 'axios'

import {AiOutlinePhone,AiOutlineWhatsApp,AiOutlineHome,AiOutlineMail} from "react-icons/ai"
import { FiArrowDown, FiArrowUp } from "react-icons/fi"

function Header() {
  // const baseURL = "http://localhost:5000"
  const baseURL = "https://api.lerandomhouse.com"
  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useHistory()
  const { user } = useSelector((state) => state.auth)
  const { cart } = useSelector((state) => state.cart)
  
  const [showContact, setshowContact] = useState(false)

    useEffect(() => {
    const getCart = async () => {
      if(user){
        try {
          const { data } = await axios.get(`${baseURL}/cart/${user?.id}`)
          if (!data.length && location.pathname.split("/")[1] === "orderDetails") {
            navigate.push("/")
          }
          dispatch(setCart(data))
        }
        catch (err) {
          console.log(err);
        }
      }
    }
    getCart()
  },[user , dispatch,navigate])

  const removeUser = () => {
    dispatch(logout())
    dispatch(resetCart())
    navigate.push("/")
  }

  return (
    <div className='header'>
      <div className='flex justify-around items-center'>
        <Link to="/" className='logo-image block w-fit'><img className="block fit:w-40 " src={require("../assets/logo.png")} alt="" /></Link>
        <h1 className='header-logo sm:text-7xl'>LE RANDOM HOUSE</h1>
        {/* {user?.verify&&<Link to="/dashboard"><RxDashboard className='mx-8'/></Link>} */}
      </div>
        {/* <!-- Toggler Right --> */}
        <div className="block">
          <div id='menuToggleR'>
            <input type="checkbox" />

            <span></span>
            <span></span>
            <div className='menu font-bold relative z-10'>Menu</div>

          <ul id="menuR" className="text-black text-bold text-xl">
          <li className='abaya cursor-pointer w-full flex px-3 justify-between items-center'>
              Abaya <AiOutlinePlus/>
              <div  className='text-black abaya-link py-4 m-auto w-40 sm:px-0 px-8 sm:w-60'>
                <div className='block text-center text-sm border-b-2 mx-5 py-3 border-black'>Spring/Summer  '23</div>
                <Link to={`/products/women/day`} className='block text-center py-3'>Daywear</Link>
                <Link to={`/products/women/evening`} className='block text-center py-3'>Eveningwear</Link>
              </div>  
            </li>
            <li className='flex w-full px-3 justify-between items-center'><Link to='/cart'>Basket</Link><BsBag className='text-sm'/></li>
            <li className='flex w-full px-3 justify-between items-center'> <><Link to='/wishlist'>Favourites</Link><AiOutlineHeart/></></li>
            <li className='flex w-full px-3 justify-between items-center'>{!user ? <><Link to="/login">Login</Link> <FaUserCircle /></> : <><div className='cursor-pointer hover:text-link' onClick={removeUser}>Log Out</div><AiOutlineLogout /></>}</li>
              <li className='cursor-pointer w-full px-3' onClick={()=>setshowContact((prev)=>!prev)}><div className='flex justify-between items-center'>Contact Us {!showContact ?<FiArrowDown />:<FiArrowUp/>}</div></li>
            {
              showContact &&  <div className='contact-info w-full p-3'>
              <a href='tel:+971 52 711 2123' className='flex justify-between items-center'><div>Home Service</div><AiOutlineHome/></a>
              <a href='https://wa.me/+971527112123?text=HI' className='flex justify-between items-center'><div>Whats App</div><AiOutlineWhatsApp/></a>
              <a href='tel:+971 52 711 2123' className='flex justify-between items-center'><div>Phone</div><AiOutlinePhone/></a>
              <a href='mailto:samirabehyari@gmail.com' className='flex justify-between items-center'><div>Email</div><AiOutlineMail/></a>
            </div>
            }
            <li className='flex w-full px-3 justify-between items-center'>{user?.verify && <><Link to="/dashboard">Dashboard</Link><RxDashboard/></>}</li>
          </ul>
        </div>
        </div>
      {/* <!-- Toggler Right --> */}
      {/* <div className="pr-6 pl-16 pb-5 text-center flex justify-between"> */}
     
      {/* <div className="right lg:w-1/5 flex items-center mr-3">
          <div className="header-icons flex items-center gap-5 justify-end w-full">
          {!user ? <Link to="/login"><FaUserCircle /></Link> : <AiOutlineLogout className='cursor-pointer hover:text-link' onClick={removeUser}/>}
          <Link to='/wishlist'><AiOutlineHeart/></Link>
            <div className="cart relative">
              <Link to='/cart'><BsBag /></Link>
              {cart.length>0 &&<span className='cart-count'>{cart.length}</span>}
            </div>
        </div>
      </div> */}
      {/* </div> */}
      {/* <!-- Toggler Left --> */}
        {/* <div className="block">
          <div id="menuToggle">
            <input type="checkbox" />

            <span></span>
            <span></span>
            <span></span>

            <ul id="menu" className="text-white">
            <li className='abaya cursor-pointer py-5 px-5'>
              Abaya
              <div  className='abaya-link py-4 m-auto w-40 sm:px-0 px-8 sm:w-60 h-40'>
                <Link to="/women">Summer 2023</Link>
              </div>  
            </li>
            </ul>
        </div>
        </div> */}
      {/* <!-- Toggler Left --> */}
    </div>
  )
}

export default Header