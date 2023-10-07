
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    path : ["root"],
    specificFiles : [],
    allFoldersNameStore : [],
    allFilesNameStore : [],
    allUploadedFilesNameStore : []
}

const allprojectsSlice = createSlice({
    name : "Files",
    initialState,
    reducers:{
        setReduxFolders(state,action){
            return {
                ...state,
                allFoldersNameStore : action.payload
              };
        },    
        setReduxFiles(state,action){
            return {
                ...state,
                allFilesNameStore : action.payload
              };
        },    
        setReduxUploadedFiles(state,action){
            return {
                ...state,
                allUploadedFilesNameStore : action.payload
              };
        },    
        setSpecificFiles(state,action){
            return {
                ...state,
                specificFiles : action.payload
              };
        },
        setPath(state,action){
            return {
                ...state,
                path : [ ...state.path, action.payload]
            }
        },
        setUpdatePath(state,action){
            let ans = state.path;
            let final = [];
            for(let i=0;i<ans.length;i++)
            {
                final.push(ans[i]);
                if(ans[i]===action.payload)break;
            }
            return {
                ...state,
                path : final
            }
        }
    }
});
export const {setReduxFiles,setReduxFolders,setReduxUploadedFiles , setSpecificFiles , setPath ,setUpdatePath} = allprojectsSlice.actions;

export default allprojectsSlice.reducer;



