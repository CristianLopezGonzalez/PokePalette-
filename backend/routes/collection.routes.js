import express from 'express'
import authMiddleware from '../middleware/auth.js'
import collectionController from '../controllers/collectionController.js'

const router = express.Router()

router.use(authMiddleware)

router.post('/', collectionController.createCollection)
router.get('/', collectionController.getUserCollections)
router.put('/:coleccion_id', collectionController.updateCollection)
router.post('/:collection_id/paleta', collectionController.addPaletteToCollection)
router.delete('/:collection_id/paleta/:paleta_id', collectionController.removePaletteFromCollection)
router.delete('/:coleccion_id', collectionController.deleteCollection)

export default router