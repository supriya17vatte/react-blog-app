import React from 'react';
import OwlCarousel from "react-owl-carousel";
import { Link } from "react-router-dom";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";



const Trending = ({blogs}) => {
  // To make resposive this carousel component

  const options = {
    loop: true,
    margin: 10,
    nav: true,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      600: {
        items: 3,
      },
      1000: {
        items: 4,
      },
    },
  };
  return (
    <>
    <div>
    <div className="blog-heading text-start py-2 mb-4" >Trending</div>
    </div>
    <OwlCarousel className="owl-theme" {...options}>
     {blogs?.map((data) =>{
        <div className='item px-2' key={data?.id}>
        <Link to ={`detail/${data?.id}`}>
        <div className='trending-img-position'>
        <div className="trending-img-size">
          <img src={data?.imgUrl} alt={data?.title} className="trending-img-relative"/> 
        </div>    
        <div className="trending-img-absolute"></div>
            <div className="trending-img-absolute-1">
                <span className="text-white">{data?.title}</span>
                  <div className="trending-meta-info">
                    {data?.author} - {data?.timestamp?.toDate().toDateString()}
                  </div>
                </div>
        </div>

        </Link>
          
        </div>
     })}
    </OwlCarousel>
    </>
  )
}

export default Trending