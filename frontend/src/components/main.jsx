import React , { useContext,useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/auth/AuthContext';
import { useSearchParams } from 'react-router-dom';

const HomePage = () => {
    const { getToken , logOut ,studInfo ,setStudInfo} = useContext(AuthContext);
    const [ searchParams,setSearchParams ] = useSearchParams();
    const [infoStatus,setInfoStatus] = useState(false)
    const [logoutStatus, setLogoutStatus] = useState(false)
    
    const Navigate = useNavigate();


    const getItem = async () => {
        const code = searchParams.get('code');  

        if(localStorage.getItem('studName') === null && code)
          await getToken(code);

        setInfoStatus(true);

    }

    useEffect(()=>{
        getItem();
        document.body.classList.add("disable-scrolling");
    },[studInfo]);

    setStudInfo({...studInfo, name : localStorage.getItem('studName'), roll : localStorage.getItem('studRoll') , email : localStorage.getItem('studId')});

    const clickHandler = async () => {
        Navigate('/portfolio')
    }

    

    const logOutHandler = async () => {
        setLogoutStatus(true)
        await logOut();
        // Navigate('/');
    }

   

    return (
            <div >
                <div className='w-full'>
                    <div className='w-full h-48 bg-black text-white'>
                        <div className='text-end'>
                            <button className='bg-gray-700 text-white p-2 rounded-md hover:bg-gray-800 my-2 mr-5' onClick={logOutHandler}>Log Out
                            </button>
                        </div>
                        {infoStatus?(
                        <div className='p-2 m-4'>
                            {!logoutStatus?(
                            <>
                                <div className='text-3xl font-bold p-1'>Welcome {studInfo.name} 👋</div>
                                <div className='text-2xl font-semibold px-1 pt-1 pb-10'>{studInfo.roll}</div>
                            </>)
                            :(<div className='text-4xl font-bold p-10'>See you again!</div>)}
                        </div>)
                        :(<div className='text-4xl font-bold p-10'>Loading...</div>)}
                    </div> 
                   

                    {/* Footer
                    <div className='w-full h-48 bg-blue-500 text-white absolute bottom-10 z-1'>
                                Footer
                    </div> */}
                </div>
            </div>
    )
}

export default HomePage;