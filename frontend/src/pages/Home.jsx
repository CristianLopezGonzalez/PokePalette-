import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import axios from '../api/axios.js'
import SearchPanel from '../components/SearchPanel.jsx'
import PokemonImage from '../components/PokemonImage.jsx'
import ColorPalette from '../components/ColorPalette.jsx'
import StatsPanel from '../components/StatsPanel.jsx'

const Home = () => {
    const { user } = useAuth()
    const { darkMode } = useTheme()
    const [pokemon, setPokemon] = useState(null)
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')
    const [isShiny, setIsShiny] = useState(false)
    const [error, setError] = useState(null)

    const fetchPokemon = async (nameOrId) => {
        setLoading(true)
        setError(null)
        setIsShiny(false)
        try {
            const res = await axios.get(`/pokemon/${nameOrId}`)
            setPokemon(res.data.paleta)
            applyColors(res.data.paleta, false)
        } catch (e) {
            setError('Pokémon no encontrado')
        } finally {
            setLoading(false)
        }
    }

    const applyColors = (paleta, shiny) => {
        const c1 = shiny ? paleta.color1_shiny : paleta.color1
        const c2 = shiny ? paleta.color2_shiny : paleta.color2
        const c3 = shiny ? paleta.color3_shiny : paleta.color3
        const c4 = shiny ? paleta.color4_shiny : paleta.color4
        document.documentElement.style.setProperty('--c1', c1)
        document.documentElement.style.setProperty('--c2', c2)
        document.documentElement.style.setProperty('--c3', c3)
        document.documentElement.style.setProperty('--c4', c4)
    }

    const handleShinyToggle = () => {
        const newShiny = !isShiny
        setIsShiny(newShiny)
        if (pokemon) applyColors(pokemon, newShiny)
    }

    const handleSearch = (e) => {
        e.preventDefault()
        if (search.trim()) fetchPokemon(search.trim().toLowerCase())
    }

    const handleRandom = () => {
        const randomId = Math.floor(Math.random() * 1025) + 1
        fetchPokemon(randomId)
    }

    const handleSaveFavorite = async () => {
        if (!user) return
        try {
            await axios.post(`/favorite/${pokemon.id}`)
            alert('Paleta guardada en favoritos!')
        } catch (e) {
            alert('Ya está en favoritos')
        }
    }

    useEffect(() => {
        fetchPokemon('random')
    }, [])

    const colors = pokemon ? (isShiny ? [
        { hex: pokemon.color1_shiny, rgb: pokemon.color1_shiny_rgb },
        { hex: pokemon.color2_shiny, rgb: pokemon.color2_shiny_rgb },
        { hex: pokemon.color3_shiny, rgb: pokemon.color3_shiny_rgb },
        { hex: pokemon.color4_shiny, rgb: pokemon.color4_shiny_rgb },
    ] : [
        { hex: pokemon.color1, rgb: pokemon.color1_rgb },
        { hex: pokemon.color2, rgb: pokemon.color2_rgb },
        { hex: pokemon.color3, rgb: pokemon.color3_rgb },
        { hex: pokemon.color4, rgb: pokemon.color4_rgb },
    ]) : []

    const bgColor = pokemon ? (isShiny ? pokemon.color4_shiny : pokemon.color4) : '#f5f5f7'

    return (
        <div className={`min-h-screen transition-colors duration-500 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>

            {/* ── IMAGEN POKÉMON ARRIBA FULL WIDTH ── */}
            <div className="w-full">
                <PokemonImage
                    pokemon={pokemon}
                    isShiny={isShiny}
                    loading={loading}
                    bgColor={bgColor}
                />
            </div>

            {/* ── CONTENIDO CON PADDING ── */}
            <div className="max-w-6xl mx-auto grid grid-cols-3 gap-4 p-6">

                <div className="col-span-3">
                    <SearchPanel
                        search={search}
                        setSearch={setSearch}
                        isShiny={isShiny}
                        onSearch={handleSearch}
                        onRandom={handleRandom}
                        onShinyToggle={handleShinyToggle}
                        onSaveFavorite={handleSaveFavorite}
                        user={user}
                        pokemon={pokemon}
                    />
                </div>

                {error && (
                    <div className="col-span-3 text-red-400 text-sm text-center">
                        {error}
                    </div>
                )}

                {pokemon && <ColorPalette colors={colors} />}
                {pokemon && <StatsPanel pokemon={pokemon} isShiny={isShiny} />}

            </div>
        </div>
    )
}

export default Home