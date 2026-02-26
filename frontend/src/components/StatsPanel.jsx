import { useTheme } from '../context/ThemeContext'

const StatsPanel = ({ pokemon, isShiny }) => {
    const { darkMode } = useTheme()

    return (
        <div className={`col-span-3 rounded-3xl p-10 shadow-sm relative overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>

            {/* Silueta de fondo */}
            <img
                src={isShiny ? pokemon.sprite_url_shiny : pokemon.sprite_url}
                alt=""
                className="absolute right-8 bottom-0 w-72 h-72 object-contain opacity-10 pointer-events-none select-none"
                style={{ filter: darkMode ? 'brightness(10)' : 'brightness(0)' }}
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

                <div className="ml-auto flex gap-8">
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
    )
}

export default StatsPanel