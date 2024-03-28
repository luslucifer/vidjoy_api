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
exports.Movie = exports.secondOp = void 0;
const axios_1 = __importDefault(require("axios"));
const redis_1 = require("../middlewares/redis");
function secondOp(url, t, id) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield axios_1.default.get(url);
        const data = res.data;
        console.log(res.data);
        console.log(t);
        yield redis_1.rClient.set(id, JSON.stringify(data), 'EX', 86400); // will expire in 24 hh 
        return data;
    });
}
exports.secondOp = secondOp;
function Movie(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = `https://www.moviekex.online/movie/${id}`;
        try {
            const t = yield redis_1.rClient.get(id);
            if (t != null) {
                try {
                    let obj = JSON.parse(t);
                    let res = yield axios_1.default.get(obj.m3u8[0]);
                    if (res.status >= 200 && res.status < 300) {
                        console.log('fuck off');
                        return obj;
                    }
                    else {
                        return secondOp(url, t, id);
                    }
                }
                catch (error) {
                    console.error(`err in mv axios : ${error}`);
                    return secondOp(url, t, id);
                }
            }
            else if (t == null) {
                return secondOp(url, t, id);
            }
        }
        catch (error) {
            return `id ${id} not found `;
        }
    });
}
exports.Movie = Movie;
