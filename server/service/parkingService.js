const { LotModel, FloorModel, SlotModel } = require("../models");
const mongoose = require("mongoose");

const onboarding = async (payload) => {
  // validations
  if (!payload || !payload.name) throw "Name is required";
  if (!payload || !payload.totalSlots)
    throw "Total Slots in the Lot is required";
  if (!payload || !payload.sizes) throw "Sizes are required";
  if (!payload || !payload.totalFloors) throw "Total floors are required";
  if (!payload || !payload.floors) throw "Floors is required";

  const { name, totalSlots, sizes, totalFloors, floors } = payload;

  // validations for lots
  let lot = await getLotByName(name);

  if (lot) throw "Lot name already exists";

  // INSERT DATA ON LOTS
  lot = new LotModel({
    name,
    totalSlots,
    sizes,
    totalFloors,
  });

  lot = await lot.save();

  // insert floors in lot
  floors.map(async (floor, floorIdx) => {
    let floorObj = new FloorModel({
      lot: lot._id,
      floorNo: floor.floorNo,
      totalSlots: floor.totalSlots,
    });

    floorObj = await floorObj.save();

    // insert slots for each floor
    floor?.slots.map(async (slot, slotIdx) => {
      let slotObj = new SlotModel({
        lot: lot._id,
        floor: floorObj._id,
        label: slot?.label || "TEST",
        totalSlots: slot?.totalSlots || 300,
      });

      slotObj = await slotObj.save();
    });
  });

  // insert data slots
  return { name, totalSlots, totalFloors };
};

const getLotByName = async (name) => {
  return await LotModel.findOne({ name });
};

const getLotById = async (id) => {
  return await LotModel.findOne({ _id: id });
};

const allocateParking = async (payload) => {
  if (!payload || !payload.lotId) throw "Lot Id is required";
  if (!payload || !payload.carSize) throw "Car size is required";
  if (!payload || !payload.carNo) throw "Car No is required";
  if (!payload || !payload.from) throw "From time is required";

  let { lotId, carSize, carNo, from } = payload;

  const lot = await getLotById(lotId);

  if (!lot) throw "Lot not found";

  const floors = await getFloorsByLotId(lotId);

  const sizes = ["SMALL", "MEDIUM", "LARGE", "XL"];
  const sizeIndex = sizes.indexOf(carSize);
  let result = null;

  for (let i = sizeIndex; i < sizes.length; i++) {
    for (const floor of floors) {
      // get slots in that floor
      const slotsInFloor = await getSlotInFloor({
        lotId,
        floorId: floor._id,
        label: sizes[i],
      });

      console.log(floor.floorNo, "floor no", sizes[i]);

      const carBooked = slotsInFloor?.booked.find(
        (data) => data.carNo === carNo
      );

      // check if car no already exists
      if (carBooked) throw "Car already parked";

      if (slotsInFloor?.booked.length < slotsInFloor?.totalSlots) {
        console.log("available");

        //   if available, insert in booked
        slotsInFloor.booked.push({ carNo, from });
        result = await slotsInFloor.save();

        return {
          floorId: floor._id,
          floorNo: floor.floorNo,
          carSize,
          availableSize: sizes[i],
          bookedId: result.booked.find((data) => data.carNo === carNo),
          slotId: result._id,
        };
      } else {
        console.log("not available");
      }
    }
  }

  if (!result) return null;
};

const deallocateParking = async (payload) => {
  console.log(payload, "from service");
  if (!payload || !payload.bookingId) throw "Booking id is required";

  let { bookingId } = payload;
  bookingId = await toMongooseId(bookingId);

  //   const slot = await getSlotById(slotId);
  const slot = await getSlotByBookingId(bookingId);

  const deallocateBooked = slot?.booked.filter(
    (book) => !book._id.equals(bookingId)
  );

  slot.booked = deallocateBooked;
  const result = await slot.save();
  return { lotId: result.lot, floor: result.floor, bookingId };
};

const getSlotByBookingId = async (bookingId) => {
  return await SlotModel.findOne({ "booked._id": bookingId });
};

const getFloorsByLotId = async (lotId) => {
  return await FloorModel.find({ lot: lotId });
};

const getSlotInFloor = async (payload) => {
  if (!payload || !payload.lotId) throw "Lot id is required";
  if (!payload || !payload.floorId) throw "Floor id is required";
  if (!payload || !payload.label) throw "Label is required";

  const { lotId, floorId, label } = payload;

  return await SlotModel.findOne({ lot: lotId, floor: floorId, label })
    .populate("lot")
    .populate("floor");
};

const getSlotById = async (slotId) => {
  return await SlotModel.findById({ _id: slotId });
};

const toMongooseId = async (id) => {
  return new mongoose.Types.ObjectId(id);
};

const getLots = async () => {
  return await LotModel.find();
};

const getSlotByLot = async (payload) => {
  if (!payload || !payload.lotId) throw "Lot id is required";
  console.log(payload, "payload");
  return await SlotModel.find({ lot: payload.lotId })
    .populate("lot")
    .populate("floor");
  //   return await SlotModel.aggregate([
  //     {
  //       $match: { lot: await toMongooseId(payload.lotId) },
  //     },
  //     {
  //       $lookup: {
  //         from: "lots",
  //         localField: "lot",
  //         foreignField: "_id",
  //         as: "lot",
  //       },
  //     },
  //     {
  //       $unwind: "$lot",
  //     },
  //     {
  //       $lookup: {
  //         from: "floors",
  //         localField: "floor",
  //         foreignField: "_id",
  //         as: "floor",
  //       },
  //     },
  //     {
  //       $unwind: "$floor",
  //     },
  //     {
  //       $sort: { "floor.floorNo": 1 },
  //     },
  //   ]);
};

module.exports = {
  onboarding,
  getLotByName,
  allocateParking,
  getLotById,
  getFloorsByLotId,
  deallocateParking,
  getSlotById,
  toMongooseId,
  getLots,
  getSlotByLot,
};
