import { PokemonPaleta } from '../models/associations.js'
import PokeApiService from '../services/pokeApiService.js';
import extractColors from '../services/colorExtractor.js'
class pokemonController{

    static async getPokemonPalette (req,res){

        try {
            const parameter = req.params.name;
            const name = parameter.toLowerCase()

            const paletaExists = await PokemonPaleta.findOne({where:{pokemon_name:name}})

            if (paletaExists) {
                return res.json(paletaExists)
            }

            const pokeApi = new PokeApiService();
            const pokemonData = await pokeApi.extractDataByPokemonName(name)
            const getColors = await extractColors(pokemonData.sprite_url)
            const newPaleta = await PokemonPaleta.create({
                pokemon_id: pokemonData.pokemon_id,
                pokemon_name: pokemonData.pokemon_name,
                sprite_url: pokemonData.sprite_url,
                tipo: pokemonData.tipo,
                color1: getColors.color1Hex,
                color2: getColors.color2Hex,
                color3: getColors.color3Hex,
                color4: getColors.color4Hex
            })

            return res.json({
                ...newPaleta.dataValues,
                color1Rgb: getColors.color1Rgb,
                color2Rgb: getColors.color2Rgb,
                color3Rgb: getColors.color3Rgb,
                color4Rgb: getColors.color4Rgb
            })
        } catch (error) {
            if (error.message === 'Pokemon not found') {
                return res.status(404).json({ error: 'Pokemon not found' })
            }
            res.status(500).json({ error: 'Internal Server Error' })
        }

    }

}
export default pokemonController