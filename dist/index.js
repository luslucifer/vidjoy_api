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
const express_1 = __importDefault(require("express"));
const home_1 = require("./routes/home");
const movie_1 = require("./routes/movie");
const tv_1 = require("./routes/tv");
const anime_1 = require("./routes/anime");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send((0, home_1.Home)());
});
app.get('/movie/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const movie = yield (0, movie_1.Movie)(id);
    res.send(movie);
}));
app.get('/tv/:id/:ss/:ep', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, ss, ep } = req.params;
    const tv = yield (0, tv_1.Tv)(id, ss, ep);
    res.send(tv);
}));
app.get('/anime/:id/:ep/:type', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, ep, type } = req.params;
    const anime = yield (0, anime_1.Anime)(id, ep, type);
    res.send(anime);
}));
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
