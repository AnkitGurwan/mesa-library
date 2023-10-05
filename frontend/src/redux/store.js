import { configureStore } from "@reduxjs/toolkit";
import allFilesReducer from "./storage/storageSlice";


const store = configureStore({
    reducer:{
        allFiles : allFilesReducer
    }
})

export default store;