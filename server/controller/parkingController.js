const parkingService = require("../service/parkingService");

const getLots = async (req, res) => {
  try {
    const data = await parkingService.getLots();

    return res.json({
      status: 200,
      message: "Successfully get lots",
      data,
    });
  } catch (error) {
    console.log(error, "from get lots controller");
    return res.json({ status: 400, error });
  }
};

const onboarding = async (req, res) => {
  try {
    const { name, totalSlots, sizes, totalFloors, floors } = req.body;
    const data = await parkingService.onboarding({
      name,
      totalSlots,
      sizes,
      totalFloors,
      floors,
    });

    return res.json({
      status: 200,
      message: "Successfully onboarded parking lot",
      data,
    });
  } catch (error) {
    console.log(error, "from onboarding controller");
    return res.json({ status: 400, error });
  }
};

const allocateParking = async (req, res) => {
  try {
    const { lotId, carSize, carNo, from } = req.body;
    const data = await parkingService.allocateParking({
      lotId,
      carSize,
      carNo,
      from,
    });

    return res.json({
      status: 200,
      message: "Successfully allocated parking",
      data,
    });
  } catch (error) {
    console.log(error, "from allocate parking controller");
    return res.json({ status: 400, error });
  }
};

const deallocateParking = async (req, res) => {
  try {
    const { bookingId } = req.params;

    const data = await parkingService.deallocateParking({ bookingId });

    return res.json({
      status: 200,
      message: "Successfully deallocated parking for a car",
      data,
    });
  } catch (error) {
    console.log(error, "from deallocate parking controller");
    return res.json({ status: 400, error });
  }
};

const getSlotByLot = async (req, res) => {
  try {
    const { lotId } = req.params;
    const data = await parkingService.getSlotByLot({ lotId });

    return res.json({
      status: 200,
      message: "Successfully get slots for lot",
      data,
    });
  } catch (error) {
    console.log(error, "from get slots for lot controller");
    return res.json({ status: 400, error });
  }
};

module.exports = {
  onboarding,
  allocateParking,
  deallocateParking,
  getLots,
  getSlotByLot,
};
