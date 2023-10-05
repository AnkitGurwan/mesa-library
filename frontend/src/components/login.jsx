import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/auth/AuthContext'
import fire from '../config/firebase';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
    const {userLogin} = useContext(AuthContext);
    const [user , setUser] = useState({email:"",password:""});
    const Navigate = useNavigate();

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
                    
                </div>

                <div class="mb-4 flex items-center justify-between">
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
                    class="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                    <p
                    class="mx-4 mb-0 text-center font-semibold dark:text-neutral-200">
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