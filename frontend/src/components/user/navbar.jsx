import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../images/mesa-logo.png';

const Navbar = () => {
    const Navigate = useNavigate();
    return (
            <div className='w-full h-16 text-end flex items-center justify-between bg-blue-900 font-semibold text-white absolute top-0'>
                <div className='bg-white ml-6 rounded-md'>
                    <img src= {logo} alt="logo" className="h-12 w-32 object-fit" />
                </div>
                <div>
                    <Link className='px-5 text-xl hover:underline tracking-wide' to={'/feedback'}>Feedback</Link>
                    <button onClick={()=>{Navigate('/')}} className='tracking-tight hover:underline hover:scale-105 px-2 mr-5 cursor-pointer text-xl'>Log Out</button>
                </div>
                
            </div>
    )
}

export default Navbar