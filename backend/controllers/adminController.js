import Usuario from '../models/Usuario.js'
import PokemonPaleta from '../models/PokemonPaleta.js'
import Favorito from '../models/Favorito.js'
import Comentario from '../models/Comentario.js'

class adminController {

    static async getAllUsers(req, res) {
        try {
            const page = parseInt(req.query.page) || 1
            const limit = 25
            const offset = (page - 1) * limit

            const { count, rows } = await Usuario.findAndCountAll({
                attributes: { exclude: ['password'] },
                limit,
                offset,
                order: [['created_at', 'DESC']]
            })

            const totalPages = Math.ceil(count / limit)

            return res.status(200).json({
                success: true,
                users: rows,
                pagination: {
                    totalUsers: count,
                    totalPages,
                    currentPage: page,
                    perPage: limit
                }
            })

        } catch (e) {
            console.error(e)
            return res.status(500).json({ success: false, message: 'Internal Server Error' })
        }
    }

    static async deleteUser(req, res) {
        try {
            const usuarioId = req.params.usuario_id

            const user = await Usuario.findOne({ where: { id: usuarioId } })
            if (!user) {
                return res.status(404).json({ success: false, message: 'User not found' })
            }

            await user.destroy()
            return res.status(200).json({ success: true, message: 'User successfully deleted' })

        } catch (e) {
            console.error(e)
            return res.status(500).json({ success: false, message: 'Internal Server Error' })
        }
    }

    static async changeUserRole(req, res) {
        try {
            const usuarioId = req.params.usuario_id
            const { rol } = req.body

            const validRoles = ['usuario', 'admin']
            if (!validRoles.includes(rol)) {
                return res.status(400).json({ success: false, message: 'Invalid role. Must be usuario or admin' })
            }

            const user = await Usuario.findOne({ where: { id: usuarioId } })
            if (!user) {
                return res.status(404).json({ success: false, message: 'User not found' })
            }

            await user.update({ rol })

            return res.status(200).json({
                success: true,
                message: 'Role updated successfully',
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    rol: user.rol
                }
            })

        } catch (e) {
            console.error(e)
            return res.status(500).json({ success: false, message: 'Internal Server Error' })
        }
    }

    static async getStats(req, res) {
        try {
            const totalUsers = await Usuario.count()
            const totalPaletas = await PokemonPaleta.count()
            const totalFavoritos = await Favorito.count()
            const totalComentarios = await Comentario.count()

            return res.status(200).json({
                success: true,
                stats: {
                    totalUsers,
                    totalPaletas,
                    totalFavoritos,
                    totalComentarios
                }
            })

        } catch (e) {
            console.error(e)
            return res.status(500).json({ success: false, message: 'Internal Server Error' })
        }
    }
}

export default adminController