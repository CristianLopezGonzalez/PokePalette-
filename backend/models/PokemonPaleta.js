import { DataTypes } from 'sequelize'
import sequelize from './index.js'

const PokemonPaleta = sequelize.define('PokemonPaleta', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    pokemon_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },
    pokemon_name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    sprite_url: {
        type: DataTypes.STRING(500),
        allowNull: false
    },
    tipo: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    color1: { type: DataTypes.STRING(7), allowNull: false },
    color2: { type: DataTypes.STRING(7), allowNull: false },
    color3: { type: DataTypes.STRING(7), allowNull: false },
    color4: { type: DataTypes.STRING(7), allowNull: false }
}, {
    tableName: 'pokemon_paletas',
    timestamps: true,
    createdAt: 'generada_at',
    updatedAt: false
})

export default PokemonPaleta