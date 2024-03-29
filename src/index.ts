import express, { Request, Response } from 'express';
import path from 'path';
import { Home } from './routes/home';
import { Movie } from './routes/movie';
import { Tv } from './routes/tv';
import { Anime } from './routes/anime';
const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.json());

// Set the views directory to the 'templates' folder
// app.set('views', path.join(__dirname, 'templates'));

// // Set EJS as the template engine
// app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
    try {
        const htmlContent = await Home();
        res.send(htmlContent); // Send the HTML content as the response
    } catch (error) {
        console.error('Error rendering home page:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/movie/:id',async (req:Request,res:Response)=>{
    const id = req.params.id
    const movie = await Movie(id)
    res.send(movie)
});

app.get('/tv/:id/:ss/:ep',async(req:Request,res:Response)=>{
    const {id,ss,ep} = req.params
    const tv = await Tv(id,ss,ep)
    res.send(tv)
});

app.get('/anime/:id/:ep/:type',async (req:Request,res:Response)=>{
    const {id,ep,type} = req.params
    const anime =await Anime(id,ep,type)
    res.send(anime)
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
