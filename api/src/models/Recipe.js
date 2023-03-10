const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id : {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    healthScore: {
      type: DataTypes.INTEGER, 
    },
    dishTypes: {
      type: DataTypes.JSON,
    },
    stepByStep: {
      type: DataTypes.JSON,
    },
    image: {
      type: DataTypes.STRING,
    },
    createdInBd: {
      type: DataTypes.BOOLEAN, 
      allowNull: false,
      defaultValue: true,
  }
  }, { timestamps: false });
};
