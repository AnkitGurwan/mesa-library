import express from 'express';
import cors from 'cors';

import dotenv from "dotenv";
dotenv.config({path:"config/.env"});

const corsOptions = {
    origin : `${process.env.FRONTENDURL}`,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
    allowedHeaders: ['Content-Type' , 'auth-token' , 'Accept' , 'Code' , 'Origin', 'Authorization'],
    credentials: true
}

app.use(cors(corsOptions)); 

const app = express();

app.use(express.json());

app.use(authRouter);

app.listen(process.env.PORT,(req,res,err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log("Server listening on PORT ", process.env.PORT);
    }
})