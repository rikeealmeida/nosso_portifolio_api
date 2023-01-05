"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unauthorizedError = exports.serverError = exports.notFound = exports.badRequest = exports.created = exports.ok = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const protocols_1 = require("../controllers/protocols");
const ok = (body) => ({
    statusCode: protocols_1.HttpStatusCode.OK, body
});
exports.ok = ok;
const created = (body) => ({ statusCode: protocols_1.HttpStatusCode.CREATED, body });
exports.created = created;
const badRequest = (message) => {
    return {
        statusCode: protocols_1.HttpStatusCode.BAD_REQUEST,
        body: message,
    };
};
exports.badRequest = badRequest;
const notFound = (message) => {
    return {
        statusCode: protocols_1.HttpStatusCode.NOT_FOUND_ERROR,
        body: message,
    };
};
exports.notFound = notFound;
const serverError = () => {
    return {
        statusCode: protocols_1.HttpStatusCode.SERVER_ERROR,
        body: 'Something went wrong',
    };
};
exports.serverError = serverError;
const unauthorizedError = (message) => {
    return {
        statusCode: protocols_1.HttpStatusCode.UNAUTHORIZED_ERROR,
        body: message
    };
};
exports.unauthorizedError = unauthorizedError;
