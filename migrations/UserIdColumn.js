"use strict";

module.exports = {
  // define the 'up' method for the migration
  up: async (queryInterface, Sequelize) => {
    // remove the "UserId" column from the "Tasks" table
    await queryInterface.removeColumn("Tasks", "UserId");
  },

  // define the 'down' method for the migration
  down: async (queryInterface, Sequelize) => {
    // tf rollback is needed, recreate the "UserId" column in the "tasks" table
    await queryInterface.addColumn("Tasks", "UserId", {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  },
};