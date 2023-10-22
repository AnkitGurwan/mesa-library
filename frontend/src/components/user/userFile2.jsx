import React, { useContext, useState } from 'react'
import AuthContext from '../../context/auth/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import '..//styles.css';
import file from '../images/user-guide.png';

const File = (props) => {
  const [flag,setFlag] = useState(false);
  const [flagg,setFlagg] = useState(false);
  
  

  return (
    <div className='hover:scale-105 relative mt-10 '>
      <div onClick={()=>{!flag?setFlag(true):setFlagg(false)}} className='w-full h-28 flex justify-center items-end  cursor-pointer '>
        <div>
          <img src={file} alt="file" className='w-20' />
          <div className='text-[16px] w-full py-4 bg-white capitalize text-center font-medium text-black '>{props.name?props.name.slice(0,15):""}</div>
        </div>
          {flag
          ?
          <div id="myModal5" class="modal5 cursor-auto ">
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