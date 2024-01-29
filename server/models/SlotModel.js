const mongoose = require("mongoose");

// booking schema
const bookingSchema = new mongoose.Schema(
  {
    carNo: {
      type: String,
      required: true,
    },
    from: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

// slot schema
const slotSchema = new mongoose.Schema(
  {
    lot: {
      type: mongoose.Types.ObjectId,
      ref: "LotModel",
      required: true,
    },
    floor: {
      type: mongoose.Types.ObjectId,
      ref: "FloorModel",
      required: true,
    },
    label: {
      type: String,
      required: true,
      enum: ["SMALL", "LARGE", "MEDIUM", "XL"],
    },
    totalSlots: {
      type: Number,
      required: true,
    },
    booked: {
      type: [bookingSchema],
      default: [],
    },
  },
  { timestamps: true }
);

const SlotModel = mongoose.model("SlotModel", slotSchema, "slots");

module.exports = SlotModel;
