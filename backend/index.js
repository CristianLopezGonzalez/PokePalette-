import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import './models/index.js'
import './models/associations.js'
import authRoutes from './routes/auth.routes.js'


const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes)

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