import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { setUserPath } from '../../redux/storage/storageSlice';
import "react-toastify/dist/ReactToastify.css";

const Folder = (props) => {
    const dispatch = useDispatch();
  
    const clickHandler = () => {
      dispatch(setUserPath(props.name));
      var x = "";
      if(localStorage.getItem('pathAdmin'))
      {
          x = localStorage.getItem('pathAdmin')
      }
      x += props.name;
      x += "$";
      localStorage.setItem('pathAdmin',x);
    }

  return (
    <div className='flex align-center justify-center text-center hover:scale-105  relative text-white font-semibold my-4 mx-4' style={{"background-image":'url("https://www.clearias.com/up/UPSC-Studymaterials-of-ClearIAS.png")',"background-size":"cover","background-repeat":"no-repeat","background-position": "center center","backgroundColor":"white" }}>
      <Link to={`${props.name}`} onClick={clickHandler} className='w-60 h-40 flex justify-end items-start cursor-pointer'>
        <div className='text-[15px] mr-1 mt-1 p-1 text-center capitalize bg-white text-gray-800 rounded-md'>{props.name}</div>
      </Link>
    </div>
  )
}

export default Folder