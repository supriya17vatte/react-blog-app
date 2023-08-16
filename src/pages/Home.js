import { collection, deleteDoc, onSnapshot,doc, query, where,getDocs } from 'firebase/firestore';
import React,{useState,useEffect} from 'react'
import { db } from '../firebase';
import BlogSection from '../components/BlogSection';
import Spinner from '../components/Spinner';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Tags from '../components/Tags';
import MostPopular from '../components/MostPopular';
import Trending from '../components/Trending';
const Home = ({setActive,user}) => {

  const [blogs,setBlogs] = useState([]);
  const [loading,setLoading] = useState(true);
  const [tags,setTags] = useState([]);
  const [trendingBlogs, setTrendingBlogs] = useState([]);

  const getTrendingBlogs = async() =>{
    const blogRef = collection(db, "blog");
    const trendQuery = query(blogRef,where("trending","==","yes"));
    const querySnapshot = await getDocs(trendQuery);
    let trendingBlogs =[];
    querySnapshot.forEach((doc) =>{
      trendingBlogs.push({id: doc.id, ...doc.data()});
    });
    setTrendingBlogs(trendingBlogs);
  }

  useEffect(() =>{
    getTrendingBlogs();
    const unsubscribe = onSnapshot(
        collection(db,"blog"),
        (snapshot) => {
          let list = [];
          let tags = [];
          snapshot.docs.forEach((doc) =>{
            tags.push(...doc.get("tags"));
            console.log('doc',doc);
            list.push({id: doc.id, ...doc.data()});

          });
          //get unique tags
          const uniqueTags = [...new Set(tags)];
          setTags(uniqueTags);
          setBlogs(list);
          console.log("list",list)
          setLoading(false);
          setActive("home");

        },(error) =>{
          console.log(error);
        }
    );

    return() =>{
      unsubscribe();
      getTrendingBlogs();

    };

  },[]);
  
  console.log("blogs",blogs)

  if(loading){
    return <Spinner/>
  }

  // delete blog fun
  const handleDelete= async(id) =>{
    if(window.confirm("Are you sure wanted to delete blog ?")){
       try{
          setLoading(true);
          await deleteDoc(doc(db,"blog",id));
          toast.success("Blog deleted successfully");
          setLoading(false);
       }catch(err){
        console.log(err);
       }
    }


  }

  return (
    <div className="container-fluid pb-4 pt-4 padding">
    <div className="container padding">
      <div className="row mx-0">
            <Trending blogs={trendingBlogs }></Trending>
            <div className='col-md-8'>
            <BlogSection blogs={blogs} user={user} handleDelete={handleDelete}/>
          </div>
          <div className='col-md-3'>
              <Tags tags={tags}/>
              <MostPopular blogs={blogs}/>
          </div>
      </div>
    </div>
    </div>
  )
}

export default Home