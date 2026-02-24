import { DataTypes } from 'sequelize'
import sequelize from './index.js'

const ColeccionPaleta = sequelize.define('ColeccionPaleta', {
    coleccion_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    paleta_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'coleccion_paletas',
    timestamps: false
})

export default ColeccionPaleta