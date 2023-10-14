import React, { useContext, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { setPath } from '../../redux/storage/storageSlice';
import folder from '../images/folder.png';
import fire from '../../config/firebase';
import AuthContext from '../../context/auth/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Folder = (props) => {
    const dispatch = useDispatch();
  const { GetDetails } = useContext(AuthContext);
  
  const clickHandler = () => {
    dispatch(setPath(props.name));
  }

  return (
    <div className='mx-5 my-3 relative text-white font-semibold bg-[url("https://www.bolton.ac.uk//assets/Uploads/shutterstock-1213477993-3.jpg")] bg-fit' style={{"background-size":"cover","background-repeat":"no-repeat","background-position": "center center" }}>
      <Link to={`${props.name}`} onClick={clickHandler} className='w-28 h-32 flex justify-center items-end cursor-pointer backdrop-brightness-50'>
        <div className='text-xs w-full text-center py-1 capitalize bg-white text-gray-800'>{props.name}</div>
      </Link>
    </div>
  )
}

export default Folder