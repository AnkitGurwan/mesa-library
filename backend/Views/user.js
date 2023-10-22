import express from 'express';
import { sendFeedbackEmail } from '../Controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/user/feedback',sendFeedbackEmail);

export default userRouter;