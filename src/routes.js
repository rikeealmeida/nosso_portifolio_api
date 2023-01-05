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
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const create_user_1 = require("./controllers/user/create-user/create-user");
const delete_user_1 = require("./controllers/user/delete-user/delete-user");
const get_user_1 = require("./controllers/user/get-user/get-user");
const get_users_1 = require("./controllers/user/get-users/get-users");
const update_user_1 = require("./controllers/user/update-user/update-user");
const mongo_create_user_1 = require("./repositories/user/create-user/mongo-create-user.");
const mongo_delete_user_1 = require("./repositories/user/delete-user/mongo-delete-user");
const mongo_get_user_1 = require("./repositories/user/get-user/mongo-get-user");
const mongo_get_users_1 = require("./repositories/user/get-users/mongo-get-users");
const mongo_update_user_1 = require("./repositories/user/update-user/mongo-update-user");
exports.routes = (0, express_1.Router)();
exports.routes.get("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mongoGetUsersRepository = new mongo_get_users_1.MongoGetUsersRepository();
    const getUsersController = new get_users_1.GetUsersController(mongoGetUsersRepository);
    const { body, statusCode } = yield getUsersController.handle();
    res.status(statusCode).send(body);
}));
exports.routes.get("/users/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mongoGetUserRepository = new mongo_get_user_1.MongoGetUserRepository();
    const getUserController = new get_user_1.GetUserController(mongoGetUserRepository);
    const { body, statusCode } = yield getUserController.handle({
        params: req.params
    });
    res.status(statusCode).send(body);
}));
exports.routes.post("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mongoCreateUserRepository = new mongo_create_user_1.MongoCreateUserRepository();
    const createUserController = new create_user_1.CreateUserController(mongoCreateUserRepository);
    const { body, statusCode } = yield createUserController.handle({
        body: req.body,
    });
    res.status(statusCode).send(body);
}));
exports.routes.patch("/users/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mongoUpdateUserRepository = new mongo_update_user_1.MongoUpdateUserRepository();
    const updateUserController = new update_user_1.UpdateUserController(mongoUpdateUserRepository);
    const { body, statusCode } = yield updateUserController.handle({
        body: req.body,
        params: req.params,
    });
    res.status(statusCode).send(body);
}));
exports.routes.delete("/users/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mongoDeleteUserRepository = new mongo_delete_user_1.MongoDeleteUserRepository();
    const deleteUserController = new delete_user_1.DeleteUserController(mongoDeleteUserRepository);
    const { body, statusCode } = yield deleteUserController.handle({
        params: req.params,
    });
    res.status(statusCode).send(body);
}));
