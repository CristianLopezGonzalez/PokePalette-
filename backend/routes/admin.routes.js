import express from 'express'
import authMiddleware from '../middleware/auth.js'
import adminMiddleware from '../middleware/admin.js'
import adminController from '../controllers/adminController.js'

const router = express.Router()

router.use(authMiddleware)
router.use(adminMiddleware)

router.get('/users', adminController.getAllUsers)
router.delete('/users/:usuario_id', adminController.deleteUser)
router.put('/users/:usuario_id/role', adminController.changeUserRole)
router.get('/stats', adminController.getStats)

export default router