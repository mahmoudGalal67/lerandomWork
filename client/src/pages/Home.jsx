import Footer from "../components/Footer";
import Header from "../components/Header";

import video from "../assets/Pink.mp4"
import { Link } from "react-router-dom";

import Slider from "react-slick";

const settings = {
  infinite: true,
  autoplaySpeed: 2000,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
};


function Home() {
  return (
    <div className="Home overflow-x-hidden">
        <Header />
      <header>
        {/* <div  className="video-wrapper p-8 md:p-24">
          <video autoPlay height="auto" width="100%" className="m-auto rounded-3xl" muted controls>
            <source src={video} type="video/mp4"/>
          </video>
        </div> */}
        <Slider {...settings}>
        <img className="image-slider" src={require("../assets/images/slider/1.jpg")} alt="" />
        <img className="image-slider" src={require("../assets/images/slider/10.jpg")} alt="" />
        <img className="image-slider" src={require("../assets/images/slider/11.jpg")} alt="" />
        <img className="image-slider" src={require("../assets/images/slider/12.jpg")} alt="" />
        <img className="image-slider" src={require("../assets/images/slider/13.jpg")} alt="" />
        <img className="image-slider" src={require("../assets/images/slider/14.jpg")} alt="" />
        <img className="image-slider" src={require("../assets/images/slider/15.jpg")} alt="" />
        <img className="image-slider" src={require("../assets/images/slider/16.jpg")} alt="" />
        <img className="image-slider" src={require("../assets/images/slider/17.jpg")} alt="" />
        <img className="image-slider" src={require("../assets/images/slider/18.jpg")} alt="" />
        <img className="image-slider" src={require("../assets/images/slider/19.jpg")} alt="" />
        <img className="image-slider" src={require("../assets/images/slider/2.jpg")} alt="" />
        <img className="image-slider" src={require("../assets/images/slider/20.jpg")} alt="" />
        <img className="image-slider" src={require("../assets/images/slider/3.jpg")} alt="" />
        <img className="image-slider" src={require("../assets/images/slider/4.jpg")} alt="" />
        <img className="image-slider" src={require("../assets/images/slider/5.jpg")} alt="" />
        <img className="image-slider" src={require("../assets/images/slider/6.jpg")} alt="" />
        <img className="image-slider" src={require("../assets/images/slider/7.jpg")} alt="" />
        <img className="image-slider" src={require("../assets/images/slider/8.jpg")} alt="" />
        <img className="image-slider" src={require("../assets/images/slider/9.jpg")} alt="" />
        </Slider>
      </header>
      <Footer />
    </div>
  )
}

export default Home