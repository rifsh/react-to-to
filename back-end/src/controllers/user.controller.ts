import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/asyncHandler";
import { UserLoginCredentilas, UserRegistration } from "../model/interfaces/user.interface";
import { userservices } from "../services/userService";
import { userSchema } from "../model/schemas/joiValidation";
import { JoiErrorValidation } from "../model/interfaces/error.interface";
import { CustomeError } from "../utils/customerror";

const userRegistration = catchAsync(async (req: Request, res: Response) => {
    const userDetails: UserRegistration = req.body;
    const validation: JoiErrorValidation = userSchema.validate(userDetails, { abortEarly: false });
    
    if (validation.error) {
        return res.status(400).json({
            status: 'error',
            message: validation.error.details.map(err => err.message)
        });
    }
    const data = await userservices.userRegistration(userDetails);
    if (data) {
        res.status(201).json({
            message: "User registered successfully"
        })
    } else {
        res.status(500).json({
            message: "Something went wrong"
        })
    }
})
const userLogin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const credentials: UserLoginCredentilas = req.body;
    if (!credentials.userNameOrEmail || !credentials.password) {
        next(new CustomeError('Please provide the credetials', 500))
    }
    const message = await userservices.userLogin(credentials);
    if (message === 'Email or password is incorrect') {
        res.status(404).json({
            message
        })
    } else if (message === 'Username or password is incorrect') {
        res.status(404).json({
            message
        })
    } else if (!message) {
        res.status(409).json({
            message: 'User not found'
        })
    }
    else {
        res.status(200).json({ 
            message,
        })
    }
})

export const userControllers = {
    userRegistration,
    userLogin
}