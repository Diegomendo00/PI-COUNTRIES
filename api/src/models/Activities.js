const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("activities", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    difficulty: {
      type: DataTypes.ENUM("1", "2", "3", "4", "5"),
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 24,
        isEven(value) {
          if (value < 1 || value > 24) {
            throw new Error("Solo valores entre 1 y 24");
          }
        },
      },
    },
    season: {
      type: DataTypes.ENUM("verano", "otoño", "invierno", "primavera"),
      allowNull: false,
    },
  });
};
