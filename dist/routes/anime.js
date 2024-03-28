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
exports.Anime = void 0;
const axios_1 = __importDefault(require("axios"));
const movie_1 = require("./movie");
const redis_1 = require("../middlewares/redis");
function Anime(id, ep, type) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = `https://www.moviekex.online/anime/${id}/${ep}/${type}`;
        const tvId = id + '_' + ep + '_' + type;
        try {
            const t = yield redis_1.rClient.get(tvId);
            if (t != null) {
                try {
                    let obj = JSON.parse(t);
                    let res = yield axios_1.default.get(obj[0].url);
                    if (res.status >= 200 && res.status < 300) {
                        console.log('fuck off');
                        return obj;
                    }
                    else {
                        return (0, movie_1.secondOp)(url, t, tvId);
                    }
                }
                catch (error) {
                    console.error(`err in mv axios : ${error}`);
                    return (0, movie_1.secondOp)(url, t, tvId);
                }
            }
            else if (t == null) {
                return (0, movie_1.secondOp)(url, t, tvId);
            }
        }
        catch (error) {
            return `id ${tvId} not found `;
        }
    });
}
exports.Anime = Anime;
