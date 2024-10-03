import { NextFunction, Request, Response } from 'express';
import fs from 'fs'
import cloudinary from 'cloudinary';
import dotenv from 'dotenv';
import multer from 'multer';
import path from 'path';
import { CustomeError } from '../utils/customerror';

dotenv.config({ path: path.join(__dirname, '../../.env') });


const storage = multer.diskStorage({
    destination: '../uploads',
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname)
    }
})

const upload = multer({
    storage,
    limits: { fileSize: 1024 * 1024 }
});

const cloudin = cloudinary.v2;
cloudin.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

export const userImgUpload = (req: Request, res: Response, next: NextFunction) => {
    upload.single("profileImg")(req, res, async (err) => {
        if (err) {
            next(new CustomeError('Not uplaoded', 401));
        }
        try {
            const result = await cloudin.uploader.upload(req.file.path, {
                folder: "userimg"
            })
            req.body.image = result.secure_url;
            fs.unlink(req.file.path, (unlinker) => {
                if (unlinker) {
                    console.log('Error, deleting local file', unlinker);
                }
            })
            next()
        } catch (error) {
            console.log(error);
            next(new CustomeError('Error uploading file to Cloudinary', 404));
        }
    })
} 