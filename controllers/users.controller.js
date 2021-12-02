const Users = require("../models/users.model");
// const Op = db.Sequelize.Op;
// const Users = db.users;
const { createUSer } = require("../Validators/validation");

// Create New User
exports.createUser = async (req, res, next) => {
  try {
    const { firstName, lastName, email, dob, phone_number } = req.body;

    const { error } = createUSer(req.body);
    if (error)
      return res
        .status(200)
        .json({ status: false, message: error.details[0].message });

    // Create a User
    const user = {
      firstName,
      lastName,
      email,
      dob,
      phone_number,
    };

    // Save Tutorial in the database
    Users.create(user)
      .then((data) => {
        res.status(200).json({
          status: true,
          message: "User Created..",
          data: data,
        });
      })
      .catch((err) => {
        res.status(500).send({
          status: false,
          data: {},
          message:
            err.message || "Some error occurred while creating the Tutorial.",
        });
      });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: error.message,
      data: {},
    });
  }
};

// Get all user
exports.getAllUsers = async (req, res, next) => {
  try {
    let data = await Users.find({}).sort({_id: -1});
    if (data) return res.json(data);
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: error.message,
      data: {},
    });
  }
};

// Get an user
exports.getUser = async (req, res, next) => {
  try {
    if (req.params.id == undefined)
      return res.status(200).json({ status: false, message: "ID is required" });

    let data = await Users.findOne({ _id: req.params.id });
    if (data) return res.json(data);
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: error.message,
      data: {},
    });
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { firstName, lastName, email, dob, phone_number } = req.body;

    if (req.params.id == undefined)
      return res.status(200).json({ status: false, message: "ID is required" });

    const { error } = createUSer(req.body);
    if (error)
      return res
        .status(200)
        .json({ status: false, message: error.details[0].message });

    let data = await Users.findOne({ _id: req.params.id });

    if (!data)
      return res.status(200).json({
        status: false,
        message: `No user found with ${req.params.id} ID`,
      });

    const user = {
      firstName,
      lastName,
      email,
      dob,
      phone_number,
    };
    await Users.findByIdAndUpdate(
      { _id: (req.params.id) },
      {
        $set: {
          firstName,
          lastName,
          email,
          dob,
          phone_number,
        },
      },
      { upsert: true }
    )
      .then((resp) => {
        return res.status(200).json({ status: true, message: "Updated!" });
      })
      .catch((error) => {
        return res.status(200).json({ status: false, error: error.message });
      });

    // Users.updateOne(
    //   { firstName, lastName, email, dob, phone_number },
    //   { where: { id: req.params.id } }
    // )
    //   .then((data) => {
    //     res.status(200).json({
    //       status: true,
    //       message: "User Updated..",
    //       // data: data,
    //     });
    //   })
    //   .catch((err) => {
    //     res.status(500).send({
    //       status: false,
    //       data: {},
    //       message:
    //         err.message || "Some error occurred while creating the Tutorial.",
    //     });
    //   });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: error.message,
      data: {},
    });
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    if (req.params.id == undefined)
      return res.status(200).json({ status: false, message: "ID is required" });

    let data = await Users.findOne({ _id: req.params.id });

    if (!data)
      return res.status(200).json({
        status: false,
        message: `No user found with ${req.params.id} ID`,
      });

    Users.remove({ _id: req.params.id })
      .then((data) => {
        res.status(200).json({
          status: true,
          message: "User Deleted..",
          // data: data,
        });
      })
      .catch((err) => {
        res.status(500).send({
          status: false,
          data: {},
          message:
            err.message || "Some error occurred while creating the Tutorial.",
        });
      });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: error.message,
      data: {},
    });
  }
};
