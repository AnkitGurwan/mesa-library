import React, { useContext, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/auth/AuthContext'
import fire from '../config/firebase';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import logo from './images/mesa-logo.png';

const Login = () => {
    const {userLogin} = useContext(AuthContext);
    const [user , setUser] = useState({email:"",password:""});
    const Navigate = useNavigate();

    useEffect(() => { 
        document.body.style.backgroundColor = 'rgb(220 252 231)' 
    }, [])

    const changeHandler = (e) => {
        setUser({...user,[e.target.name] : e.target.value})
    }

    const clickHandler = async () => {
        await userLogin();
    }

    const submitHandler = (e) => {
        e.preventDefault();
        if(user.email && user.password)
        {
            fire
            .auth()
            .signInWithEmailAndPassword(user.email,user.password)
            .then((user)=>{
                Navigate('/root')
            })
            .catch((error)=>{
                if(error.code === "auth/invalid-login-credentials")
                    toast.error("Invalid Password", {
                        position: toast.POSITION.BOTTOM_RIGHT
                    });
                else if(error.code === "auth/too-many-requests")
                {
                    toast.error("Too many retry's. Your account is temporarily blocked. Try again after some time.", {
                        position: toast.POSITION.BOTTOM_RIGHT
                    });
                }
                else{
                    toast.error("User not found", {
                        position: toast.POSITION.BOTTOM_RIGHT
                    });
                }
            })
        }
    }

    return (
        <div className='h-screeen w-full flex '> 
            <div className="header absolute w-full text-3xl container mx-auto text-right p-10 px-32 tracking-wider font-bold text-blue-900 mt-20">
                Welcome to MESA Library!
            </div>

            <div className='flex justify-center items-center flex-col '>
                <img className='h-1/2' src='https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg'/>  
                <img src= {logo} alt="logo" className="h-1/6 w-1/3" />
               
            </div>
            
            <div className='h-full w-1/2 flex justify-center items-center mt-48 '>
            <form onSubmit={submitHandler}>
                <div class="relative mb-4 "  data-te-input-wrapper-init>
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
                    class="border outline-0 py-2 px-3 w-72 rounded-xl focus:outline-4 focus:outline-blue-300 "
                    name='password'
                    value={user.password}
                    placeholder="Password"
                    required
                    onChange={changeHandler} />
                    
                </div>

                <div class="mb-4 px-3 flex items-center justify-between text">
                    <Link
                    to={'/register'}
                    class="text-gray-600 hover:underline"
                    >New User?</Link>
                </div>

                <button
                    type="submit"
                    class="px-7 w-full py-3 rounded-md text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] bg-blue-700 hover:bg-blue-800">
                    Sign in
                </button>

                <div
                    class="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-black after:mt-0.5 after:flex-1 after:border-t after:border-black">
                    <p
                    class="mx-4 mb-0 text-center font-sembold dark:text-black-500">
                    OR
                    </p>
                </div>

                <div
                    class = "w-full h-12 text-white flex justify-center items-center rounded-md cursor-pointer font-medium"
                    style={{"background-color": "#3b5998"}}
                    onClick={clickHandler}>
                    <i class="fa-brands fa-windows text-2xl p-2 my-auto mx-2"></i>
                    Continue with Microsoft
                </div>
          
        </form>
            </div>
        </div>

  )
}

export default Login;