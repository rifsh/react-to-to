import Joi from "joi";

export interface JoiErrorValidation {
    error: Joi.ValidationError,
    value,
}