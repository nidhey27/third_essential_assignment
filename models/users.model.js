module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users_tbl", {
    firstName: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    lastName: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING(200),
      allowNull: false,
    },
    dob: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    phone_number: {
      type: Sequelize.STRING(11),
      allowNull: false,
    },
    createdBy: {
      type: Sequelize.STRING(60),
      allowNull: true,
    },
    updatedBy: {
      type: Sequelize.STRING(60),
      allowNull: true,
    },
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      allowNull: false,
    },
    updatedAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      allowNull: false,
    },
  });

  return User;
};
