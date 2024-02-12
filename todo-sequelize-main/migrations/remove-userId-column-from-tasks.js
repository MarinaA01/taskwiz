"use strict";

module.exports = {
  // remove the "UserId" column from the "Tasks" table
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Tasks", "UserId");
  },

  // recreate the "UserId" column in the "Tasks" table
  down: async (queryInterface, Sequelize) => {
    // recreate the column
    await queryInterface.addColumn("Tasks", "UserId", {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  },
};