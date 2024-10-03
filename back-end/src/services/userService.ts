import { Types } from "joi";
import { UserLoginCredentilas, UserRegistration } from "../model/interfaces/user.interface"
import { UserModel } from "../model/schemas/user.schema"
import { userToken } from "../utils/jtoken";

const userRegistration = async (userDetails: UserRegistration): Promise<boolean> => {
    try {
        const data = await UserModel.create(userDetails);
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

const userLogin = async (loginCredentials: UserLoginCredentilas): Promise<{ token: string, userId: string | unknown } | string> => {
    try {
        const emailUser = await UserModel.findOne({ email: loginCredentials.userNameOrEmail });
        const userUserName = await UserModel.findOne({ userName: loginCredentials.userNameOrEmail });
        if (emailUser) {
            if (emailUser && await emailUser.comparePassword(loginCredentials.password, emailUser.password)) {
                const token = userToken(emailUser.id);
                const id: string = emailUser._id as unknown as string
                const data = {
                    token,
                    userId: emailUser._id
                }

                return data;
            } else {
                return 'Email or password is incorrect'
            }
        }

        if (userUserName) {
            if (userUserName) {
                if (userUserName && await userUserName.comparePassword(loginCredentials.password, userUserName.password)) {
                    const token = userToken(userUserName.id);
                    const id: string = userUserName._id as unknown as string
                    const data = {
                        token,
                        userId: userUserName._id
                    }

                    return data
                } else {
                    return 'Username or password is incorrect'
                }
            }
        }

    } catch (error) {
        console.log(error);
        return error.message
    }
}

export const userservices = {
    userRegistration,
    userLogin
}