import React, { useState } from 'react'

const File = (props) => {
  
  return (
    <a href={props.url} target="_blank" className='py-4 mx-4 border w-16 h-20 flex flex-col justify-center items-center hover:bg-gray-100 cursor-pointer'>
        <i class="fa-regular fa-file px-2 text-xl font-light"></i>
        <div className='text-xs px-1 pt-2 capitalize text-center '>{props.name?props.name.slice(0,20):""}</div>
    </a>
  )
}

export default File