import express from 'express'
import authMiddleware from '../middleware/auth.js'
import CommentsController from '../controllers/commentsController.js'

const router = express.Router()

router.post('/:paleta_id', authMiddleware, CommentsController.createComment)
router.delete('/:comentario_id', authMiddleware, CommentsController.deleteComment)
router.put('/:comentario_id', authMiddleware, CommentsController.updateComment)
router.get('/:paleta_id', CommentsController.getCommentsByPalette)

export default router