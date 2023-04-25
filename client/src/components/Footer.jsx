import React, { useState } from 'react'

import {AiOutlinePhone,AiOutlineWhatsApp,AiOutlineHome,AiOutlineMail,AiOutlineTwitter} from "react-icons/ai"
import { FiArrowDown, FiArrowUp ,FiInstagram} from "react-icons/fi"
import { GrFacebookOption } from "react-icons/gr"
import {FaTiktok} from "react-icons/fa"


function Footer() {

  const [showContact, setshowContact] = useState(false)


  return (
    <div className='footer bg-footer'>
      <div className="wrapper flex justify-center flex-wrap">
        {/* <div className='lg:w-1/4 sm:w-1/2 flex flex-col items-center lg:items-start w-full p-5'>
          <span className='mb-5 font-bold block'>QUICK LINKS</span>
          <ul>
            <li><a href="/">Size Guide</a></li>
            <li><a href="/">About Us</a></li>
            <li><a href="/">My Account</a></li>
            <li><a href="/">FAQs</a></li>
            <li><a href="/">Opio Gift Cards</a></li>
          </ul>
        </div> */}
        <div className='flex flex-col justify-between items-center w-full pb-8 pt-16'>
          <ul>
            <li className='text-center cursor-pointer'><a href='https://wa.me/+971527112123?text=HI'>Contact Us</a></li>
            <div className='social-icons flex w-full justify-center mt-10'>
            <a href="https://www.instagram.com/le.randomhouse/"><FiInstagram className='text-xl'/></a>
            <a href="https://www.tiktok.com/@lerandomhouse"><FaTiktok className='text-lg'/></a>
            <a href="https://www.facebook.com/profile.php?id=100090747727850"><GrFacebookOption className='text-2xl'/></a>
            <a href="https://twitter.com/LeRandomHouse"><AiOutlineTwitter className='text-2xl'/></a>
            <a href='https://wa.me/+971527112123?text=HI'><AiOutlineWhatsApp className='text-2xl'/></a>
          </div>
          </ul>
          <div className='flex w-full justify-center gap-3 mt-6'>
            <img src={require("../assets/images/payment/svg (1).png")} alt="" />
            <img src={require("../assets/images/payment/svg.png")} alt="" />
            <img src={require("../assets/images/payment/VF_Cash_Logo_-_RED_f6e8b365-3f93-4e8c-ace6-772d3e54380c_120x.jpg.png")} alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer