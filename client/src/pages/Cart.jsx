import React, { useEffect } from 'react'
import Header from "../components/Header"
import Footer from "../components/Footer"
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCart } from "../redux/cartSlice"
import { AiFillDelete } from "react-icons/ai"

import "./cart.css"

function Cart() {
  // const bf = "http://localhost:5000/uploads"
  const bf = "https://api.lerandomhouse.com/uploads"
  const { cart } = useSelector((state) => state.cart)
  const {user}= useSelector((state) => state.auth)
  const navigate = useHistory()
  const dispatch = useDispatch()
  // const baseURL = "http://localhost:5000"
  const baseURL = "https://api.lerandomhouse.com"

  let totalPrice = cart.reduce((price, item) => {
    return price+item.price 
  }, 0) 
  let addition =0
  cart.forEach(item => {
    if (item.SizeAssistant) {
      addition =  200
    }
    })

  useEffect(() => {
    if (!user) {
      navigate.push("/login")
    }
  }, [user, navigate])

  const deleteFromCart = (id , userId) => {
    axios.delete(`${baseURL}/cart/${id}/${userId}`)
    dispatch(deleteCart(id))
  }

  return (
    <div className='min-h-screen  flex justify-between flex-col'>
    <Header />
    <div className='cart mx-12'>
      <h3 className='font-bold text-2xl text-center my-5'>Your Shopping Bag </h3>
      <div className="cart-wrapper p-5 flex justify-around gap-4  items-start flex-wrap">
      {
        !cart.length ? <div>No Found Items</div> :
        cart.map((item,index) => (
          <div className="cart-item flex-col flex justify-center gap-3 w-60 relative my-5" key={index}>
            {item.category !== "dress" ? <Link to={item.type === "gifts" ? `/${item.type}/${item.category}/${item.productId}` : `/product/${item.type}/${item.category}/${item.productId}`}><img className='object-cover w-full h-60' src={`${bf}/${item.image}`} alt="" /></Link> :
            <div><img className='object-cover w-full h-60' src={`${bf}/${item.image}`} alt="" /></div>
            }
            <div  className='text-center'>{item.title} </div>
            <div className='text-center'>{item.price} AED</div>
            {item.color &&
            <div className="flex justify-center gap-3">
                <div style={{ backgroundColor: item.color }} className='w-10 h-10 rounded-full'></div>
            </div>
            }
            <div>Size :</div>
            {!item.SizeAssistant ? <div>
              <div>Length <span>{ "" } {item.sizelength}{ "" } { item.unit}</span></div>
            <div>Chest <span>{ "" } { item.sizeChesst} { "" } { item.unit}</span></div>
            <div>Waist <span> { "" } { item.sizeHips} { "" } { item.unit}</span></div>
            <div>Hips <span> { "" } { item.sizeWaist} { "" } { item.unit}</span></div>
            <div>Sleeves <span> { "" } { item.sizeSleeves} { "" } { item.unit}</span></div>
            </div> : <div>
                Home Service Assistant (+200 AED)
            </div>
            }
            <AiFillDelete className='text-2xl cursor-pointer text-red absolute bottom-20 opacity-0 right-1' onClick={()=>deleteFromCart(item.id ,user.id)}/>
          </div>
          ))
        }
        </div>
        <div className='font-bold text-center'>Total Price  :{ totalPrice+addition} AED</div>
        {cart.length>0&&<Link to="/orderDetails/startPayment"><div className='sm:w-80 w-60 m-auto my-5 text-center p-5 transition-all hover:scale-110 duration-75 ease-in-out bg-black text-white'>Continue To Shipping</div></Link>}
      </div>
    <Footer />
    </div>
  )
}

export default Cart