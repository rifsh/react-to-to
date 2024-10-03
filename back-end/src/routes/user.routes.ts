import express from 'express';
import { userControllers } from '../controllers/user.controller';
import { userImgUpload } from '../middlewares/imageUpload';

const userRoutes = express.Router();

userRoutes.post('/register',userControllers.userRegistration);
userRoutes.post('/login',userControllers.userLogin);

export default userRoutes