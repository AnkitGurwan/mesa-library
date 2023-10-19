import React,{useContext,useEffect,useState} from 'react';
import Folder from './userFolder2'
import File from './userFile2'
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import Upload from "./userUpload2";

import { useDispatch, useSelector } from 'react-redux';
import AuthContext from '../../context/auth/AuthContext';
import { setUserUpdatePath } from '../../redux/storage/storageSlice';
import Lottie from './lottie';

const Home = () => {
    const { GetDetails } = useContext(AuthContext);
    const dispatch = useDispatch();
    const { subExams } = useParams();
    const Navigate = useNavigate();
    const [pathState,setPathState] = useState("");
    const allFoldersName =  useSelector(state => state.Files.allFoldersNameStore);
    const foldersName = allFoldersName.filter((eachFolder)=>{return eachFolder.parent === subExams});

    const allFilesName = useSelector(state => state.Files.allFilesNameStore);
    const filesName = allFilesName.filter((eachFolder)=>{return eachFolder.parent === subExams});

    const allUploadFilesName= useSelector(state => state.Files.allUploadedFilesNameStore);
    const uploadFilesName = allUploadFilesName.filter((eachFolder)=>{return eachFolder.parent === subExams});

    var path =  useSelector(state => state.Files.userPath);
    
    const getItem = async () => {
        await GetDetails();
        const x = localStorage.getItem('pathAdmin');
        var str = "";
        var pathArray = ["main"];
        for(let i=0; i<x.length;i++)
        {
            if(x[i]==='$')
            {
                pathArray.push(str);
                if(str === subExams)break;
                str = "";
                
            }
            else str+=x[i];
        }
        path = pathArray;
        setPathState(path);
    }

    useEffect(()=>{
        getItem();
    },[]);

    const pathHandler = (e) => {
        const value = e.target.innerText.toLowerCase();
        dispatch(setUserUpdatePath(value));
        var x = "";
        var y = "";
        for(let i=0;i<pathState.length;i++)
        {
            x += "/";
            x += pathState[i];
            if(i != 0)
            {
                y += pathState[i];
                y+="$";
            }
            if(value === pathState[i])
            break;
            
        }
        localStorage.setItem('pathAdmin',y);
        Navigate(`${x}`);
    }

  return (
    <div className='relative h-screen bg-[#05386B]'>
        <div className='w-full h-16 text-end flex items-center justify-end bg-[#5CDB95] font-semibold text-white absolute top-0'>
            <button onClick={()=>{Navigate('/')}} className='hover:underline hover:scale-105 py-1 px-2 h-8 mr-4 rounded-sm cursor-pointer text-xl'>Log Out</button>
        </div>
        <div className='flex justify-between items-center py-4 text-xl bg-[#5CDB95] font-bold text-white absolute top-16 w-full h-16'>
            <div className='flex mx-6'>
                {
                pathState
                ?
                pathState.map((indPath)=>{return <div className='flex items-center mr-1'><button onClick={pathHandler} className='mr-3 cursor-pointer capitalize hover:bg-gray-200 px-1 rounded-sm hover:text-black'>{indPath}</button>
                <div className='mr-3'>{`>`}</div></div>}):""
                }
                
            </div>
        </div>
            
        <div className='absolute top-32 w-full h-auto'>

        {foldersName.length?
        <div className='overflow-y-hidden w-full flex flex-col pb-6 font-medium'>
            <div className='text-start py-6 pl-12 font-bold text-white text-3xl'>All Courses</div>
            <div className="grid grid-cols-4 gap-4 mx-10 my-4 w-2/3">
                {foldersName.length ? foldersName.map((folder) => (
                    <div><Folder key={folder.userId} parent={folder.parent} name={folder.name}/></div>
                )) 
                :
                 ""}
        </div>
                                
        </div>
        :""}
        {filesName.length?
        <div className='flex flex-col border-b pb-4 text-white'>
            <div className='text-start pt-4 pl-12 font-semibold text-xl'>Information Files</div>
            <div className="flex mx-10 my-8">
                {filesName.length ? filesName.map((file) => (
                    <div><File key={file.userId} name={file.createdBy} description={file.description} year={file.year} topic={file.name}/></div>
                )) 
                :
                 ""}
            </div>
                                
        </div>
        :
        ""}

        {uploadFilesName.length?
        <div className=' text-white flex flex-col border-b pb-4'>
            <div className='text-start pt-4 pl-12 font-semibold text-xl'>Files/PDF's</div>
            <div className="flex mx-10 my-8 ">
                {uploadFilesName.length ? uploadFilesName.map((upload) => (
                    <div><Upload key={upload.userId} name={upload.name} url={upload.url}/></div>
                )) 
                :
                 ""}
            </div>
                                
        </div>
        :
        ""}
        </div>

        
    <div className='absolute bottom-0 right-0'><Lottie/></div>

            
    </div>
  )
}

export default Home