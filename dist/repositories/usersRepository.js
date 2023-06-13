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
exports.GetUserByEmail = exports.GetUserById = exports.AddUser = exports.UpdateUser = exports.GetAllUsers = void 0;
const user_1 = require("../models/user");
const GetAllUsers = function () {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield user_1.User.find({});
            return users;
        }
        catch (e) {
            return e;
        }
    });
};
exports.GetAllUsers = GetAllUsers;
const UpdateUser = function (_user) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = user_1.User.build(_user);
            yield user.updateOne(user);
            return user;
        }
        catch (e) {
            return e;
        }
    });
};
exports.UpdateUser = UpdateUser;
const AddUser = function (_user) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = user_1.User.build(_user);
            yield user.save();
            console.log("USERDOC", user);
            //TODO: NK remove passeword=> map response
            const clean = Object.assign(Object.assign({}, user), { password: "" });
            return user;
        }
        catch (e) {
            // return e as IMongoError;
            return { code: 400, message: e };
        }
    });
};
exports.AddUser = AddUser;
const GetUserById = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield user_1.User.find({ _id: id });
            return users[0];
        }
        catch (e) {
            return e;
        }
    });
};
exports.GetUserById = GetUserById;
const GetUserByEmail = function (email) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield user_1.User.find({ email: email });
            const data = users[0];
            return data._doc;
        }
        catch (e) {
            return e;
        }
    });
};
exports.GetUserByEmail = GetUserByEmail;
//# sourceMappingURL=usersRepository.js.map