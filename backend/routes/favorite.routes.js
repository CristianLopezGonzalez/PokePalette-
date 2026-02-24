import express  from "express";
import authMiddleware from '../middleware/auth.js'
import favoriteController from "../controllers/favoriteController.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/:paleta_id",favoriteController.addFavorite)
router.delete("/:paleta_id",favoriteController.removeFavorite)
router.get("/",favoriteController.getUserFavorites)

export default router;

