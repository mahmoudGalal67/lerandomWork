import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Footer from '../components/Footer'
import Header from '../components/Header'

import { toast } from 'react-toastify';
import { useHistory, useLocation } from 'react-router-dom'


function OrderDetails() {
  // const baseURL = "http://localhost:5000"
  const baseURL = "https://api.lerandomhouse.com"
  const navigate = useHistory()
  const location = useLocation()
  const paymentStatus = location.pathname.split("/")[2]
  
  const orderDetailsSession = JSON.parse(sessionStorage.getItem("orderDetails")) || {
    orderDetails:{
      country:"",
      adresse:"",
      city:"",
      zipCode:"",
      phone:"",
      villa: "",
      villaNumber: "",
      name: "",
      countryCode:""
    }
  }
  const {user}= useSelector((state) => state.auth)
  const { cart } = useSelector((state) => state.cart)
  const totalPrice = cart.reduce((price, item) => {
    return price+item.price
  }, 0)
    let addition =0
  cart.forEach(item => {
    if (item.SizeAssistant) {
      addition =  200
    }
    })
  const [orderDetails, setorderDetails] = useState(orderDetailsSession.orderDetails)
  const [loading, setLoading] = useState(false)
  const [error, seterror] = useState("")
  const [success, setsuccess] = useState("")

  useEffect(() => {
    if (paymentStatus === "endPayment") {
    setsuccess("Payment Completed")
  }
},[])
  const cheackOut = async () => {
    if(!orderDetails.country||!orderDetails.adresse||!orderDetails.city||!orderDetails.phone||!orderDetails.villa||!orderDetails.villaNumber||!orderDetails.name||!orderDetails.countryCode) return seterror("Please Add All Fields")
    try {
      setLoading(true) 
      sessionStorage.setItem("orderDetails", JSON.stringify({ orderDetails, price: totalPrice+addition }))
      const { data } = await axios.post(`${baseURL}/payment`, { items: [...cart, { title: "Home Service Assistant", price: addition }] })
      seterror("")
      window.location = data.url
    }
    catch (err) {
      console.log(err);
      seterror("Payment Failde")
    }
  }

  const order =async (e) => {
    e.preventDefault()
    if(paymentStatus==="startPayment") return seterror("Please Complete The Payment")
    if(paymentStatus==="failedPayment") return seterror("Failed Payment")
    setLoading(true) 
    sessionStorage.setItem("orderDetails", JSON.stringify({ orderDetails, price: totalPrice+addition }))
    try {
      const {data} = await axios.post(`${baseURL}/orders/addInfo`, { ...orderDetails, totalPrice: totalPrice+addition, email: user.email })
      Promise.all(cart.map((item) => {
        axios.post(`${baseURL}/orders/addProducts`,{orderId:data ,title:item.title, desc:item.desc,price:item.price,size:item.size,color:item.color,image:item.image,sizelength:item.sizelength,sizeChesst:item.sizeChesst,sizeHips:item.sizeHips,sizeWaist:item.sizeWaist,sizeSleeves:item.sizeSleeves,SizeAssistant:item.SizeAssistant,unit:item.unit})
      }))
      axios.delete(`${baseURL}/cart/order/user/${ user.id}`)
      setLoading(false)
    }
    catch (err) {
      console.log(err);
    }
    toast.success('Your order has been sent successfully', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });
    navigate.push("/")
  }
  return (
  <>
  <Header />
    <div className='sm:p-16 p-8 '>
    {loading &&
      <div className="flex justify-center items-center top-0 left-0 w-full h-full bg-overlay fixed">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>}
      <h3 className='font-bold text-3xl'>Shipping Adresse :</h3>
      <form onSubmit={order} className="flex flex-col">
        <input required value={orderDetails?.villa} type="text" name='villa' placeholder='Villa - Apartment' className='p-5 border-2 border-color-black rounded-md my-5' onChange={(e)=>setorderDetails((prev)=>({...prev,[e.target.name]:e.target.value}))}/>
        <input required value={orderDetails?.villaNumber} type="text" name="villaNumber" placeholder='Villa Number - Apartment Number' className='p-5 border-2 border-color-black rounded-md my-5' onChange={(e)=>setorderDetails((prev)=>({...prev,[e.target.name]:e.target.value}))}/>
        <div className='flex my-5'>
          <input required value={orderDetails?.adresse} name="adresse" className='w-1/3 mr-2 p-5 border-2 border-color-black rounded-md' type="text" placeholder='Adress' onChange={(e)=>setorderDetails((prev)=>({...prev,[e.target.name]:e.target.value}))}/>
          <input required value={orderDetails?.city} name="city" className='w-1/3 p-5 mx-2 border-2 border-color-black rounded-md' type="text" placeholder='City' onChange={(e)=>setorderDetails((prev)=>({...prev,[e.target.name]:e.target.value}))}/>
          <input required value={orderDetails?.country} name="country" className='w-1/3 ml-2  p-5 border-2 border-color-black rounded-md' type="text" placeholder='Country' onChange={(e)=>setorderDetails((prev)=>({...prev,[e.target.name]:e.target.value}))}/>
          </div>
        <div className='flex '>
          <input required name="phone" value={orderDetails?.phone} type="number" placeholder='Phone' className='w-1/2 mr-2 p-5 border-2 border-color-black rounded-md  my-5' onChange={(e)=>setorderDetails((prev)=>({...prev,[e.target.name]:e.target.value}))}/>
          <input required name="countryCode" value={orderDetails?.countryCode} type="text" placeholder='Country Code' className='w-1/2 ml-2 p-5 border-2 border-color-black rounded-md  my-5' onChange={(e)=>setorderDetails((prev)=>({...prev,[e.target.name]:e.target.value}))}/>
        </div>
        <div className='flex '>
          <input required name="name" value={orderDetails?.name} type="text" placeholder='Name' className='w-1/2 mr-2 p-5 border-2 border-color-black rounded-md  my-5' onChange={(e)=>setorderDetails((prev)=>({...prev,[e.target.name]:e.target.value}))}/>
          <input name="zipCode" value={orderDetails?.zipCode} type="text" placeholder='Zip Code' className='w-1/2 ml-2 p-5 border-2 border-color-black rounded-md  my-5' onChange={(e)=>setorderDetails((prev)=>({...prev,[e.target.name]:e.target.value}))}/>
          </div>
          {success!=="Payment Completed"&&<div className='mt-8 p-5 text-center text-xl hover:bg-link bg-black rounded-md text-white cursor-pointer' onClick={cheackOut}>Check Out</div>}
          <div className='my-3 text-center text-red text-xl'>{ error}</div>
          <div className='my-3 text-center text-green text-xl'>{ success}</div>
        <div className='bg-fade w-full h-1 my-4'/>
          <div className='flex justify-between text-2xl'><span>Total</span><span>{ totalPrice+addition} AED</span></div>
        <button type='submit' className='ml-auto mt-8 p-5 hover:bg-link bg-black rounded-md text-white'>Continue to shipping</button>
      </form>
      </div>
    <Footer />
  </>
  )
}

export default OrderDetails