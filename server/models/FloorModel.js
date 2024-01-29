const mongoose = require("mongoose");

const floorSchema = new mongoose.Schema(
  {
    lot: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "LotModel",
    },
    floorNo: {
      type: Number,
      required: true,
      enum: [1, 2, 3],
    },
    totalSlots: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const FloorModel = mongoose.model("FloorModel", floorSchema, "floors");

module.exports = FloorModel;
