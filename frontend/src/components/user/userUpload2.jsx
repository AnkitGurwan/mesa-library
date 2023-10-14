import React, { useContext, useState } from 'react'
import fire from '../../config/firebase';
import AuthContext from '../../context/auth/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const File = (props) => {
  
  return (
    <div className='border hover:bg-gray-200 rounded-sm p-1 border-gray-400 relative mx-2'>
    <a href={props.url} target="_blank" className='py-4 mx-4 w-10 h-20 flex flex-col justify-center items-center cursor-pointer'>
        <i class="fa-regular fa-file px-2 text-xl font-light"></i>
        <div className='text-xs px-1 pt-2 capitalize text-center '>{props.name?props.name.slice(0,20):""}</div>
    </a>
    </div>
  )
}

export default File;