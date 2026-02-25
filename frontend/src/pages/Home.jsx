import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import axios from '../api/axios.js'
import { Shuffle, Sparkles, Heart } from 'lucide-react'

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

    const statBar = (value, max = 255) => (
        <div className={`w-full rounded-full h-1.5 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
            <div
                className="h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${(value / max) * 100}%`, backgroundColor: 'var(--c1)' }}
            />
        </div>
    )

    return (
        <div className={`min-h-screen p-6 transition-colors duration-500 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
            <div className="max-w-6xl mx-auto grid grid-cols-3 gap-4">

                {/* ── BUSCADOR ── */}
                <div className={`col-span-2 rounded-3xl p-6 shadow-sm flex flex-col gap-4 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>

                    <form onSubmit={handleSearch} className="flex gap-2">
                        <input
                            type="text"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Busca un Pokémon por nombre o ID..."
                            className={`flex-1 px-4 py-3 rounded-2xl text-sm outline-none transition-colors ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-gray-50 border border-gray-100'} focus:border-gray-300`}
                        />
                        <button
                            type="submit"
                            className="px-5 py-3 rounded-2xl text-white text-sm font-medium transition-all"
                            style={{ backgroundColor: 'var(--c1, #1d1d1f)' }}
                        >
                            Buscar
                        </button>
                    </form>

                    <div className="flex gap-2 items-center flex-wrap">
                        <button
                            onClick={handleRandom}
                            className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-sm font-medium transition-all ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                        >
                            <Shuffle size={16} /> Pokémon random
                        </button>

                        <button
                            onClick={handleShinyToggle}
                            className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-sm font-medium transition-all ${isShiny ? 'text-white' : darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}
                            style={isShiny ? { backgroundColor: 'var(--c2, #666)' } : {}}
                        >
                            <Sparkles size={16} /> Shiny
                            <div className={`w-8 h-4 rounded-full transition-all relative ${isShiny ? 'bg-white/30' : 'bg-gray-300'}`}>
                                <div className={`absolute top-0 w-4 h-4 rounded-full bg-white shadow transition-transform duration-300 ${isShiny ? 'translate-x-4' : 'translate-x-0'}`} />
                            </div>
                        </button>
                    </div>

                    {pokemon && (
                        <div className="flex gap-2">
                            {colors.map((c, i) => (
                                <button
                                    key={i}
                                    onClick={() => navigator.clipboard.writeText(c.hex)}
                                    className="flex-1 rounded-2xl h-14 flex items-center justify-center text-xs font-mono transition-transform hover:scale-105 shadow-sm"
                                    style={{ backgroundColor: c.hex }}
                                    title={`Copiar ${c.hex} · rgb(${c.rgb})`}
                                >
                                    <span className="text-white drop-shadow">{c.hex}</span>
                                </button>
                            ))}
                        </div>
                    )}

                    {pokemon && user && (
                        <button
                            onClick={handleSaveFavorite}
                            className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl text-white text-sm font-medium transition-all hover:opacity-90"
                            style={{ backgroundColor: 'var(--c1, #1d1d1f)' }}
                        >
                            <Heart size={16} /> Guardar paleta en favoritos
                        </button>
                    )}

                    {error && <p className="text-red-400 text-sm">{error}</p>}
                </div>

                {/* ── IMAGEN POKÉMON ── */}
                <div
                    className="col-span-1 rounded-3xl flex items-center justify-center p-6 transition-colors duration-700 relative overflow-hidden"
                    style={{ backgroundColor: bgColor + '40' }}
                >
                    {loading ? (
                        <div className="w-12 h-12 border-4 border-gray-200 border-t-gray-400 rounded-full animate-spin" />
                    ) : pokemon ? (
                        <img
                            src={isShiny ? pokemon.sprite_url_shiny : pokemon.sprite_url}
                            alt={pokemon.pokemon_name}
                            className="w-48 h-48 object-contain drop-shadow-xl transition-all duration-500"
                        />
                    ) : null}
                </div>

                {/* ── COLORES GRANDES ── */}
                {pokemon && (
                    <div className="col-span-3 flex gap-3 h-16">
                        {colors.map((c, i) => (
                            <div
                                key={i}
                                className="flex-1 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-sm cursor-pointer hover:scale-105"
                                style={{ backgroundColor: c.hex }}
                                onClick={() => navigator.clipboard.writeText(c.hex)}
                                title={`rgb(${c.rgb})`}
                            >
                                <span className="text-white drop-shadow font-mono text-sm">{c.hex}</span>
                            </div>
                        ))}
                    </div>
                )}

                {/* ── STATS ── */}
                {pokemon && (
                    <div
                        className={`col-span-5 rounded-3xl p-20 shadow-sm relative overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
                    >
                        {/* Silueta de fondo */}
                        <img
                            src={isShiny ? pokemon.sprite_url_shiny : pokemon.sprite_url}
                            alt=""
                            className="absolute right-8 bottom-0 w-64 h-64 object-contain opacity-5 pointer-events-none select-none"
                            style={{ filter: 'grayscale(100%) brightness(0)' }}
                        />

                        {/* Header */}
                        <div className="flex items-start gap-6 mb-8 relative z-10">
                            <div>
                                <div className="flex items-center gap-3 mb-1">
                                    <h2 className={`text-3xl font-bold capitalize ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                        {pokemon.pokemon_name}
                                    </h2>
                                    <span className={`font-mono text-sm ${darkMode ? 'text-gray-500' : 'text-gray-300'}`}>
                        #{String(pokemon.pokemon_id).padStart(3, '0')}
                    </span>
                                </div>
                                <div className="flex gap-2 mt-2">
                    <span
                        className="px-3 py-1 rounded-full text-xs text-white font-medium capitalize"
                        style={{ backgroundColor: 'var(--c1)' }}
                    >
                        {pokemon.tipo}
                    </span>
                                    {pokemon.tipo2 && (
                                        <span
                                            className="px-3 py-1 rounded-full text-xs text-white font-medium capitalize"
                                            style={{ backgroundColor: 'var(--c2)' }}
                                        >
                            {pokemon.tipo2}
                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Altura y peso */}
                            <div className="ml-auto flex gap-8 relative z-10">
                                <div className="text-center">
                                    <p className={`text-xs mb-1 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Altura</p>
                                    <p className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                                        {pokemon.height / 10}m
                                    </p>
                                </div>
                                <div className="text-center">
                                    <p className={`text-xs mb-1 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Peso</p>
                                    <p className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                                        {pokemon.weight / 10}kg
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-x-12 gap-y-4 relative z-10">
                            {[
                                { label: 'HP', value: pokemon.hp },
                                { label: 'Ataque', value: pokemon.attack },
                                { label: 'Defensa', value: pokemon.defense },
                                { label: 'Atq. Especial', value: pokemon.special_attack },
                                { label: 'Def. Especial', value: pokemon.special_defense },
                                { label: 'Velocidad', value: pokemon.speed },
                            ].map(stat => (
                                <div key={stat.label} className="flex items-center gap-4">
                    <span className={`text-xs w-24 flex-shrink-0 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`}>
                        {stat.label}
                    </span>
                                    <div className={`flex-1 rounded-full h-1.5 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                                        <div
                                            className="h-1.5 rounded-full transition-all duration-700"
                                            style={{ width: `${(stat.value / 255) * 100}%`, backgroundColor: 'var(--c1)' }}
                                        />
                                    </div>
                                    <span className={`text-xs font-mono w-8 text-right font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {stat.value}
                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}

export default Home