import { DataTypes } from 'sequelize'
import sequelize from './index.js'

const PaletaEtiqueta = sequelize.define('PaletaEtiqueta', {
    paleta_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    etiqueta_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'paleta_etiquetas',
    timestamps: false
})

export default PaletaEtiqueta