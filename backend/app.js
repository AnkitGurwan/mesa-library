import express from 'express';
import cors from 'cors';

import dotenv from "dotenv";
dotenv.config({path:"config/.env"});

const app = express();

const corsOptions = {
    origin : `${process.env.FRONTENDURL}`,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
    allowedHeaders: ['Content-Type' , 'auth-token' , 'Accept' , 'Code' , 'Origin', 'Authorization'],
    credentials: true
}

app.use(cors(corsOptions)); 

app.use(express.json());


import authRouter from "./Views/msAuth.js"
app.use(authRouter);

app.listen(process.env.PORT,(req,res,err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log("Server listening on PORT ", process.env.PORT);
    }
})