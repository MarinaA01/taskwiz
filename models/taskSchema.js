"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * helper method for defining associations
     * this method is not a part of Sequelize lifecycle
     * the `models/index` file will call this method automatically
     */
    static associate(models) {
      // define association here
      Task.belongsTo(models.User, {
        foreignKey: "user_id", // define the foreign key for the association
      });
    }
  }

  Task.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      is_done: { 
        type: DataTypes.BOOLEAN, 
        defaultValue: false 
      },
      description: {
        type: DataTypes.STRING,
      },
      date_created: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "User",
          key: "id",
        },
      },
    },
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: "Task",
    }
  );

  return Task;
};


// CREATE TABLE Task (
//   id INT NOT NULL AUTO_INCREMENT,
//   name VARCHAR(255) NOT NULL,
//   is_done BOOLEAN DEFAULT FALSE,
//   description VARCHAR(255),
//   date_created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
//   user_id INT,
//   PRIMARY KEY (id),
//   FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
// );