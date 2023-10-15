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
    <Link to={`${props.name}`} onClick={clickHandler} className='folder py-3 mx-2 rounded-xl  w-24 h-24 flex justify-between items-center cursor-pointer hover:bg-transparent hover:border-2 hover:border-transparent flex-col'>
        <img src={folder} alt="folder" className='w-[64px]' />
        {/* <i class="fa-regular fa-folder px-2 text-2xl font-light"></i> */}
        <div className='text-[17px] font-normal text-center px-1 pt-1 capitalize'>{props.name}</div>
    </Link>
  )
}

export default Folder