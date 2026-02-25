import axios from "axios";
import dotenv from 'dotenv';
dotenv.config();

class PokeApiService {
    constructor() {
        this.axiosInstance = axios.create({
            baseURL: "https://pokeapi.co/api/v2/",
        })
    }

    async extractDataByPokemonName(pokemonName) {
        const info = await this.requestPokemonData(`/pokemon/${pokemonName}`, "GET")

        const stats = {}
        info.stats.forEach(stat => {
            const name = stat.stat.name.replace('-', '_')
            stats[name] = stat.base_stat
        })

        return {
            pokemon_id: info.id,
            pokemon_name: info.name,
            sprite_url: info.sprites.other['official-artwork'].front_default,
            sprite_url_shiny: info.sprites.other['official-artwork'].front_shiny,
            tipo: info.types[0].type.name,
            tipo2: info.types[1]?.type.name || null,
            height: info.height,
            weight: info.weight,
            hp: stats.hp,
            attack: stats.attack,
            defense: stats.defense,
            special_attack: stats.special_attack,
            special_defense: stats.special_defense,
            speed: stats.speed
        }
    }

    async requestPokemonData(endpoint, method = "GET") {
        const m = method.toUpperCase();
        try {
            switch (m) {
                case "GET":
                    return (await this.axiosInstance.get(endpoint)).data;

                default:
                    throw new Error(`Method ${m} not found`);
            }
        }catch (e) {
            console.error('Error in PokeAPI:', e.message)
            throw new Error('Pokemon not found');
        }

    }
}

export default PokeApiService;