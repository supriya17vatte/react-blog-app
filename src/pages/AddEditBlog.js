import React,{useEffect, useState} from 'react'
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";
import "react-toastify/dist/ReactToastify.css"
import { db,storage } from '../firebase';
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import { toast } from "react-toastify";
import { ToastContainer } from 'react-toastify';

import { addDoc, collection, getDoc,doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { useNavigate,useParams } from 'react-router-dom';



const initialState = {
  title:"",
  tags:[],
  trending:"no",
  category:"",
  description:""

}

const categoryOption =[
  "Food",
  "Technology",
  "Fashion",
  "Politics",
  "Business",
  "Sports"
];


const AddEditBlog = ({user, setActive}) => {

  const[form, setForm] =useState(initialState);
  const [file, setFile] = useState(null);
  const [progress,setProgress] = useState(null);

   //Edit
  const {id} = useParams();

  useEffect(() =>{
    id && getBlogDetailsToEdit();
  },[id]);

  const getBlogDetailsToEdit = async() =>{
      const docRef = doc(db,"blog",id);
      const snapshot =  await getDoc(docRef);
      console.log("snapshot AddEditBlog :",snapshot);
      if(snapshot.exists){
        setForm({...snapshot.data()});
      }
      setActive(null); 
  }
  
const navigate = useNavigate();
console.log(file,"file")

  //destructure form
  const {title,tags,trending,category,description} = form;

  const handleChange = (e) =>{
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const handleTags =(tags) =>{
    setForm({ ...form, tags });
    console.log("tags",tags);
  }

  const handleTrending = (e) =>{
    setForm({ ...form, trending: e.target.value });
  } 

  const onCategoryChange = (e) =>{
    setForm({ ...form, category: e.target.value });

  }
  const handleSubmit = async(e) =>{
        e.preventDefault();
        console.log("user", user);
       
        if(title && category && tags && trending && description){
          if(!id){
            try{
              await addDoc(collection(db,"blog"),{
                ...form,
                timestamp: serverTimestamp(),
                author: user?.displayName,
                userId:user?.uid
              });
              toast.success("Blog created successfully");
            }catch(err){
              console.log(err )
            }
          }else{
            try{
              await updateDoc(doc(db,"blog",id),{
                ...form,
                timestamp: serverTimestamp(),
                author: user?.displayName,
                userId:user?.uid
              });
              toast.success("Blog updated successfully");
            }catch(err){
              console.log(err )
            }
          } 
        }else{
          return toast.error("ALl fields are mandatory to fill");
        }
        navigate("/");
  }

  useEffect(() => {
    const uploadFile = () => {
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setProgress(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            toast.info("Image upload to firebase successfully");
            setForm((prev) => ({ ...prev, imgUrl: downloadUrl }));
          });
        }
      );
    };

    file && uploadFile();
  }, [file]);

  console.log("form",form);
  return (
    <div className='container-fluid mb-4'>
      <div className='container'>
        <div className='col-12'>
          <div className='text-center heading-py-2'>{id? "Update Blog" : "Create Blog"}</div>
        </div>
        <div className='row h-100 justify-content-center align-items-center'>
          <div className='col-10 col-md-8 col-lg-6'></div>
            <form className='row blog-form' onSubmit={handleSubmit}>
              <div className='col-12 py-3'>
                 <input type='text' 
                  className='form-control input-text-box' 
                  placeholder='Title' 
                  name='title'
                  value={title}
                  onChange={handleChange}/>
                </div>
                  <div className='col-12 py-3'>
                    <ReactTagInput tags={tags} placeholder='Enter tags' onChange={handleTags}/>
                  </div>
                  
                  <div className="col-12 py-3">
                <p className="trending">Is it trending blog ?</p>
                <div className="form-check-inline mx-2">
                  <input
                    type="radio"
                    className="form-check-input"
                    value="yes"
                    name="radioOption"
                    checked={trending === "yes"}
                    onChange={handleTrending}
                  />
                  <label htmlFor="radioOption" className="form-check-label">
                    Yes&nbsp;
                  </label>
                  <input
                    type="radio"
                    className="form-check-input"
                    value="no"
                    name="radioOption"
                    checked={trending === "no"}
                    onChange={handleTrending}
                  />
                  <label htmlFor="radioOption" className="form-check-label">
                    No
                  </label>
                </div>
              </div>
                   <div className='col-12 py-3'>
                      <select value={category} onChange={onCategoryChange} className='catg-dropdown'>
                        <option>Please select category</option>
                          {categoryOption.map((option,index)=>(
                            <option value={option || ""} key={index}>
                              {option}
                            </option>
                          ))}

                      </select>
                    </div>

              <div className="col-12 py-3">
                <textarea className="form-control description-box"
                  placeholder="Description"
                  value={description}
                  name="description"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <input type="file"
                  className="form-control"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>

              <div className="col-12 py-3 text-center">
                <button className="btn btn-add"  type="submit" disabled={progress !==null && progress < 100}>{id ? "Update":"Submit"}</button>
              </div>
              
            </form>
        </div>
      </div>
    </div>

  )
}

export default AddEditBlog