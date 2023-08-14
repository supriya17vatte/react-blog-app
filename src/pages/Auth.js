import React,{useState} from 'react'
import { toast } from 'react-toastify';
import {auth} from "../firebase";
import { createUserWithEmailAndPassword,
          signInWithEmailAndPassword,
          updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';


const initialState ={
  firstName :"",
  lastName : "",
  email : "",
  password : "",
  confirmPassword:""
}

const Auth = ({setActive}) => {
  const [state,setState] = useState(initialState);
  const [signUp, setSignUp] = useState(false);

  //destructure email and password from our state
  const {email,password,firstName,lastName,confirmPassword} =state;

  const navigate = useNavigate();
  
  const handleChangle =(e) =>{
    setState({...state,[e.target.name] : e.target.value });
  }

  //Sign up user
  const handleAuth = async(e) => {
    e.preventDefault();
    if(!signUp){
      if(email && password){
        const {user} = await signInWithEmailAndPassword(auth,email,password);
        setActive("home");

      }else{
        return toast.error("All fields are mandatory to fill");
      }
    }
    else{
      if(password !== confirmPassword){
        return toast.error("Password do not match!")
      }
      if(firstName && lastName && email && password){
        const {user} = await createUserWithEmailAndPassword(auth,email,password);
        await updateProfile(user,{displayName: `${firstName} ${lastName }`});
        toast.success("User register successfully");
        setActive("home");
      }else{
        return toast.error("All fields are mandatory to fill");

      }
    }
    navigate("/");
  };

  return (
    <div className="container-fluid mb-4">
        <div className="container">
          <div className="col-12 text-center">
              <div className="text-center heading py-2">
                  {!signUp ? "Sign-In" : "Sign-Up"}
              </div>
          </div>
          <div className="row h-100 justify-content-center align-items-center">
          <div className="col-10 col-md-8 col-lg-6">
              <form  className="row" onSubmit={handleAuth}>
                {signUp && (
                  <>
              <div className="col-6 py-3">
                <input type='text' 
                className='form-control input-text-box' 
                placeholder='First Name' 
                name='firstName'
                value={firstName}
                onChange={handleChangle}/>
              </div>

              <div className="col-6 py-3">
                <input type='text' 
                className='form-control input-text-box' 
                placeholder='Last Name' 
                name='lastName'
                value={lastName}
                onChange={handleChangle}/>
              </div>
                  </>
                )}
              <div className="col-12 py-3">
                <input type='email' 
                className='form-control input-text-box' 
                placeholder='email' 
                name='email'
                value={email}
                onChange={handleChangle}/>
              </div>
               
              <div className="col-12 py-3">
                <input type='password' 
                className='form-control input-text-box' 
                placeholder='password' 
                name='password'
                value={password}
                onChange={handleChangle}/>
              </div>
              {signUp && (
                <>
                <div className="col-12 py-3">
                  <input type='password' 
                    className='form-control input-text-box' 
                     placeholder='Confirm Password' 
                      name='confirmPassword'
                     value={confirmPassword}
                     onChange={handleChangle}/>
                </div>
                </>
              )}

             

              {/* Button - SignIn & SignUp */}
              <div className="col-12 py-3 text-center">
                <button className={`btn ${!signUp ? "btn-sign-in" : "btn-sign-up"}`}
                  type="submit">
                  {!signUp ? "Sign-in" : "Sign-up"}
                </button>
              </div>
              </form>
              <div>
                {!signUp ? (
                  <>
                  <div className="text-center justify-content-center mt-2 pt-2">
                    <p className="small fw-bold mt-2 pt-1 mb-0">
                      Don't have an account ?&nbsp;
                      <span
                        className="link-danger"
                        style={{ textDecoration: "none", cursor: "pointer" }}
                        onClick={() => setSignUp(true)}>
                        Sign Up
                      </span>
                    </p>
                  </div>
                  </>
                ) : (
                  <>
                  <div className="text-center justify-content-center mt-2 pt-2">
                    <p className="small fw-bold mt-2 pt-1 mb-0">
                      Already have an account ?&nbsp;
                      <span
                        style={{
                          textDecoration: "none",cursor: "pointer", color: "#298af2",}}
                        onClick={() => setSignUp(false)}>
                        Sign In
                      </span>
                    </p>
                  </div>
                  </>
                )
                
                
                
                
                }
              </div>
          </div>

          </div>



        </div>



    </div>
  )  
}

export default Auth