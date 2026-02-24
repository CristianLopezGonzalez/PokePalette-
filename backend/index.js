import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import './models/index.js'
import './models/associations.js'
import authRoutes from './routes/auth.routes.js'
import pokemonRoutes from './routes/pokemon.routes.js'
import favoriteRoutes from './routes/favorite.routes.js'
import collectionRoutes from './routes/collection.routes.js'

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes)
app.use('/api/pokemon', pokemonRoutes)
app.use('/api/favorite', favoriteRoutes)
app.use('/api/collections', collectionRoutes)

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
    console.log(`🎨 Server start in http://localhost:${PORT} 🎨`)
})