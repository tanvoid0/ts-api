"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validator_1 = __importDefault(require("validator"));
const helper_1 = require("../../helper/helper");
const user_model_1 = require("./user.model");
class AuthValidator {
}
exports.default = AuthValidator;
AuthValidator.register = (data) => __awaiter(void 0, void 0, void 0, function* () {
    let errors = {
        name: undefined,
        email: undefined,
        password: undefined,
        password2: undefined,
    };
    data.name = !helper_1.isEmpty(data.name) ? data.name : "";
    data.email = !helper_1.isEmpty(data.email) ? data.email : "";
    data.password = !helper_1.isEmpty(data.password) ? data.password : "";
    data.password2 = !helper_1.isEmpty(data.password2) ? data.password2 : "";
    if (validator_1.default.isEmpty(data.name)) {
        errors.name = "Name field is required";
    }
    if (!validator_1.default.isEmail(data.email)) {
        errors.email = "Invalid Email";
    }
    if (validator_1.default.isEmpty(data.email)) {
        errors.email = "Email field is required";
    }
    if (validator_1.default.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }
    if (validator_1.default.isEmpty(data.password2)) {
        errors.password2 = "Confirm password is empty";
    }
    if (data.password !== data.password2) {
        errors.password2 = "Passwords do not match";
    }
    const user = yield user_model_1.UserModel.findOne({ email: data.email });
    if (user != null) {
        errors.email = "Email already registered";
    }
    return {
        errors,
        isValid: helper_1.isEmpty(errors.name) &&
            helper_1.isEmpty(errors.email) &&
            helper_1.isEmpty(errors.password) &&
            helper_1.isEmpty(errors.password2),
    };
});
AuthValidator.login = (data) => {
    let errors = {
        email: undefined,
        password: undefined,
    };
    data.email = !helper_1.isEmpty(data.email) ? data.email : "";
    data.password = !helper_1.isEmpty(data.password) ? data.password : "";
    if (!validator_1.default.isEmail(data.email)) {
        errors.email = "Invalid Email";
    }
    if (validator_1.default.isEmpty(data.email)) {
        errors.email = "Email field is required";
    }
    if (validator_1.default.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }
    return {
        errors,
        isValid: helper_1.isEmpty(errors.email) && helper_1.isEmpty(errors.password),
    };
};
//# sourceMappingURL=auth.validator.js.map