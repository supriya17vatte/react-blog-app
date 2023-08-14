import React from 'react'
import { useNavigate } from 'react-router-dom'

//will receive all blogs from Home component
const MostPopular = ({blogs}) => {
    const navigate =useNavigate(); 
  return (
    <div>
        <div className='blog-heading text-start pt-3 py-2 mb-4'>Most Popular !!</div>
        {blogs?.map((item) =>(
            <div className='row pb-3' key={item?.id} style={{cursor:"pointer"}} onClick={()=>navigate(`/detail/${item?.id}`)}>
                <div className='col-5 align-self-center'>
                    {/* <img src ={item?.imgUrl} alt={item?.title} className="most-popular-img"/> */}
                    <h2>{item?.title}</h2>
                </div>
                <div className='col-7 padding'>
                    <div className='text-start most-popular-font'>{item?.title}</div>
                    <div className='text-start most-popular-font-meta'>{item?.timestamp?.toDate().toDateString()}
                    </div>
                </div>
            </div>
        ))};
    </div>
  );
};

export default MostPopular