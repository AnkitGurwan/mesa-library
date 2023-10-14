import React,{useContext,useEffect,useState} from 'react';
import Folder from './userFolder2'
import File from './userFile2'
import fire from '../../config/firebase';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import Upload from "./userUpload2";

import { useDispatch, useSelector } from 'react-redux';
import { setUserUpdatePath } from '../../redux/storage/storageSlice';
import AuthContext from '../../context/auth/AuthContext';

const Home = () => {
    const { GetDetails } = useContext(AuthContext);
    const dispatch = useDispatch();
    const { course } = useParams();
    const Navigate = useNavigate();

    const allFoldersName =  useSelector(state => state.Files.allFoldersNameStore);
    const foldersName = allFoldersName.filter((eachFolder)=>{return eachFolder.parent === course});

    const allFilesName = useSelector(state => state.Files.allFilesNameStore);
    const filesName = allFilesName.filter((eachFolder)=>{return eachFolder.parent == course});

    const allUploadFilesName= useSelector(state => state.Files.allUploadedFilesNameStore);
    const uploadFilesName = allUploadFilesName.filter((eachFolder)=>{return eachFolder.parent == course});

    const path =  useSelector(state => state.Files.userPath);


    const getItem = async () => {
        await GetDetails();
    }
    useEffect(()=>{
        getItem();
    },[]);


    const pathHandler = (e) => {
        dispatch(setUserUpdatePath(e.target.innerText));
        var x = "";
        for(let i=0;i<path.length;i++)
        {
            x+="/";
            x+=path[i];
            if(e.target.innerText === path[i])
            break;
            
        }
        Navigate(`${x}`);
    }

  return (
    <div>
        <div className='w-full h-16 text-end border-b flex items-center justify-end'>
            <button onClick={()=>{Navigate('/')}} className='text-white bg-black py-1 px-2 h-8 mr-4 rounded-sm cursor-pointer'>Log Out</button>
        </div>
        <div className='flex justify-between items-center py-3 border-b'>
            <div className='flex mx-6'>
                {
                path
                ?
                path.map((indPath) => { return <div className='flex items-center mr-1'><button onClick={pathHandler} className='mr-3 cursor-pointer'>{indPath}</button>
                <div className='mr-3'>{`>`}</div></div>}):""
                }
            </div>
        </div>
        <div className='flex flex-col border-b pb-6'>
            <div className='text-start pt-4 pl-12 font-semibold text-xl'>All Courses</div>
            <div className="grid grid-cols-6 gap-4 mx-8 my-8">
                {foldersName.length ? foldersName.map((folder) => (
                    <div><Folder key={folder.userId} parent={folder.parent} name={folder.name}/></div>
                )) 
                :
                 ""}
            </div>
                                
        </div>
        {filesName.length?
        <div className='flex flex-col border-b pb-4'>
            <div className='text-center pt-2 pb-3'>Created Files</div>
            <div className="flex mx-8">
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
        <div className='flex flex-col border-b pb-4'>
            <div className='text-center pt-2 pb-3'>Uploaded Files</div>
            <div className="flex mx-8">
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
  )
}

export default Home