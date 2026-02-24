import { DataTypes } from 'sequelize'
import sequelize from './index.js'

const Coleccion = sequelize.define('Coleccion', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    publica: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    tableName: 'colecciones',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
})

export default Coleccion