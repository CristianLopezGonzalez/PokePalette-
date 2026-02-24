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
                const getColors1 = await extractColors(paletaExists.sprite_url)
                return res.json({
                    ...paletaExists.dataValues,
                    color1Rgb: getColors1.color1Rgb,
                    color2Rgb: getColors1.color2Rgb,
                    color3Rgb: getColors1.color3Rgb,
                    color4Rgb: getColors1.color4Rgb
                })
            }

            const pokeApi = new PokeApiService();
            const pokemonData = await pokeApi.extractDataByPokemonName(name)
            const getColors2 = await extractColors(pokemonData.sprite_url)
            const newPaleta = await PokemonPaleta.create({
                pokemon_id: pokemonData.pokemon_id,
                pokemon_name: pokemonData.pokemon_name,
                sprite_url: pokemonData.sprite_url,
                tipo: pokemonData.tipo,
                color1: getColors2.color1Hex,
                color2: getColors2.color2Hex,
                color3: getColors2.color3Hex,
                color4: getColors2.color4Hex
            })

            return res.json({
                ...newPaleta.dataValues,
                color1Rgb: getColors2.color1Rgb,
                color2Rgb: getColors2.color2Rgb,
                color3Rgb: getColors2.color3Rgb,
                color4Rgb: getColors2.color4Rgb
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