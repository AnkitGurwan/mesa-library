import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { setUserPath } from '../../redux/storage/storageSlice';
import "react-toastify/dist/ReactToastify.css";

const Folder = (props) => {
    const dispatch = useDispatch();
  
  const clickHandler = () => {
    dispatch(setUserPath(props.name));
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