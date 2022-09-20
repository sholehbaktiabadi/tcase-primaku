import Joi, { ValidationError } from "joi";
import { Role, UserDto } from "./user.dto";
import { joiPasswordExtendCore } from 'joi-password'
const joiPassword = Joi.extend(joiPasswordExtendCore)

export const createUserValidation = (dto: UserDto): {error: ValidationError | undefined, value: any} =>{
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required(),
        role: Joi.string().valid(Role.admin, Role.user).required(),
        password: joiPassword
        .string()
        .min(8)
        .minOfSpecialCharacters(1)
        .minOfLowercase(1)
        .minOfUppercase(1)
        .minOfNumeric(1)
        .required(),
    }).unknown(true);
    const { error, value } = schema.validate(dto);
    return {error, value}
}

export const paramsValidation = (id: number): {error: ValidationError | undefined, value: any} =>{
    const schema = Joi.number().required()
    const { error, value } = schema.validate(id);
    return {error, value}
}

export const updateUserValidation = (dto: UserDto): {error: ValidationError | undefined, value: any} =>{
    const schema = Joi.object({
        name: Joi.string().optional(),
        email: Joi.string().optional(),
        role: Joi.string().valid(Role.admin, Role.user).optional(),
    }).unknown(true);
    const { error, value } = schema.validate(dto);
    return {error, value}
}

export const updatePasswordValidation = (dto: UserDto): {error: ValidationError | undefined, value: any} =>{
    const schema = Joi.object({
        password: joiPassword
        .string()
        .min(8)
        .minOfSpecialCharacters(1)
        .minOfLowercase(1)
        .minOfUppercase(1)
        .minOfNumeric(1)
        .required(),
    }).unknown(true);
    const { error, value } = schema.validate(dto);
    return {error, value}
}