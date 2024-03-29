import express, { Request, Response } from 'express';
import { Home } from './routes/home';
import { Movie } from './routes/movie';
import { Tv } from './routes/tv';
import { Anime } from './routes/anime';
const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send(Home());
});

app.get('/movie/:id',async (req:Request,res:Response)=>{
    const id = req.params.id
    const movie = await Movie(id)
    res.send(movie)
})

app.get('/tv/:id/:ss/:ep',async(req:Request,res:Response)=>{
    const {id,ss,ep} = req.params
    const tv = await Tv(id,ss,ep)
    res.send(tv)
})

app.get('/anime/:id/:ep/:type',async (req:Request,res:Response)=>{
    const {id,ep,type} = req.params
    const anime =await Anime(id,ep,type)
    res.send(anime)

})





app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});