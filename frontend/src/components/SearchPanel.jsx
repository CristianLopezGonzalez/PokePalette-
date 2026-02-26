import { useTheme } from '../context/ThemeContext'
import { Shuffle, Sparkles, Heart } from 'lucide-react'

const SearchPanel = ({ search, setSearch, isShiny, onSearch, onRandom, onShinyToggle, onSaveFavorite, user, pokemon }) => {
    const { darkMode } = useTheme()

    return (
        <div className={`col-span-2 rounded-3xl p-6 shadow-sm flex flex-col gap-4 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>

            <form onSubmit={onSearch} className="flex gap-2">
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
                    onClick={onRandom}
                    className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-sm font-medium transition-all ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                >
                    <Shuffle size={16} /> Pokémon random
                </button>

                <button
                    onClick={onShinyToggle}
                    className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-sm font-medium transition-all ${isShiny ? 'text-white' : darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}
                    style={isShiny ? { backgroundColor: 'var(--c2, #666)' } : {}}
                >
                    <Sparkles size={16} /> Shiny
                    <div className={`w-8 h-4 rounded-full transition-all relative ${isShiny ? 'bg-white/30' : 'bg-gray-300'}`}>
                        <div className={`absolute top-0 w-4 h-4 rounded-full bg-white shadow transition-transform duration-300 ${isShiny ? 'translate-x-4' : 'translate-x-0'}`} />
                    </div>
                </button>
            </div>

            {pokemon && user && (
                <button
                    onClick={onSaveFavorite}
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl text-white text-sm font-medium transition-all hover:opacity-90"
                    style={{ backgroundColor: 'var(--c1, #1d1d1f)' }}
                >
                    <Heart size={16} /> Guardar paleta en favoritos
                </button>
            )}
        </div>
    )
}

export default SearchPanel