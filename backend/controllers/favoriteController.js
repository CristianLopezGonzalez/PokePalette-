import  Favorito  from '../models/Favorito.js';
class favoriteController {
    static async addFavorite(req, res) {
        const paleta_id = req.params.paleta_id;
        const user_id = req.user.id;
        try {
            const existeFav = await Favorito.findOne({where:{usuario_id: user_id,paleta_id: paleta_id}})

            if(existeFav){
                return res.status(400).json({
                    success: false,
                    message: 'Favorito already exists',
                })
            }

            const addFav = await Favorito.create({
                usuario_id:user_id,
                paleta_id:paleta_id,
            })

            return res.status(201).json({ success: true, message: 'Favorito added', favorito: addFav })

        }catch (e){
            console.error(e);
            return res.status(500).json({ success: false, message: 'Internal Server Error' })
        }

    }

    static async removeFavorite(req, res) {
        try {
            const paleta_id = req.params.paleta_id;
            const user_id = req.user.id;

            const fav = await Favorito.findOne({ where: { usuario_id: user_id, paleta_id: paleta_id } })
            if (!fav) {
                return res.status(404).json({ success: false, message: 'Favorito not found' })
            }
            await fav.destroy()
            return res.status(200).json({ success: true, message: 'Favorito removed' })
        }catch (e){
            console.error(e);
            return res.status(500).json({ success: false, message: 'Internal Server Error' })
        }

    }

    static async getUserFavorites(req, res) {
        try {
            const user_id = req.user.id;

            const fav = await Favorito.findAll({where:{usuario_id: user_id}})
            if (fav.length === 0){
                return res.status(404).json({ success: false ,message: "Doesn't have any favorites",})
            }
            return res.status(200).json({ success: true, user: fav })
        }catch (e){
            console.error(e);
            return res.status(500).json({ success: false, message: 'Internal Server Error' })
        }

    }
}

export default favoriteController;