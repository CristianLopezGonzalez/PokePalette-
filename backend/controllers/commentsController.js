import Comentario from '../models/Comentario.js'
import PokemonPaleta from '../models/PokemonPaleta.js'

class CommentsController {

    static async createComment(req, res) {
        try {
            const userId = req.user.id
            const paletaId = req.params.paleta_id
            const comment = req.body.texto

            const paletaExist = await PokemonPaleta.findOne({ where: { id: paletaId } })
            if (!paletaExist) {
                return res.status(404).json({ success: false, message: 'Palette not found' })
            }

            const createComment = await Comentario.create({ usuario_id: userId, paleta_id: paletaId, texto: comment })
            return res.status(201).json({ success: true, message: 'Comment successfully created', comment: createComment })

        } catch (e) {
            console.error(e)
            return res.status(500).json({ success: false, message: 'Internal Server Error' })
        }
    }

    static async deleteComment(req, res) {
        try {
            const userId = req.user.id
            const commentId = req.params.comentario_id

            const comment = await Comentario.findOne({ where: { id: commentId } })
            if (!comment) {
                return res.status(404).json({ success: false, message: 'Comment not found' })
            }

            if (comment.usuario_id !== userId && req.user.rol !== 'admin') {
                return res.status(403).json({ success: false, message: 'Not authorized' })
            }

            await comment.destroy()
            return res.status(200).json({ success: true, message: 'Comment successfully deleted' })

        } catch (e) {
            console.error(e)
            return res.status(500).json({ success: false, message: 'Internal Server Error' })
        }
    }

    static async updateComment(req, res) {
        try {
            const userId = req.user.id
            const commentId = req.params.comentario_id
            const comment = req.body.texto

            const isYourComment = await Comentario.findOne({ where: { id: commentId, usuario_id: userId } })
            if (!isYourComment) {
                return res.status(403).json({ success: false, message: 'Not authorized' })
            }

            await isYourComment.update({ texto: comment })
            return res.status(200).json({ success: true, message: 'Comment successfully updated' })

        } catch (e) {
            console.error(e)
            return res.status(500).json({ success: false, message: 'Internal Server Error' })
        }
    }

    static async getCommentsByPalette(req, res) {
        try {
            const paletaId = req.params.paleta_id

            const getComments = await Comentario.findAll({ where: { paleta_id: paletaId } })
            if (getComments.length === 0) {
                return res.status(200).json({ success: true, message: 'No comments found', comments: [] })
            }

            return res.status(200).json({ success: true, comments: getComments })

        } catch (e) {
            console.error(e)
            return res.status(500).json({ success: false, message: 'Internal Server Error' })
        }
    }
}

export default CommentsController