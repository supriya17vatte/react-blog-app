import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import './App.css';
import "./style.scss";
import "./media-query.css";
import Home from "./pages/Home";
import Detail  from "./pages/Detail";
import AddEditBlog  from "./pages/AddEditBlog";
import NotFound  from "./pages/NotFound";
import About  from "./pages/About";
import Headers from './components/Headers';
import Auth from "./pages/Auth";

import { Routes,Route,useNavigate,Navigate } from 'react-router-dom';
import { auth } from './firebase';
import { signOut } from 'firebase/auth';

function App() {

  const [active,setActive] = useState("home");
  const [user,setUser] = useState(null);
  const navigate = useNavigate();

 useEffect(() =>{
    auth.onAuthStateChanged((authUser) =>{
      if(authUser){
        setUser(authUser);
      }else{
        setUser(null);
      }
    });
 },[]);

 //Logout function
 const handleLogout = () =>{
  signOut(auth).then(() =>{
    setUser(null);
    setActive("login");
    navigate("auth");
  })
 }

    return (
    <div className="App">
    {/* <Headers setActive={setActive} active={active}/> */}
    <Headers setActive={setActive} active={active} user={user} handleLogout={handleLogout} />
    <ToastContainer position='top-center'/>
    <Routes>
      <Route path='/' element={<Home setActive={setActive} user={user}/>}/>
      <Route path='/detail/:id' element={<Detail setActive={setActive}/>}/>
      <Route path='/create' element={ user?.uid ? <AddEditBlog  user={user}/> : <Navigate to= "/" />}/>
      <Route path='/update/:id' element={user?.uid ? <AddEditBlog  user={user} setActive={setActive}/> : <Navigate to= "/" />}/>
      <Route path='/about' element={<About />}/>
      <Route path='*' element={<NotFound />}/>
      <Route path='/auth' element={<Auth setActive={setActive} />}/>
     </Routes>
    </div>
  );
}

export default App;
