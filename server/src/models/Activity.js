const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Activity', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    difficulty: {
        type: DataTypes.INTEGER,
        validate: {
            min: 1,
            max: 5,
        }
    },
    duration: {
        type: DataTypes.FLOAT,
        allowNull: true,
        validate: {
            min: 1,
            max: 24,
        },

    },
    season: {
        type: DataTypes.ENUM('summer', 'autumn', 'winter', 'spring'),
        allowNull: false,
    },
    
  },{
    timestamps: false,
});
};

