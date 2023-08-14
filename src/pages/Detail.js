import {collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import React, { useEffect, useState } from 'react'
import {useParams} from "react-router-dom";
import Tags from '../components/Tags';
import MostPopular from '../components/MostPopular';

const Detail = ({setActive}) => {
  //get blog details page based on the id - useParams() hook
  const {id} = useParams();
  const [blog,setBlog] = useState(null);

  //Another approach to get all blogs
  const [blogs,setBlogs] = useState([]);
  const [tags,setTags] = useState([]);

  //Get all the blogs using another approach
  useEffect(()=>{
    const getBlogData= async() =>{
      const blogRef =collection(db,"blog");
      const allBlogs = await getDocs(blogRef);
      setBlogs(allBlogs.docs.map((doc) =>({id: doc.id,...doc.data()})))
      
      //get tags
      let tags = [];
      allBlogs.docs.map((doc) => tags.push(...doc.get("tags")));

      //get unique tag
      let uniqueTag = [...new Set(tags)];
      setTags(uniqueTag); 
    };
    getBlogData();
  },[])

  // run useEffect when we have id
  useEffect(()=>{
    id && getBlogDetails();
  },[id]);

  const getBlogDetails= async()=>{
    // targeting signle documnet
    const docRef =doc(db,"blog",id);
    //get signle blog detail
    const signleBlogDetails = await getDoc(docRef);
    console.log("signleBlogDetails -",signleBlogDetails)
    setBlog(signleBlogDetails.data());
    setActive(null);

  }
  return (
    <div className="single">
    <div className="blog-title-box" style={{ backgroundImage: `url('${blog?.imgUrl}')` }}>
      <div className="overlay"></div>
        <div className="blog-title">
        <span>{blog?.timestamp?.toDate().toDateString()}</span>
        <h2>{blog?.title}</h2>
      </div>
    </div>
    <div className="container-fluid pb-4 pt-4 padding blog-single-content">
    <div className="container padding">
        <div className="row mx-0">
          <div className="col-md-8">
          <span className="meta-info text-start">
              By <p className='author'>{blog?.author}</p> -&nbsp;
              {blog?.timestamp?.toDate().toDateString()}
          </span> 
          <p className='text-start'>{blog?.description}</p>
          </div>
            <div className='col-md-3'>
                  <Tags tags ={tags}/>
                <MostPopular blogs={blogs}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;