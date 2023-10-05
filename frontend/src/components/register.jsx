import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import fire from '../config/firebase';

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
        <div className='h-screeen w-screen flex'> 
            <div className='flex justify-center items-center'>
                <img className='h-2/3' src='https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg'/>  
            </div>
            
            <div className='h-full w-1/2 flex justify-center items-center mt-32'>
            <form onSubmit={submitHandler}>
                <div class="relative mb-4"  data-te-input-wrapper-init>
                    <input
                    type="email"
                    class="border outline-none py-2 px-3 w-72 rounded-sm"
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
                    class="border outline-none py-2 px-3 w-72 rounded-sm"
                    name='password'
                    value={user.password}
                    placeholder="Password"
                    required
                    onChange={changeHandler} />
                    

                <div class="relative mb-4">
                    <input
                    type="password"
                    class="border outline-none py-2 px-3 w-72 rounded-sm"
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