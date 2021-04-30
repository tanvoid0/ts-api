import validator from 'validator';
import {isEmpty} from "../../helper/helper";
import {UserModel} from "./user.model";

export default class AuthValidator {
    static register = async (data) => {
        let errors = {
            name: undefined,
            email: undefined,
            password: undefined,
            password2: undefined,
        };
        data.name = !isEmpty(data.name) ? data.name : "";
        data.email = !isEmpty(data.email) ? data.email : "";
        data.password = !isEmpty(data.password) ? data.password : "";
        data.password2 = !isEmpty(data.password2) ? data.password2 : "";

        if(validator.isEmpty(data.name)){
            errors.name = "Name field is required";
        }
        if(!validator.isEmail(data.email)){
            errors.email = "Invalid Email";
        }
        if(validator.isEmpty(data.email)){
            errors.email = "Email field is required";
        }
        if(validator.isEmpty(data.password)){
            errors.password = "Password field is required";
        }
        if(validator.isEmpty(data.password2)){
            errors.password2 = "Confirm password is empty";
        }
        if(data.password !== data.password2){
            errors.password2 = "Passwords do not match";
        }
        const user = await UserModel.findOne({email: data.email});
        if(user!=null){
            errors.email = "Email already registered";
        }

        return {
            errors,
            isValid:
                isEmpty(errors.name) &&
                isEmpty(errors.email) &&
                isEmpty(errors.password) &&
                isEmpty(errors.password2),
        };
    }

    static login = (data) => {
        let errors = {
            email: undefined,
            password: undefined,
        };

        data.email = !isEmpty(data.email) ? data.email : "";
        data.password = !isEmpty(data.password) ? data.password : "";

        if(!validator.isEmail(data.email)){
            errors.email = "Invalid Email";
        }
        if(validator.isEmpty(data.email)){
            errors.email = "Email field is required";
        }
        if(validator.isEmpty(data.password)){
            errors.password = "Password field is required";
        }
        return {
            errors,
            isValid: isEmpty(errors.email) && isEmpty(errors.password),
        };
    }
}