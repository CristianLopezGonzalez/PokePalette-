import { DataTypes } from 'sequelize'
import sequelize from './index.js'

const Usuario = sequelize.define('Usuario', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    avatar: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    rol: {
        type: DataTypes.ENUM('usuario', 'admin'),
        allowNull: false,
        defaultValue: 'usuario'
    }
}, {
    tableName: 'usuarios',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
})

export default Usuario