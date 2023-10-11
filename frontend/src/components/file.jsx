import React, { useState } from 'react'
import fileImg from './images/file.png'

const File = (props) => {
  const [flag,setFlag] = useState(false);
  const [flagg,setFlagg] = useState(false);
  
  const clickHandler = () => {

  }
  return (
    <div onClick={()=>{!flag?setFlag(true):setFlagg(false)}} className='py-4 mx-6 border-0 w-16 h-20 flex flex-col justify-center items-center hover:bg-gray-100 cursor-pointer'>
        <img src={fileImg} alt="folder" className='' />
        <div className='text-xs px-1 pt-2 capitalize text-center'>{props.name?props.name.slice(0,15):""}</div>

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
  )
}

export default File