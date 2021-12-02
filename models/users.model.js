// module.exports = (sequelize, Sequelize) => {
//   const User = sequelize.define("users_tbl", {
//     firstName: {
//       type: Sequelize.STRING(100),
//       allowNull: false,
//     },
//     lastName: {
//       type: Sequelize.STRING(100),
//       allowNull: false,
//     },
//     email: {
//       type: Sequelize.STRING(200),
//       allowNull: false,
//     },
//     dob: {
//       type: Sequelize.DATEONLY,
//       allowNull: false,
//     },
//     phone_number: {
//       type: Sequelize.STRING(11),
//       allowNull: false,
//     },
//     createdBy: {
//       type: Sequelize.STRING(60),
//       allowNull: true,
//     },
//     updatedBy: {
//       type: Sequelize.STRING(60),
//       allowNull: true,
//     },
//     createdAt: {
//       type: Sequelize.DATE,
//       defaultValue: Sequelize.NOW,
//       allowNull: false,
//     },
//     updatedAt: {
//       type: Sequelize.DATE,
//       defaultValue: Sequelize.NOW,
//       allowNull: false,
//     },
//   });

//   return User;
// };

const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 3,
    },
    lastName: {
      type: String,
      required: true,
      min: 3,
    },
    email: {
      type: String,
      required: true,
      min: 3,
    },
    dob: {
      type: Date,
      required: true,
      min: 3,
    },
    phone_number: {
      type: String,
      required: true,
    },
    createdBy: {
      type: String,
      default: null
    },
    updatedBy: {
      type: String,
      default: null
    },
    createdAt: Number,
    updatedAt: Number,
  },
  { timestamps: true },
  { collection: "users" }
);

module.exports = mongoose.model("Users", usersSchema);
