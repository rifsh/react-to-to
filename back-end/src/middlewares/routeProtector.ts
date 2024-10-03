import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/asyncHandler";
import { CustomeError } from "../utils/customerror";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { UserModel } from "../model/schemas/user.schema";

const userRouteProtection = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // read Token
    let token: string = '';
    const headerToken: string = req.headers.authorization;

    if (headerToken && headerToken.startsWith('Bearer')) {
        token = headerToken.split(' ')[1];
    }
    if (!token) {
        next(new CustomeError('Please login !!', 405));
    }

    const tokenDecode: JwtPayload = jwt.verify(token, process.env.JWT_STRING) as JwtPayload;
    let user = await UserModel.findById(tokenDecode.id);
    if (!user) {
        next(new CustomeError('User is not present', 401));
    }
    if (user) {
        next();
    }
})

export {
    userRouteProtection
}