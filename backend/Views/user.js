import express from 'express';
import { sendFeedbackEmail } from '../Controllers/userController.js';

const userRouter = express.Router();

userRouter.get('/user/feedback',sendFeedbackEmail);

export default userRouter;