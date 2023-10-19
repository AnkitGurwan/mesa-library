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
import Navbar from './navbar';

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
                if(str === subExams)
                {
                    dispatch(setUserUpdatePath(pathArray));
                    break;
                }
                str = "";
                
            }
            else str+=x[i];
        }

        var newArray = "";
        for(let i=1; i<pathArray.length; i++)
        {
            newArray+=pathArray[i];
            newArray+="$";
        }
        localStorage.setItem('pathAdmin',newArray);

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
    <div className='relative h-screen'>
        <Navbar/>
        <div className='flex justify-between items-center py-3 text-lg bg-blue-200 font-bold text-gray-600 absolute top-16 w-full h-12'>
            <div className='flex mx-5'>
                {
                pathState
                ?
                pathState.map((indPath) => { return <div className='flex items-center'><button onClick={pathHandler} className='mr-2 cursor-pointer capitalize hover:bg-blue-400 px-1 rounded-sm hover:text-white'>{indPath}</button>
                <div className='mr-2'>{`>`}</div></div>}):""
                }
            </div>
        </div>
            
        <div className='absolute top-28 w-full h-auto'>

        {foldersName.length?
        <div className='overflow-y-hidden w-3/5 rounded-md my-4 ml-6 flex flex-col pb-6 font-medium bg-blue-400'>
            <div className='flex items-center text-white pl-7'>
                <span class="material-symbols-outlined">
                description
                </span>
                <div className='py-4 pl-1 font-bold text-white text-2xl'>All Courses</div>
            </div>
            <div className="grid grid-cols-4 gap-4 mx-6 my-2">
                {foldersName.length ? foldersName.map((folder) => (
                    <div className='mx-2 border-2 border-white'><Folder key={folder.userId} parent={folder.parent} name={folder.name}/></div>
                )) 
                :
                 ""}
        </div>
                                
        </div>
        :""}
        {filesName.length?
        <div className='overflow-y-hidden w-3/5 rounded-md my-4 ml-6 flex flex-col pb-6 font-medium bg-blue-400'>
            <div className='text-start py-4 pl-8 font-bold text-white text-2xl'>Information Files</div>
            <div className="grid grid-cols-5 gap-4 mx-6 my-2">
                {filesName.length ? filesName.map((file) => (
                    <div className='mx-2 border-2 border-white'><File key={file.userId} name={file.createdBy} description={file.description} year={file.year} topic={file.name}/></div>
                )) 
                :
                 ""}
            </div>
                                
        </div>
        :
        ""}

        {uploadFilesName.length?
        <div className='overflow-y-hidden w-3/5 rounded-md mt-6 ml-6 flex flex-col pb-6 font-medium bg-blue-400'>
            <div className='text-start py-4 pl-8 font-bold text-white text-2xl'>Files/PDF's</div>
            <div className="grid grid-cols-5 gap-4 mx-6 my-2 ">
                {uploadFilesName.length ? uploadFilesName.map((upload) => (
                    <div className='mx-2 border-2 text-white text-start overflow-hidden'><Upload key={upload.userId} name={upload.name} url={upload.url}/></div>
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