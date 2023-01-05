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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserController = void 0;
const validator_1 = __importDefault(require("validator"));
const helpers_1 = require("../../../helpers/helpers");
const mongo_1 = require("../../../database/mongo");
const bcrypt_1 = __importDefault(require("bcrypt"));
class CreateUserController {
    constructor(createuserRepository) {
        this.createuserRepository = createuserRepository;
    }
    handle(httpRequest) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const requiredFields = [
                    "firstName",
                    "lastName",
                    "email",
                    "password"
                ];
                for (const field of requiredFields) {
                    if (!((_b = (_a = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.body) === null || _a === void 0 ? void 0 : _a[field]) === null || _b === void 0 ? void 0 : _b.length))
                        return (0, helpers_1.badRequest)(`Field ${field} is required`);
                }
                if (!httpRequest.body) {
                    return (0, helpers_1.badRequest)("Missing fields!");
                }
                const emailIsValid = validator_1.default.isEmail(httpRequest.body.email);
                if (!emailIsValid) {
                    return (0, helpers_1.badRequest)('E-mail is invalid!');
                }
                const { firstName, lastName, password, imageUrl, jobs, resume, telNumber, title, email, githubUrl, instagramUrl, linkedinUrl } = httpRequest.body;
                const userFIelds = yield mongo_1.MongoClient.db.collection('users').findOne({
                    $or: [
                        { email },
                        { githubUrl },
                        { instagramUrl },
                        { linkedinUrl },
                    ]
                });
                const registeredFields = [];
                for (const key in userFIelds) {
                    switch (key) {
                        case 'email':
                            if (userFIelds[key] === email) {
                                registeredFields.push(key);
                            }
                            break;
                        case 'githubUrl':
                            if (userFIelds[key] === githubUrl) {
                                registeredFields.push(key);
                            }
                            break;
                        case 'linkedinUrl':
                            if (userFIelds[key] === linkedinUrl) {
                                registeredFields.push(key);
                            }
                            break;
                        case 'instagramUrl':
                            if (userFIelds[key] === instagramUrl) {
                                registeredFields.push(key);
                            }
                            break;
                    }
                }
                if (registeredFields.length > 0) {
                    return (0, helpers_1.badRequest)(`Some fields are already registered: ${registeredFields}`);
                }
                const hashPassword = yield bcrypt_1.default.hash(password, 10);
                const newUser = yield this.createuserRepository.createUser({
                    firstName,
                    lastName,
                    password: hashPassword,
                    email,
                    githubUrl,
                    imageUrl,
                    instagramUrl,
                    jobs,
                    linkedinUrl,
                    resume,
                    telNumber,
                    title,
                });
                const { password: _ } = newUser, user = __rest(newUser, ["password"]);
                return (0, helpers_1.created)(user);
            }
            catch (error) {
                return (0, helpers_1.serverError)();
            }
        });
    }
}
exports.CreateUserController = CreateUserController;
