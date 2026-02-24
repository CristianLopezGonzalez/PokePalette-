import express from 'express';
import pokemonController from '../controllers/pokemonController.js';

const router = express.Router();

router.get("/:name",pokemonController.getPokemonPalette)

export default router