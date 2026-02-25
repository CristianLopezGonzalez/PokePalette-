import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import './models/index.js';
import './models/associations.js';
import authRoutes from './routes/auth.routes.js';
import pokemonRoutes from './routes/pokemon.routes.js';
import favoriteRoutes from './routes/favorite.routes.js';
import collectionRoutes from './routes/collection.routes.js';
import commentRoutes from './routes/comment.routes.js';
import adminRoutes from './routes/admin.routes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use('/api/auth', authRoutes);
app.use('/api/pokemon', pokemonRoutes);
app.use('/api/favorite', favoriteRoutes);
app.use('/api/collections', collectionRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/admin', adminRoutes);

app.get('/', (req, res) => {
    res.json(
        {
            message:'PokePalette API funcionando',
            success:true,
            data:{

            }
        }
    )
})

app.listen(PORT, () => {
    console.log(`🎨 Server start in http://localhost:${PORT} 🎨`);
})