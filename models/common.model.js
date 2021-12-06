const mongoose = require("mongoose");

const commonSchema = new mongoose.Schema(
  {
    createdBy: {
      type: String,
      default: null,
    },
    updatedBy: {
      type: String,
      default: null,
    },
    createdAt: Number,
    updatedAt: Number,
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);
const cSchema = mongoose.model("Common", commonSchema);
module.exports = { commonSchema, cSchema };
