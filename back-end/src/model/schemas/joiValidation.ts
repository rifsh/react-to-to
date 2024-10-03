import Joi from 'joi';
import { UserRegistration } from '../interfaces/user.interface';

export const userSchema: Joi.ObjectSchema<UserRegistration> = Joi.object({
    fullName: Joi.string().min(3).max(30).required().messages({
        'string.empty': 'Full name is required',
        'string.min': 'Full name should have at least 3 characters',
        'any.required': 'Full name is required'
    }),
    userName: Joi.string().min(3).max(20).required(),
    password: Joi.string().min(6).required(),
    email: Joi.string().email().required(),
    tasks: Joi.array().items(Joi.string()),
    createdAt: Joi.date().default(Date.now),
    isActive: Joi.boolean().default(true)
});