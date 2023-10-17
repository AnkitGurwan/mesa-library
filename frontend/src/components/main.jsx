import React , { useContext,useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/auth/AuthContext';
import { useSearchParams } from 'react-router-dom';
import { BsChevronRight } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Folder from './user/userFolder';
import File from './user/userFile';
import Upload from './admin/upload';
import "./styles.css";

const HomePage = () => {
    const { logOut,GetDetails } = useContext(AuthContext);

    const getItem = async () => {
        await GetDetails();
    }
    
    useEffect(()=>{
        getItem();
        
    },[]);

    const allFoldersName =  useSelector(state => state.Files.allFoldersNameStore);
    const foldersName = allFoldersName.filter((eachFolder)=>{return eachFolder.parent === "root"});

    const allFilesName = useSelector(state => state.Files.allFilesNameStore);
    const filesName = allFilesName.filter((eachFolder)=>{return eachFolder.parent == "root"});

    const allUploadFilesName= useSelector(state => state.Files.allUploadedFilesNameStore);
    const uploadFilesName = allUploadFilesName.filter((eachFolder)=>{return eachFolder.parent == "root"});

    const logOutHandler = async () => {
        localStorage.clear('studName','studId','studRoll','studJob');
        await logOut();
    }

    return (
        <div>
            <div className='w-full ' style={{'background-image': 'linear-gradient(to top left, white 0%, #132d7a 74%)'}}>
                <div className='w-full h-1/2 text-white'>
                    <div className='flex justify-between items-center mx-8 py-4'>
                        <div className='text-3xl font-bold pl-4 pt-4'>MESA Library</div>
                        <button className='text-white text-lg font-semibold hover:underline' onClick={logOutHandler}>Log Out
                        </button>
                    </div>
                    <div className='mx-4 mt-5 flex flex-col items-center'>
                        <div className='text-3xl font-bold p-1'>Welcome Ankit Gurwan 👋</div>
                        <div className='text-xl font-semibold pt-1'>Mechanical Engineer 👨‍🔧</div>
                    </div>
                    <a 
                    href="#material"
                    className='mx-auto flex justify-center items-center w-28 mt-8 border p-2 rounded-lg hover:bg-gray-100 hover:text-black cursor-pointer scroll-smooth'>
                        <div className='mr-2'>Let's Start</div>
                        <BsChevronRight />
                    </a>
                </div>

                {/* material */}
                <div id='material' className='SuperContainer w-full px-4 pt-2 pb-5'>
                    <div className='Container flex flex-col my-4 mx-32' >
                        <div className='text-3xl text-start text-white font-bold pt-2 pb-8 '>ALL SEMESTERS</div>
                        <div className="folders flex flex-wrap justify-center align-center text-center gap-8 mx-8 py-2">
                            {foldersName ? foldersName.map((folder) => (
                                <div className='shrink-1 '>
                                    <Folder key={folder.userId} parent={folder.parent} name={folder.name} />
                                </div>
                            )) 
                            :
                            ""}
                        </div>
                                        
                    </div>

                    
                </div>

                {/* guides */}
                <div id='guides' className='SuperContainer w-full p-4' >
                    <div className='Container flex flex-col pb-4 mx-32'>
                        <div className='p text-2xl text-white font-bold py-6 max-[450px]:text-s'>SEMESTER GUIDES</div>
                        <div className="folder my-4 flex mx-8 py-2 flex-wrap">
                            {filesName ? filesName.map((file) => (
                                <div><File key={file.userId} parent={file.parent} name={file.createdBy} description={file.description} year={file.year} topic={file.name}/></div>
                            )) 
                            :
                            ""}
                        </div>
                                            
                    </div>
                </div>
                
                
            </div>
        </div>
    )
}

export default HomePage;