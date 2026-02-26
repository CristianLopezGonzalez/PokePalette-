import { PokemonPaleta } from '../models/associations.js'
import PokeApiService from '../services/pokeApiService.js'
import extractColors from '../services/colorExtractor.js'

class pokemonController {
    static async getPokemonPalette(req, res) {
        try {
            const name = req.params.name.toLowerCase()

            const paletaExists = await PokemonPaleta.findOne({ where: { pokemon_name: name } })
            if (paletaExists) {
                return res.json({ success: true, paleta: paletaExists.dataValues })
            }

            const pokeApi = new PokeApiService()
            const pokemonData = await pokeApi.extractDataByPokemonName(name)

            const colors = await extractColors(pokemonData.sprite_url)
            const colorsShiny = await extractColors(pokemonData.sprite_url_shiny)

            const newPaleta = await PokemonPaleta.create({
                pokemon_id: pokemonData.pokemon_id,
                pokemon_name: pokemonData.pokemon_name,
                sprite_url: pokemonData.sprite_url,
                sprite_url_shiny: pokemonData.sprite_url_shiny,
                tipo: pokemonData.tipo,
                tipo2: pokemonData.tipo2,
                height: pokemonData.height,
                weight: pokemonData.weight,
                hp: pokemonData.hp,
                attack: pokemonData.attack,
                defense: pokemonData.defense,
                special_attack: pokemonData.special_attack,
                special_defense: pokemonData.special_defense,
                speed: pokemonData.speed,
                color1: colors.color1Hex,
                color2: colors.color2Hex,
                color3: colors.color3Hex,
                color4: colors.color4Hex,
                color1_rgb: colors.color1Rgb.join(','),
                color2_rgb: colors.color2Rgb.join(','),
                color3_rgb: colors.color3Rgb.join(','),
                color4_rgb: colors.color4Rgb.join(','),
                color1_shiny: colorsShiny.color1Hex,
                color2_shiny: colorsShiny.color2Hex,
                color3_shiny: colorsShiny.color3Hex,
                color4_shiny: colorsShiny.color4Hex,
                color1_shiny_rgb: colorsShiny.color1Rgb.join(','),
                color2_shiny_rgb: colorsShiny.color2Rgb.join(','),
                color3_shiny_rgb: colorsShiny.color3Rgb.join(','),
                color4_shiny_rgb: colorsShiny.color4Rgb.join(','),
            })

            return res.json({ success: true, paleta: newPaleta.dataValues })

        } catch (error) {
            if (error.message === 'Pokemon not found') {
                return res.status(404).json({ error: 'Pokemon not found' })
            }
            res.status(500).json({ error: 'Internal Server Error' })
        }
    }
    static async getRandomPokemon(req, res) {
        try {
            let pokemon = null;
            let attempts = 0;
            const maxAttempts = 50;

            while (!pokemon && attempts < maxAttempts) {
                const randomId = Math.floor(Math.random() * 1025) + 1;
                req.params.name = String(randomId);

                try {
                    const result = await pokemonController.getPokemonPalette(req, res);
                    pokemon = result;
                    return result;
                } catch (error) {
                    attempts++;
                    console.log(`Intento ${attempts}: Pokémon con ID ${randomId} no encontrado, buscando otro...`);
                }
            }

            res.status(404).json({ error: 'No se pudo encontrar un Pokémon válido después de varios intentos' });

        } catch (error) {
            console.error('Error en getRandomPokemon:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

export default pokemonController