import Joi, { ValidationError } from "joi";
import { UserDto } from "../user/user.dto";

export const loginValidation = (dto: UserDto): {error: ValidationError | undefined, value: any} =>{
    const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required(),
    }).unknown(true);
    const { error, value } = schema.validate(dto);
    return {error, value}
}