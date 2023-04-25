import React, { useEffect, useState } from 'react'
import "./productDetails.scss"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { fetchFailure, fetchFinish, fetchStart } from '../redux/cartSlice'

import sizeIcon from "../assets/images/details/sizeguide.svg"

import {FiArrowDown, FiArrowUp} from "react-icons/fi"
import {CiDeliveryTruck} from "react-icons/ci"


import { favourite } from '../redux/wishlistSlice'


import { BsBag } from "react-icons/bs"
import { AiOutlineHeart} from "react-icons/ai"
import Slider from "react-slick";
import axios from "axios"
import {  useLocation, useHistory} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Product from '../components/Product'



function ProductDetails() {
  const { user } = useSelector((state) => state.auth)
  const { wishlist } = useSelector((state) => state.wishlist)

  const { loading, error } = useSelector((state) => state.cart)
  const navigate = useHistory()
  
  const [showDetails, setshowDetails] = useState(false)
  const [sizeFit, setssizeFit] = useState(false)

  const location = useLocation()
  const dispatch = useDispatch()
  // const baseURL = "http://localhost:5000"
  const baseURL = "https://api.lerandomhouse.com"
  const id = location.pathname.split("/")[4]
  const category = location.pathname.split("/")[3]
  const type = location.pathname.split("/")[2]
  // const bf = "http://localhost:5000/uploads"
  const bf = "https://api.lerandomhouse.com/uploads"
  const [product, setproduct] = useState({})
  const [similar, setsimilar] = useState([])
  const [choosenColor, setchoosenColor] = useState("")
  const [choosenSize, setchoosenSize] = useState('')
  const [admin, setadmin] = useState(false)
  const [sizeGuide, setsizeGuide] = useState('')
  const [sizeInfo, setsizeInfo] = useState(false)
  const [sizelength, setsizelength] = useState("")
  const [sizeChesst, setsizeChesst] = useState("")
  const [sizeHips, setsizeHips] = useState("")
  const [sizeWaist, setsizeWaist] = useState("")
  const [sizeSleeves, setsizeSleeves] = useState("")
  const [SizeAssistant, setSizeAssistant] = useState(false)
  const [unit, setUnit] = useState("CM")
  const [errorSize, seterrorSize] = useState("")
  const isFavourite = wishlist.some((item) => item.id === product?.product?.id)

  const setFavourite = async () => {
    if(!user) return navigate.push("/login")
    dispatch(favourite(product.product))
    await axios.post(`${baseURL}/wishlist/${String(user.id)}`, { ...product.product })
    navigate.push("/wishlist")
  }

  const dressOffer = {
  id: 1,
  title: "dress",
  desc: "dress",
  price: 600,
  image: `${choosenColor.replace("#","")}dressOffer.jpg`,
  type: "women",
  category:"dress"
  }
  
  const settings1 = {
    infinite: true,
    autoplaySpeed: 2000,
    slidesToShow: similar.length > 4 ? 4 : similar.length,
    slidesToScroll: 1,
    // autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: similar.length > 3 ? 3 : similar.length,
          slidesToScroll: 1,
          infinite: true,
        }
      },
      {
        breakpoint: 780,
        settings: {
          slidesToShow: similar.length > 2 ? 2 : similar.length,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 560,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      },
    ]
  };

  const settings2 = {
    lazyLoad: true,
    arrows: false,
    dots: true,
    infinite: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        }
      },
    ]
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [id])

  useEffect(() => {
    const verify = async () => {
      axios.get(`${baseURL}/admin`, { headers: { verify: user?.verify } }).then((res) => setadmin(res.data.verify))
    }
    verify()
  }, [user?.verify, navigate])

  useEffect(() => {
    const getProduct = async () => {
      try {
        axios.get(`${baseURL}/products/product/${id}`).then(({ data }) => setproduct((prev) => ({ ...prev, product: data })))
        const data1 = await axios.get(`${baseURL}/products/colors/${id}`)
          setproduct((prev) => ({ ...prev, colors: data1.data }))
        setchoosenColor(data1.data[0].color)
        axios.get(`${baseURL}/products/images/${id}`).then(({ data }) => setproduct((prev) => ({ ...prev, images: data })))
        axios.get(`${baseURL}/products/sizes/${id}`).then(({ data }) => setproduct((prev) => ({ ...prev, sizes: data })))
        axios.get(`${baseURL}/products/category?type=${type}&color=${data1.data[0].color}`).then(({ data }) => setsimilar((data)))
      }
      catch (err) {
        console.log(err)
      }
    }
    getProduct()
  }, [id, category, type])

  

  const setColor = (color) => {
    setchoosenColor(color)
  }
  const colorInputStyle = (color) => {
    return {
      backgroundColor: color.color,
      transform: choosenColor === color.color ? "scale(1.2)" : "scale(1)"
    }
  }
  const sizeInputStyle = (size) => {
    return {
      backgroundColor: size === choosenSize ? "black" : "white",
      color: size === choosenSize ? "white" : "black"
    }
  }

  const addToCartOffer = async () => {
    if ((!sizeChesst || !sizelength || !sizeHips || !sizeWaist || !sizeSleeves) && !SizeAssistant) {
      seterrorSize("Please Add The Sizes")
      window.scrollTo({ top: 60, behavior: 'smooth' })
      return
    }
    if (!user) return navigate.push("/login")
    if (choosenColor !== '') {
      seterrorSize("")
      dispatch(fetchStart())
      await axios.post(`${baseURL}/cart/${String(user.id)}`, { ...product.product, color: choosenColor, size: choosenSize, sizelength, sizeChesst, sizeHips, sizeWaist, sizeSleeves, SizeAssistant, unit })
      await axios.post(`${baseURL}/cart/${String(user.id)}`, { ...dressOffer,  color: choosenColor, size: choosenSize,sizelength,sizeChesst,sizeHips,sizeWaist,sizeSleeves,SizeAssistant,unit })
      dispatch(fetchFinish())
      navigate.push('/cart')
    }
    else {
      dispatch(fetchFailure("Please Choose A Size"))
    }
  }

  const addToCart = async () => {
    if((!sizeChesst|| !sizelength || !sizeHips || !sizeWaist||!sizeSleeves) && !SizeAssistant ) return seterrorSize("Please Add The Sizes")
    if(!user) return navigate.push("/login")
    if (choosenColor !== '') {
      seterrorSize("")
      dispatch(fetchStart())
      await axios.post(`${baseURL}/cart/${String(user.id)}`,  { ...product.product, color: choosenColor, size: choosenSize, sizelength, sizeChesst, sizeHips, sizeWaist, sizeSleeves, SizeAssistant, unit })
      dispatch(fetchFinish())
      navigate.push('/cart')
    }
    else {
      dispatch(fetchFailure("Please Choose A Size"))
    }
  }
  const deleteProduct = async (id, type) => {
    if (window.confirm("Are you sure you want to delete  " + product.product.title)) {
    dispatch(fetchStart())
    try {
    axios.delete((`${baseURL}/products/product/${id}?type=${type}`))
    axios.delete((`${baseURL}/products/colors/${id}?type=${type}`))
    axios.delete((`${baseURL}/products/sizes/${id}?type=${type}`))
    axios.delete((`${baseURL}/products/images/${id}?type=${type}`))
    axios.delete((`${baseURL}/cart/${id}`))
    axios.delete((`${baseURL}/wishlist/${id}`))
    dispatch(fetchFinish())
    navigate.push("/")
    }
    catch (err) {
      console.log(err)
      dispatch(fetchFailure("Someting went wrong"))
    }
    }
  }
  if(!product.product||!product.images||!product.colors||!product.sizes) return <div className="flex justify-center items-center fixed top-0 left-0 w-full h-full bg-overlay">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
    </div>
  return (
  <>
    {loading &&
      <div className="flex justify-center items-center fixed top-0 left-0 w-full h-full bg-overlay">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
    </div>}
    <Header />
      <div className="product-details m-8">
    <div className='flex items-center lg:items-start flex-col av:flex-row text-gray'>
      <div className="left w-full av:w-2/3">
          <Slider {...settings2}>
            {product.category!=="dress" ? product.images.filter((image) => image.color === choosenColor).map((item,index)=>(
          <div key={index} className='w-10/12 md:w-1/2 px-5'><img className='main-image w-full object-cover' src={`${bf}/${item.image}`} alt="" /></div>
            )) :
              product.images.map((image,index) => 
          <div key={index} className='w-10/12 md:w-1/2 px-5'><img className='main-image w-full object-cover' src={`${bf}/${image.image}`} alt="" /></div>
          )}
          </Slider>
      </div>
      <div className="right av:w-1/3 w-full flex flex-col av:items-start av:gap-4 gap-2 px-5">
            <div className='text-lg'>{product.product.title}</div>
            <div>{product.product.price}</div>
        {/* <div className='text-xs items-center flex gap-5 p-3 border-2 border-green-300 w-fit'><img src={require("../assets/images/details/Group (1).png")} alt="" /> Same Day Delivery Available</div> */}
        <div className="colors flex gap-3">
          {product.colors.map((color,index) => (
            <div className='cursor-pointer w-7 h-7 color-active' style={colorInputStyle(color)} key={color.id} onClick={()=>setColor(color.color)}></div>
          ))}
        </div>
            <div className='text-fade mt-3 mr-5 cursor-pointer flex items-center gap-2' onClick={()=>setsizeGuide(product.product.type)}> <img src={sizeIcon} alt="" /> Size Guide</div>
            {(sizeGuide === "women" && category !== "bags" && category !== "accessories" && category !== "shoes") &&
              <>
                <div className='guide flex justify-center flex-col items-center fixed h-screen top-0 left-0 z-10 bg-fade' onClick={() => setsizeGuide("")}></div>
                <img className='image-guide w-3/4 fixed z-10' src={require('../assets/images/details/Group 1000004708(1).png')} alt=""/>
              </>
            }
            <div className='sizes flex gap-4'>
              {product.sizes.map((size) => (
                <div className='flex cursor-pointer justify-center items-center border-2 borde-fade w-10 h-10' key={size.id} style={sizeInputStyle(size.size)} onClick={()=>setchoosenSize(size.size)}>{size.size}</div>
            ))}
            </div>
            {error && <div className='text-red text-center'>{ error}</div>}
        {/* <div className='text-xs items-center flex gap-5'><img src={require("../assets/images/details/Group.png")} alt="" /> Free Online Returns Within 14 Days</div> */}
          <div className="form-el checkbox my-8 ">
            <input type="checkbox"  id="manu" className='cursor-pointer' onChange={(e)=>(setsizeInfo((prev)=>!prev))}/>
            <label htmlFor="manu" className='cursor-pointer'><span className='text-red'>*</span> Enter Size Manually</label>
          </div>
            {
              sizeInfo &&
            <div className='size-info w-full flex flex-col'>
                  <div className="wrapper  flex flex-col gap-5">
                <select className='w-full' onChange={(e)=>setUnit(e.target.value)} name={unit}>
                  <option selected>CM</option>
                  <option>INCH</option>
                </select>
                <select className='w-full' onChange={(e)=>setsizelength(e.target.value)} name={sizelength}>
                  <option disabled selected>Shoulder</option>
                  <option>{unit==="IN" ? 51 : 134 }</option>
                  <option>{unit==="IN" ? 52 : 135 }</option>
                  <option>{unit==="IN" ? 53 : 36 }</option>
                  <option>{unit==="IN" ? 54 : 38 }</option>
                  <option>{unit==="IN" ? 55 : 40 }</option>
                </select>
                    <select className='w-full' onChange={(e)=>setsizeChesst(e.target.value)} name={sizeChesst}>
                  <option disabled selected>Sleeves</option>
                  <option>{unit==="IN" ? 40 : 96 }</option>
                  <option>{unit==="IN" ? 41 : 100 }</option>
                  <option>{unit==="IN" ? 43 : 106 }</option>
                  <option>{unit==="IN" ? 45 : 112 }</option>
                  <option>{unit==="IN" ? 46 : 118 }</option>
                </select>
                <select className='w-full' onChange={(e)=>setsizeWaist(e.target.value)} name={sizeWaist}>
                  <option disabled selected>Bust</option>
                  <option>{unit==="IN" ? 15 : 39 }</option>
                  <option>{unit==="IN" ? 16 : 40 }</option>
                  <option>{unit==="IN" ? 17 : 42 }</option>
                  <option>{unit==="IN" ? 18 : 43 }</option>
                  <option>{unit==="IN" ? 19 : 45 }</option>
                </select>
                <select className='w-full' onChange={(e)=>setsizeHips(e.target.value)} name={sizeHips}>
                  <option disabled selected>Waist</option>
                  <option>{unit==="IN" ? 40 : 96 }</option>
                  <option>{unit==="IN" ? 41 : 100 }</option>
                  <option>{unit==="IN" ? 43 : 106 }</option>
                  <option>{unit==="IN" ? 45 : 112 }</option>
                  <option>{unit==="IN" ? 46 : 118 }</option>
                </select>
                <select className='w-full' onChange={(e)=>setsizeSleeves(e.target.value)} name={sizeSleeves}>
                  <option disabled selected>Length</option>
                  <option>{unit==="IN" ? 15 : 60 }</option>
                  <option>{unit==="IN" ? 16 : 61 }</option>
                  <option>{unit==="IN" ? 17 : 63 }</option>
                  <option>{unit==="IN" ? 18 : 64 }</option>
                  <option>{unit==="IN" ? 19 : 66 }</option>
                </select>
              </div>
              </div>
            }
            <div className="form-el checkbox my-8 ">
            <input type="checkbox" id="new" className='cursor-pointer' onChange={(e)=>(setSizeAssistant((prev)=>!prev))}/>
            <label htmlFor="new" className='cursor-pointer'><span className='text-red'>*</span> Home Service Assistant</label>
            </div>
            {errorSize && <div className='text-red text-center'>{ errorSize}</div>}
                    <div className='flex w-full items-center  justify-center gap-5  border-2 border-black py-2 px-4 bg-gray text-center text-white cursor-pointer hover:scale-110 transition duration-100 ease-in-out' onClick={addToCart}> Add To Basket</div>
            {!isFavourite && <div className='flex w-full items-center  justify-center gap-5  border-2 bg-white border-black py-2 px-4 text-center text-black cursor-pointer hover:scale-110 transition duration-100 ease-in-out' onClick={setFavourite}><AiOutlineHeart /> Add To Favourites</div>}
            <div className='details w-full cursor-pointer border-b-2 border-fade py-5 mr-8' onClick={()=>setshowDetails((prev)=>!prev)}>
              <div className='flex justify-between items-center'><span>Details</span>{!showDetails ?<FiArrowDown />:<FiArrowUp/>}</div>
              {showDetails && <div className='info my-5'>details :<p>{product.product.desc }</p></div>}
            </div>
            <div className='size-fit  w-full cursor-pointer border-b-2 border-fade py-5 mr-8' onClick={()=>setssizeFit((prev)=>!prev)}>
              <div className='flex justify-between items-center'><span>Size & Fit</span>{!sizeFit ?<FiArrowDown />:<FiArrowUp/>}</div>
              {sizeFit &&
                <>
              <ol className='info my-5 px-5'>
                <li>Designed for a slightly loose fit</li>
                <li>Fits true to size, take your normal size</li>
                </ol>
                <div className='text-fade mt-3 mr-5 cursor-pointer flex items-center gap-2' onClick={()=>setsizeGuide(product.product.type)}> <img src={sizeIcon} alt="" /> Size Guide</div>
                </>
              }
            </div>
            <div className='delivery p-5 border-2 border-fade'>
              <div className='flex items-center gap-12'><CiDeliveryTruck className='text-4xl' /> <span>Delivery & Returns</span></div>
              <p className='py-3 text-sm'>Find out more about our delivery options and how to exchange or return</p>
            </div>
        {admin && <div className='text-center p-4 bg-price my-5 text-white cursor-pointer hover:scale-110'  onClick={()=>deleteProduct(product.product.id,product.product.type)}>Delete</div>}
          </div>
        </div>
        {
          product.product.category!=="dress" &&  <section>
          <h3 className='my-5 md:text-4xl text-2xl font-bold'>Wear It With</h3>
        <div className='offer flex items-center flex-row gap-3  overflow-x-auto'>
          <div className="wrapper mt-8 flex flex-row items-center gap-2 md:gap-5">
            <div>
              <img src={`${bf}/${product.product.image}`} className="imageOffer h-80 object-cover" alt="" />
                  <div className='text-center my-3'>{product.product.price}{ "  "}AED</div>
            </div>
            <div>
              <img src={`${bf}/${choosenColor.replace("#","")}dressOffer.jpg`} className="imageOffer w-60 h-80 object-cover" alt="" />
              <div className='text-center my-3'>(Dress) 600 AED</div>
            </div>
          </div>
          <div>
                <div className='text-2xl my-5'>{product.product.price + 600}AED</div>
          <button className='p-2 my-5 hover:text-white bg-fade whitespace-nowrap' onClick={addToCartOffer}>Add To Basket</button>
          </div>
        </div>
        </section>
}
      <div className="same-category my-12">
      <h3 className='text-2xl text-gray text-center mb-5'>You May Also Like</h3>
    {
      similar.length &&
      <Slider {...settings1}>
        {similar.map((item) => (
          <div className='similar-item p-5 flex justify-center items-center' key={item.id}>
            <Product className="category-item w-auto" type='similar' product={item} />
          </div>
          ))}
      </Slider>
      }
      </div>
      </div>
      <Footer />
    </>
  )
}

export default ProductDetails