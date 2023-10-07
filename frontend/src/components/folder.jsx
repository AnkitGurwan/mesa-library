import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { setPath } from '../redux/storage/storageSlice';

const Folder = (props) => {
  const dispatch = useDispatch();
  
  const clickHandler = () => {
    dispatch(setPath(props.name));
  }
  return (
    <Link to={`${props.name}`} onClick={clickHandler} className='py-6 mx-4 border overflow-y-hidden w-24 h-24 flex justify-between items-center cursor-pointer hover:bg-gray-100 flex-col'>
        <i class="fa-regular fa-folder px-2 text-2xl font-light"></i>
        <div className='text-xs px-1 pt-2 capitalize'>{props.name}</div>
    </Link>
  )
}

export default Folder