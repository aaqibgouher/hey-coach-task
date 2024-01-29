const mongoose = require("mongoose");

// lot schema
const lotsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    totalSlots: {
      type: Number,
      required: true,
    },
    sizes: {
      type: [String],
      default: ["SMALL", "LARGE", "MEDIUM", "XL"],
    },
    totalFloors: {
      type: Number,
      default: 3,
    },
  },
  { timestamps: true }
);

const LotModel = mongoose.model("LotModel", lotsSchema, "lots");

module.exports = LotModel;
