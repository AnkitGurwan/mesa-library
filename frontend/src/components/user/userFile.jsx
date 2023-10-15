import React, { useContext, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { setPath } from '../../redux/storage/storageSlice';
import file from '../images/file.png';
import fire from '../../config/firebase';
import AuthContext from '../../context/auth/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import '..//styles.css'

const File = (props) => {
  const [flag,setFlag] = useState(false);
  const [flagg,setFlagg] = useState(false);
  
  

  return (
    <div className=' relative mx-2'>
    <div onClick={()=>{!flag?setFlag(true):setFlagg(false)}} className='py-4 mx-4 w-20 h-20 flex flex-col justify-center items-center cursor-pointer'>
        <div className="transition ease-in-out delay-150 hover:-translate-y-1 hover:-translate-x-1">
          <img src={file} alt="file" className='w-[64px]' />
          <div className='text-[17px] px-1 pt-2 capitalize text-center'>{props.name?props.name.slice(0,15):""}</div>
        </div>
          {flag?<div id="myModal5" class="modal5 cursor-auto ">
                <div class= "modal-content5 flex justify-end">
                    <div   onClick={()=>{setFlag(false)}}  class="close mt-1 h-8  flex justify-center items-center cursor-pointer hover:bg-gray-200 rounded-full w-8">&times;</div>
                    <div className='p-2 text-sm '>
                      <div className='text-lg font-medium text-start pb-1 border-b mb-3 capitalize pl-2'>{props.topic}</div>
                      <div className='text-start border rounded-md p-3 uppercase'>{props.description}</div>
                      <div className='flex justify-end items-center  border-t pt-2 mt-2'>
                        <div className='flex justify-center items-center text-lg font-medium capitalize'>{props.name} , </div>
                        <div className='flex justify-end items-end px-1 uppercase'>{props.year} yearite</div>
                      </div>
                    </div>
                    
              </div>
          </div>:""}
    </div>
    </div>
  )
}

export default File