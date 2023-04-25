import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header'

function OrderProducts() {
  // const bf = "http://localhost:5000/uploads"
  const bf = "https://api.lerandomhouse.com/uploads"
  // const baseURL = "http://localhost:5000"
  const baseURL = "https://api.lerandomhouse.com"
  const location = useLocation()
  const clientName = location.pathname.split("/")[3]
  const id = location.pathname.split("/")[4]
  const [orderProducts, setorderProducts] = useState([])
  useEffect(() => {
    const getOrderProducts = async () => {
      const { data } = await axios.get(`${baseURL}/orders/getProducts/${id}`)
      setorderProducts(data)
    }
    getOrderProducts()
  },[id])
  return (
    <div className='min-h-screen  flex justify-between flex-col'>
    <Header />
    <div className='mx-12'>
        <h3 className='font-bold text-2xl text-center my-5'>{ clientName}</h3>
      <div className="cart-wrapper p-5 flex justify-around items-start gap-4 flex-wrap">
      {
        !orderProducts.length ? <div>No Found Items</div> :
        orderProducts.map((item,index) => (
          <div className="cart-item flex-col flex justify-center gap-3 w-60 relative my-5" key={index}>
            <img className='object-cover w-full h-60' src={`${bf}/${item.image}`} alt="" />
            <div  className='text-center'>{item.title}</div>
            <div className='text-center'>{item.price} AED</div>
            {item.color &&
            <div className="flex justify-center gap-3">
                <div style={{ backgroundColor: item.color }} className='w-10 h-10 rounded-full'></div>
            </div>
            }
            <div>Size :</div>
            {item.SizeAssistant==false ? <div>
              <div>Length <span>{""} {item.sizelength}{""} {item.unit}</span></div>
              <div>Chest <span>{""} {item.sizeChesst} {""} {item.unit}</span></div>
              <div>Waist <span> {""} {item.sizeHips} {""} {item.unit}</span></div>
              <div>Hips <span> {""} {item.sizeWaist} {""} {item.unit}</span></div>
              <div>Sleeves <span> {""} {item.sizeSleeves} {""} {item.unit}</span></div>
            </div> : <div>
              Home Service Assistant (+200 AED)
            </div>}
          </div>
          ))
        }
        </div>
      </div>
    <Footer />
    </div>
  )
}

export default OrderProducts