import React, { useState,useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import fire from '../config/firebase';
import logo from './images/mesa-logo.png';

const Login = () => {
    const [user , setUser] = useState({email:"",password:"",confirmPassword:""});
    const Navigate = useNavigate();
    
    const changeHandler = (e) => {
        setUser({...user,[e.target.name] : e.target.value})
    }


    const clickHandler = async () => {
       
    }

    const submitHandler = (e) => {
        e.preventDefault();
        if(user.password != user.confirmPassword)
        {
            toast.error("Password does not match", {
                position: toast.POSITION.BOTTOM_RIGHT
              });
        }
        if(user.email && user.password)
        {
            fire
            .auth()
            .createUserWithEmailAndPassword(user.email,user.password)
            .then((user) => {
                fire
                .auth()
                .currentUser
                .updateProfile({
                displayName: user.email
                }).then(() => {
                    const currentUser = fire.auth().currentUser;
                    toast.success("Registered Successfully", {
                        position: toast.POSITION.BOTTOM_RIGHT
                    });
                    Navigate('/root');
                })
                .catch((err)=>{
                    toast.error("Please try again.", {
                        position: toast.POSITION.BOTTOM_RIGHT
                    });
                })
            })
            .catch((err) => {
                console.log("err",err.code)
                if(err.code === "auth/email-already-in-use"){
                    console.log("1")
                    toast.error("Email already in use", {
                        position: toast.POSITION.BOTTOM_RIGHT
                    });
                }
                if(err.code === 'auth/invalid-email'){
                    toast.error("Invalid email", {
                        position: toast.POSITION.BOTTOM_RIGHT
                    });
                }
                if(err.code === 'auth/weak-password'){
                    toast.error("Weak password", {
                        position: toast.POSITION.BOTTOM_RIGHT
                    });
                }
            })
        }
    }
    return (
        <div className='w-full flex' style={{"backgroundColor":"rgb(220 252 231)"}}> 
            <div className="header absolute w-full text-3xl container mx-auto text-right p-10 px-32 tracking-wider font-bold text-blue-900 mt-20">
                Welcome to MESA Library!
            </div>

            <div className='flex justify-center items-center flex-col '>
                <img className='h-1/2' src='https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg'/>  
                <img src= {logo} alt="logo" className="h-1/6 w-1/3" />
               
            </div>
            
            <div className='h-full w-1/2 flex justify-center items-center mt-48'>
            <form onSubmit={submitHandler}>
                <div class="relative mb-4"  data-te-input-wrapper-init>
                    <input
                    type="email"
                    class="border outline-0  py-2 px-3 w-72 rounded-xl focus:outline-4 focus:outline-blue-300"
                    placeholder="Email address" 
                    name='email'
                    value={user.email}
                    onChange={changeHandler}
                    required
                    autofocus />
                   
                </div>

                <div class="relative mb-4">
                    <input
                    type="password"
                    class="border outline-0  mb-1 py-2 px-3 w-72 rounded-xl focus:outline-4 focus:outline-blue-300"
                    name='password'
                    value={user.password}
                    placeholder="Password"
                    required
                    onChange={changeHandler} />
                    

                <div class="relative mb-4">
                    <input
                    type="password"
                    class="border outline-0  py-2 px-3 w-72 rounded-xl focus:outline-4 focus:outline-blue-300"
                    name='condirmPassword'
                    value={user.confirmPasswordpassword}
                    placeholder="Confirm Password"
                    required
                    onChange={changeHandler} />
                    
                </div>
                </div>

                <div class="mb-4 flex items-center justify-between">
                    <Link
                    to={'/'}
                    class="text-gray-600 hover:underline"
                    >Already a User?</Link>
                </div>

                <button
                    type="submit"
                    class="px-7 w-full py-3 rounded-md text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] bg-blue-700 hover:bg-blue-800">
                    Register
                </button>

                
          
        </form>
            </div>
        </div>

  )
}

export default Login;