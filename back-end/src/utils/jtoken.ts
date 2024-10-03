import jwt from 'jsonwebtoken';

export const userToken = (id: string) => {
    return jwt.sign({ id }, process.env.JWT_STRING, {
        expiresIn: 86400000
    })
}
