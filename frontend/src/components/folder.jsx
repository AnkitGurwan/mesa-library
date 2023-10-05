import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Folder = (props) => {
  
  return (
    <a href={`/${props.name}`} className='py-6 mx-4 border overflow-y-hidden w-24 h-24 flex justify-between items-center cursor-pointer hover:bg-gray-100 flex-col'>
        <i class="fa-regular fa-folder px-2 text-2xl font-light"></i>
        <div className='text-xs px-1 pt-2 capitalize'>{props.name}</div>
    </a>
  )
}

export default Folder