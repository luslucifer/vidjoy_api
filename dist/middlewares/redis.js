"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rClient = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
exports.rClient = new ioredis_1.default("rediss://default:38130b08159b4caca095767ac25891e4@immortal-amoeba-48047.upstash.io:48047");
// await client.set('foo', 'bar');
