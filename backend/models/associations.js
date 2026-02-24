import Usuario from './Usuario.js'
import PokemonPaleta from './PokemonPaleta.js'
import Etiqueta from './Etiqueta.js'
import Coleccion from './Coleccion.js'
import Favorito from './Favorito.js'
import Comentario from './Comentario.js'
import ColeccionPaleta from './ColeccionPaleta.js'
import PaletaEtiqueta from './PaletaEtiqueta.js'

// Usuario → Colecciones
Usuario.hasMany(Coleccion, { foreignKey: 'usuario_id', onDelete: 'CASCADE' })
Coleccion.belongsTo(Usuario, { foreignKey: 'usuario_id' })

// Usuario → Favoritos
Usuario.hasMany(Favorito, { foreignKey: 'usuario_id', onDelete: 'CASCADE' })
Favorito.belongsTo(Usuario, { foreignKey: 'usuario_id' })

// Usuario → Comentarios
Usuario.hasMany(Comentario, { foreignKey: 'usuario_id', onDelete: 'CASCADE' })
Comentario.belongsTo(Usuario, { foreignKey: 'usuario_id' })

// PokemonPaleta → Favoritos
PokemonPaleta.hasMany(Favorito, { foreignKey: 'paleta_id', onDelete: 'CASCADE' })
Favorito.belongsTo(PokemonPaleta, { foreignKey: 'paleta_id' })

// PokemonPaleta → Comentarios
PokemonPaleta.hasMany(Comentario, { foreignKey: 'paleta_id', onDelete: 'CASCADE' })
Comentario.belongsTo(PokemonPaleta, { foreignKey: 'paleta_id' })

// PokemonPaleta ↔ Coleccion (muchos a muchos)
PokemonPaleta.belongsToMany(Coleccion, {
    through: ColeccionPaleta,
    foreignKey: 'paleta_id',
    otherKey: 'coleccion_id'
})
Coleccion.belongsToMany(PokemonPaleta, {
    through: ColeccionPaleta,
    foreignKey: 'coleccion_id',
    otherKey: 'paleta_id'
})

// PokemonPaleta ↔ Etiqueta (muchos a muchos)
PokemonPaleta.belongsToMany(Etiqueta, {
    through: PaletaEtiqueta,
    foreignKey: 'paleta_id',
    otherKey: 'etiqueta_id'
})
Etiqueta.belongsToMany(PokemonPaleta, {
    through: PaletaEtiqueta,
    foreignKey: 'etiqueta_id',
    otherKey: 'paleta_id'
})

export {
    Usuario,
    PokemonPaleta,
    Etiqueta,
    Coleccion,
    Favorito,
    Comentario,
    ColeccionPaleta,
    PaletaEtiqueta
}