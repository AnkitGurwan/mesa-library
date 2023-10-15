import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { setUserPath } from '../../redux/storage/storageSlice';
import folder from '../images/folder.png'
import "react-toastify/dist/ReactToastify.css";

const Folder = (props) => {
    const dispatch = useDispatch();
  
  const clickHandler = () => {
    dispatch(setUserPath(props.name));
  }

  return (
    <Link to={`${props.name}`} onClick={clickHandler} className='folder py-3 mx-2 w-24 h-24 flex justify-between items-center cursor-pointer flex-col transition ease-in-out delay-150 hover:-translate-y-1 hover:-translate-x-1'>
        <img src={folder} alt="folder" className='w-[64px]' />
        {/* <i class="fa-regular fa-folder px-2 text-2xl font-light"></i> */}
        <div className='text-[17px] font-normal text-center px-1 pt-1 capitalize'>{props.name}</div>
    </Link>
  )
}

export default Folder