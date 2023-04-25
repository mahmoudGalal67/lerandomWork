import React, { useEffect, useState } from 'react' 

import axios from "axios"
import { Link, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'

const colorsData = [{text:"White",value:"white"} , {text:"Green",value:"green"} ,{text:"Grey",value:"grey"} ,{text:"Off White",value:"rgb(250, 249, 246)"} ,{text:"pink",value:"Pink"} ,{text:"Black",value:"black"} ,{text:"Blue",value:"blue"} ]
const categories =
  ["Abaya","Kaftan","Dresses","Lingerie","Tops","Pants","Skirts","Bags","Accessories","Shoes"]

function AddProduct() {
  // const baseURL = "http://localhost:5000"
  const baseURL = "https://api.lerandomhouse.com"
  const {user}= useSelector((state) => state.auth)
  const navigate = useHistory()
  const [loading, setloading] = useState(false)
  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')
  const [price, setprice] = useState(0)
  const [category, setCategory] = useState('')
  const [state, setstate] = useState('evening')
  const [mainFile, setmainFile] = useState('')
  // const [sizes, setsizes] = useState([])
  // const [color, setcolor] = useState('')
  const [colors, setcolors] = useState([])
  const [files, setfiles] = useState([])
  const [colorError, setcolorError] = useState('')
  const [bestSeller, setPestSeller] = useState(false)
  const [error, seterror] = useState('')
  let image=""
  let images=[]
  let imageColors = []
  useEffect(() => {
    for (let i = 0; i < colors.length; i++){
    imageColors.push(colors[i])
    imageColors.push(colors[i])
    imageColors.push(colors[i])
    imageColors.push(colors[i])
    }
  })
    useEffect(() => {
    const verify = async () => {
      const { data } = await axios.get(`${baseURL}/admin`, { headers: { verify: user?.verify } })
      if(!data.verify) navigate.push("/")
    }
    verify()
  },[user?.verify ,navigate])

  const addColor = (e) => {
    setcolors((prev) => [...prev,e.target.value])
    setcolorError("")
  }
  const addProduct = async (e) => {
    e.preventDefault()
    if (name === "" || category === "" || mainFile === "" || !colors.length|| !files.length ) {
      seterror("Please add all fields")
    } 
    else {
      seterror("")
      setloading(true)
      if (mainFile) {
      const data =new FormData();
      const filename = Date.now() + mainFile.name;
      data.append("name", filename);
      data.append("file", mainFile);
      image=filename
      try {
        axios.post(`${baseURL}/api/upload`, data);
      } catch (err) {
        console.log(err);
        setloading(false)
      }
    }
      if (files) {
      Object.values(files).map((file) => {
      const data =new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      images.push(filename)
      try {        
        axios.post(`${baseURL}/api/upload`, data);
      } catch (err) {
        console.log(err);
        setloading(false)
      }
    })
      }
      try {
        const { data } = await axios.post(`${baseURL}/products/add`, { title: name, desc, price, type:"women",state, category, image,bestSeller })
        Promise.all(colors.map((color) => {
          try {
            axios.post(`${baseURL}/products/colors/add`,{color,productId:data})
          }
          catch (err) {
            console.log(err);
            setloading(false)
          }
        }))
        // Promise.all(sizes.map((size) => {
        //   try {
        //     axios.post(`${baseURL}/products/sizes/add`,{size,productId:data})
        //   }
        //   catch (err) {
        //     console.log(err);
        //     setloading(false)
        //   }
        // }))
        Promise.all(images.map((image,index) => {
          try {
            axios.post(`${baseURL}/products/images/add`, { image, productId: data,color:imageColors[index] })
            setloading(false)
            navigate.push("/dashboard")
          }
          catch (err) {
            console.log(err);
            setloading(false)
          }
        }))
      }
    catch (err) {
      console.log(err)
    }
    }
  }
  const removeColor = (index) => {
    setcolors((prev) =>prev.filter((el)=>el !==prev[index]))
  }

  return (
    <>
    <header className='flex justify-around items-center '>
        <div className="left"><Link to="/"><img className='w-40 h-40' src={require("../assets/logo.png")} alt="" /></Link></div>
        <Link to="/dashboard"><div className="right font-bold text-2xl av:text-5xl">WELCOME ADMIN</div></Link>
      </header>
      <nav className='flex justify-center items-center text-lg gap-5 av:gap-20 fon-bold av:text-2xl bg-black  text-white'>
        <Link to="/dashboard/addProduct" className='hover:bg-white hover:text-black px-4 py-3'>
          <div className="nav-item">
            Add Product
          </div>
        </Link>
        {/* <Link to="/dashboard/addGift" className='hover:bg-white hover:text-black px-4 py-3'>
          <div className="nav-item">
            Add Gift & Fragrance
          </div>
        </Link> */}
      </nav>
    <div className='w-full p-20 flex justify-center items-center'>
      {loading &&
      <div className="flex justify-center items-center top-0 left-0 w-full h-full bg-overlay fixed">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>}
      <form  className='w-full flec flex-col' onSubmit={addProduct}  method="POST" >
        <h2 className='text-center text-3xl font-bold'>ADD PRODUCT</h2>
        <div className="form-el my-8 flex flex-col gap-2">
          <label>Name :</label>
          <input className='p-5 border-2 border-black outline-none' type="text"  onChange={(e)=>setName(e.target.value)}/>
        </div>
        <div className="form-el my-8  flex flex-col gap-2">
          <label>Description :</label>
          <textarea  className='p-5 border-2 border-black outline-none' cols="20" rows="10"  onChange={(e)=>setDesc(e.target.value)}></textarea>
        </div>
        <div className="form-el my-8  flex flex-col gap-2">
          <label>Price :</label>
          <input className='p-5 border-2 border-black outline-none' type="number"   onChange={(e)=>setprice(e.target.value)}/>
        </div>
        <div className="form-el my-8  flex flex-col gap-2">
          <label>Category : </label>
            <input className='p-5 border-2 border-black outline-none' type="text" placeholder='must as same as the nav category'  value={category} onChange={(e) => setCategory(e.target.value.replace(/\s/g, "").toLowerCase())} />
            <select className='p-5 border-2 border-black outline-none' onChange={(e)=>setCategory(e.target.value)}>
                <option disabled selected>Type</option>
                <option>Abaya</option>
                <option>Caftan</option>
            </select>
        </div>
        <div className="form-el my-8  flex flex-col gap-2">
          <label>Type : </label>
            <select className='p-5 border-2 border-black outline-none' onChange={(e)=>setstate(e.target.value)}>
              <option>evening</option>
              <option>day</option>
            </select>
        </div>
        <div className="form-el my-8  flex flex-col gap-2">
          <label>Main image :</label>
          <input type="file" onChange={(e)=>setmainFile(e.target.files[0])}/>
        </div>
        {/* <div className="form-el my-8  flex flex-col gap-2">
          <label>Add sizes :</label>
          <div className="wrapper flex gap-8  items-center"><input className='p-2 border-2 border-black outline-none' type="text" placeholder='Separated with , ' onChange={(e)=>setsizes(e.target.value.toUpperCase().split(","))}/></div>
        </div> */}
        <div className="form-el my-8  flex flex-col gap-2">
          <label>Add colors :</label>
          <select className='p-5 border-2 border-black outline-none' onChange={(e)=>addColor(e)}>
              <option disabled selected>colors</option>
              {colorsData.map((color, index) => (
                <option value={color.value} key={index}>{color.text}</option>
              ))}
            </select>
          <div className='colors-wrapper flex gap-4'>
            {
              colors.map((color,index) => (
                <div className='w-10 h-10 my-5 cursor-pointer border-4 border-black' style={{backgroundColor:color}} key={index} onClick={()=>removeColor(index)}></div>
              ))
            }
          </div>
          <div className='text-price text-2xl'>{ colorError}</div>
          </div>
          <div className="form-el checkbox my-8 ">
            <input type="checkbox" id="new" className='cursor-pointer' onChange={(e)=>(setPestSeller((prev)=>!prev))}/>
            <label htmlFor="new" className='cursor-pointer'>Set as best seller</label>
          </div>
        <div className="form-el my-8  flex flex-col gap-2">
          <label>Colorful images : <span className='text-fade mx-3'>must be the fourth of the colors</span></label>
          <input type="file"  multiple  onChange={(e)=>setfiles(e.target.files)}/>
        </div>
        <button type='submit' className='w-full bg-fade p-5 hover:bg-black hover:text-white'>ADD PRODUCT</button>
        <div className='text-center text-red text-2xl my-5'>{ error}</div>
      </form>
      </div>
    </>
  )
}

export default AddProduct