import { DataTypes } from 'sequelize'
import sequelize from './index.js'

const PokemonPaleta = sequelize.define('PokemonPaleta', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    pokemon_id: {type: DataTypes.INTEGER, allowNull: false, unique: true},
    pokemon_name: {type: DataTypes.STRING(100), allowNull: false},
    sprite_url: {type: DataTypes.STRING(500), allowNull: false},
    tipo: {type: DataTypes.STRING(50), allowNull: true},
    tipo2: { type: DataTypes.STRING(50), allowNull: true },
    color1: { type: DataTypes.STRING(7), allowNull: false },
    color2: { type: DataTypes.STRING(7), allowNull: false },
    color3: { type: DataTypes.STRING(7), allowNull: false },
    color4: { type: DataTypes.STRING(7), allowNull: false },
    color1_rgb: { type: DataTypes.STRING(20), allowNull: false, defaultValue: '0,0,0' },
    color2_rgb: { type: DataTypes.STRING(20), allowNull: false, defaultValue: '0,0,0' },
    color3_rgb: { type: DataTypes.STRING(20), allowNull: false, defaultValue: '0,0,0' },
    color4_rgb: { type: DataTypes.STRING(20), allowNull: false, defaultValue: '0,0,0' },
    sprite_url_shiny: { type: DataTypes.STRING(500), allowNull: true },
    color1_shiny: { type: DataTypes.STRING(7), allowNull: false, defaultValue: '#CCCCCC' },
    color2_shiny: { type: DataTypes.STRING(7), allowNull: false, defaultValue: '#CCCCCC' },
    color3_shiny: { type: DataTypes.STRING(7), allowNull: false, defaultValue: '#CCCCCC' },
    color4_shiny: { type: DataTypes.STRING(7), allowNull: false, defaultValue: '#CCCCCC' },
    color1_shiny_rgb: { type: DataTypes.STRING(20), allowNull: false, defaultValue: '0,0,0' },
    color2_shiny_rgb: { type: DataTypes.STRING(20), allowNull: false, defaultValue: '0,0,0' },
    color3_shiny_rgb: { type: DataTypes.STRING(20), allowNull: false, defaultValue: '0,0,0' },
    color4_shiny_rgb: { type: DataTypes.STRING(20), allowNull: false, defaultValue: '0,0,0' },
    height: { type: DataTypes.INTEGER, allowNull: true },
    weight: { type: DataTypes.INTEGER, allowNull: true },
    hp: { type: DataTypes.INTEGER, allowNull: true },
    attack: { type: DataTypes.INTEGER, allowNull: true },
    defense: { type: DataTypes.INTEGER, allowNull: true },
    special_attack: { type: DataTypes.INTEGER, allowNull: true },
    special_defense: { type: DataTypes.INTEGER, allowNull: true },
    speed: { type: DataTypes.INTEGER, allowNull: true },
}, {
    tableName: 'pokemon_paletas',
    timestamps: true,
    createdAt: 'generada_at',
    updatedAt: false
})

export default PokemonPaleta