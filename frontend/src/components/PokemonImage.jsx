import { useTheme } from '../context/ThemeContext'

const PokemonImage = ({ pokemon, isShiny, loading, bgColor }) => {
    const { darkMode } = useTheme()

    return (
        <div
            className="col-span-3 flex items-center justify-center p-6 transition-all duration-700 relative overflow-hidden"
            style={{
                height: '400px',
                background: darkMode
                    ? `linear-gradient(to left, ${bgColor}dd 0%, ${bgColor}88 30%, ${bgColor}22 55%, #0f172a 80%, #020617 100%)`
                    : `linear-gradient(to left, ${bgColor}aa 0%, ${bgColor}55 35%, ${bgColor}15 60%, #ffffff 85%, #ffffff 100%)`
            }}
        >
            {/* Oscurecimiento suave SOLO hacia la izquierda */}
            <div
                className="absolute inset-0"
                style={{
                    background: darkMode
                        ? `linear-gradient(to left, transparent 60%, rgba(0,0,0,0.35) 100%)`
                        : `linear-gradient(to left, transparent 75%, rgba(0,0,0,0.05) 100%)`
                }}
            />

            {/* Nombre arriba izquierda */}
            {pokemon && !loading && (
                <span
                    className={`absolute top-4 left-5 text-xs font-bold uppercase tracking-widest z-10 capitalize ${
                        darkMode ? 'text-white/40' : 'text-black/40'
                    }`}
                >
                    {isShiny ? '✨ Shiny' : pokemon.pokemon_name}
                </span>
            )}

            {loading ? (
                <div
                    className={`w-12 h-12 border-4 rounded-full animate-spin relative z-10 ${
                        darkMode
                            ? 'border-white/30 border-t-white/80'
                            : 'border-black/20 border-t-black/60'
                    }`}
                />
            ) : pokemon ? (
                <img
                    src={isShiny ? pokemon.sprite_url_shiny : pokemon.sprite_url}
                    alt={pokemon.pokemon_name}
                    className={`w-56 h-56 object-contain transition-all duration-500 relative z-10 ${
                        darkMode ? 'drop-shadow-2xl' : 'drop-shadow-xl'
                    }`}
                />
            ) : null}
        </div>
    )
}

export default PokemonImage