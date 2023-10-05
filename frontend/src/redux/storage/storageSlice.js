
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    specificFiles : [],
    allFiles : [],
}

const allprojectsSlice = createSlice({
    name : "allFiles",
    initialState,
    reducers:{
        setAllFiles(state,action){
            return {
                ...state,
                allFiles : action.payload
              };
        },    
        setSpecificFiles(state,action){
            return {
                ...state,
                specificFiles : action.payload
              };
        }
    }
})
export const {setAllFiles , setSpecificFiles} = allprojectsSlice.actions;

export default allprojectsSlice.reducer;



