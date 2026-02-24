import { DataTypes } from 'sequelize'
import sequelize from './index.js'

const Comentario = sequelize.define('Comentario', {
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
    },
    texto: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    tableName: 'comentarios',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
})

export default Comentario