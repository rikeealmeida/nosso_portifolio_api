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
exports.MongoClient = void 0;
const mongodb_1 = require("mongodb");
exports.MongoClient = {
    client: undefined,
    db: undefined,
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            const url = process.env.MONGO_URL || "localhost:27018";
            const username = process.env.MONGO_USERNAME;
            const password = process.env.MONGO_PASSWORD;
            try {
                const client = new mongodb_1.MongoClient(url, { auth: { username, password } });
                yield client.connect();
                const db = client.db("portifolio-db");
                this.client = client;
                this.db = db;
                console.log("connected to mongodb!");
            }
            catch (error) {
                console.log("cant connect to mongodb!");
            }
        });
    },
};
