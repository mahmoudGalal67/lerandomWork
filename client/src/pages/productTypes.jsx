import React, { useEffect, useState } from 'react'
import {  useLocation } from 'react-router-dom'

import "./productTypes.scss"

// import Slider from "react-slick";
import Product from '../components/Product';
import Header from "../components/Header"
import Footer from "../components/Footer"
import axios from 'axios';

const colorsData = [{text:"White",value:"white"} , {text:"Green",value:"green"} ,{text:"Grey",value:"grey"} ,{text:"Off White",value:"rgb(250, 249, 246)"} ,{text:"pink",value:"Pink"} ,{text:"Black",value:"black"} ,{text:"Blue",value:"blue"} ]

  const ProductTypes=()=> {
//   const Categories = {
//   women:
//     [
//       {category: "Abaya",
//         image: (require("../assets/images/categories/women/abaya.png"))
//       },
//       {category: "Kaftan",
//         image: (require("../assets/images/categories/women/koftan.png"))
//       },
//       {category: "Dresses",
//         image: (require("../assets/images/categories/women/dressess.png"))
//       },
//       {category: "Lingerie",
//         image: (require("../assets/images/categories/women/lengire.png"))
//       },
//       {
//       category: "Tops",
//         image: (require("../assets/images/categories/women/tops.png"))
//       },
//       {
//       category: "Pants",
//         image: (require("../assets/images/categories/women/pants.png"))
//       },
//       {
//       category: "Skirts",
//         image: (require("../assets/images/categories/women/skirrt.png"))
//       },
//       {
//       category: "Bags",
//         image: (require("../assets/images/categories/women/bags.png"))
//       },
//       {
//       category: "Accessories",
//         image: (require("../assets/images/categories/women/accessories.png"))
//       },
//       {
//       category: "Shoes",
//         image: (require("../assets/images/categories/women/shoes.png"))
//       },
//       ],
//       gifts:[],
//       new:[]
// }
//     const settings = {
//       lazyLoad: true,
//       infinite: true,
//       autoplaySpeed: 2000,
//       slidesToShow: 6,
//       slidesToScroll: 1,
//       // autoplay: true,
//       responsive: [
//         {
//           breakpoint: 1024,
//           settings: {
//             slidesToShow: 5,
//             slidesToScroll: 1,
//             infinite: true,
//           }
//         },
//         {
//           breakpoint: 800,
//           settings: {
//             slidesToShow: 4,
//             slidesToScroll: 1,
//             infinite: true,
//           }
//         },
//         {
//           breakpoint: 600,
//           settings: {
//             slidesToShow: 3,
//             slidesToScroll: 1,
//           }
//         },
//       ]
//     };
    const location = useLocation()
    const type = location.pathname.split("/")[2]
    const state = location.pathname.split("/")[3]
    // const baseURL = "http://localhost:5000"
    const baseURL = "https://api.lerandomhouse.com"

    const [products, setproducts] = useState([])
    const [colors, setcolors] = useState([])
    const [filterColors, setfilterColors] = useState([])
    const [search, setsearch] = useState("")

    useEffect(() => {
      const getProducts = async () => {
        try {
          const {data} = await axios.get(`${baseURL}/products/type?type=${type}&state=${state}`)
          const colors = await axios.get(`${baseURL}/products/colors`)
          setproducts(data)
          setcolors(colors.data)
          setfilterColors(colors.data)
        }
        catch (err) {
          console.log(err);
        }
      }
      getProducts()
    }, [type,state])
    
    let filterProducts = products.filter(product => {
      return ( 
        filterColors.some(color => {
          return color.productId===product.id
        })
      )
    })
    filterProducts = filterProducts.filter((product)=>{
      return  product.title.toUpperCase().includes(search.toUpperCase())
    })
    return (
      <>
        <Header />
    <section className='types-page p-5'>
      <div className='categories-section my-5'>
        {/* <Slider {...settings}>
        {Categories[type].map((item , index) => (
            <div className="category-item px-4" key={index}>
            <Link to={`/${type}/${item.category.replace(/\s/g, "").toLowerCase()}`} className='relative'>
              <img src={item.image} alt="" />
            </Link>
          </div>
        ))}
        </Slider> */}
        <div className='products my-5 md:px-10'>
            <div className='p-1 border-b-2 border-fade text-mute'>Spring/Summer  '23</div>
          <div className='flex justify-between sm:-8 gap-3 sm:flex-row flex-col my-5 items-center w-full'>
            <div className='flex sm:flex-row flex-col sm:gap-8'>
            <div className="form-el my-2  flex items-center gap-2">
              <label> Color : </label>
              <select className='border-gray  rounded-lg p-1 border-2 border-black outline-none' onChange={(e)=>setfilterColors(colors.filter(color=>color.color===e.target.value))}>
              <option className='rounded-lg' disabled selected>Colors</option>
              {colorsData.map((color, index) => (
                <option className='rounded-lg' value={color.value} key={index}>{color.text}</option>
              ))}
            </select>
            </div>
            </div>
            <div className='search border-2 border-gray rounded-lg p-1'>
              <input className='outline-none' type="text" placeholder='Search' onChange={(e)=>setsearch(e.target.value)}/>
            </div>
              </div>
            {products.length === 0 ? <div className='h-80 flex items-center justify-center'>No Found Items</div> :
            <div className="products-wrapper my-5">
              <div className='flex flex-wrap m-w-24 justify-around'>
                    {filterProducts.map((product => (
                      <Product product={product} key={product.id} />
                )))}
            </div>
          </div>}
          
        </div>
        </div>
        </section>
        <Footer />
      </>
  )
}

export default ProductTypes