import { DataTypes } from 'sequelize'
import sequelize from './index.js'

const Favorito = sequelize.define('Favorito', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    paleta_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'favoritos',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
})

export default Favorito