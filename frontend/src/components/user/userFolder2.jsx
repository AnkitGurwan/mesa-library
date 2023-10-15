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
    <div className='hover:scale-105 w-36 mx-4 border-gray-400 relative text-white font-semibold bg-[url("https://thumbs.dreamstime.com/b/lot-books-lying-table-colored-retro-style-vector-image-236287545.jpg")]' style={{"background-size":"cover","background-repeat":"no-repeat","background-position": "center center","backgroundColor":"white" }}>
      <Link to={`${props.name}`} onClick={clickHandler} className='w-36 h-28 flex justify-end items-start cursor-pointer backdrop-brightness-75'>
        <div className='text-xs mr-1 mt-1 p-1 text-center capitalize bg-white text-gray-800'>{props.name}</div>
      </Link>
    </div>
  )
}

export default Folder