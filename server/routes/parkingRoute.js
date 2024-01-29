const express = require("express");
const router = express.Router();
const parkingController = require("../controller/parkingController");

// get lots
router.get("/lots", parkingController.getLots);

// get lot by id
router.get("/lots/:lotId", parkingController.getSlotByLot);

// onboarding lots
router.post("/lots", parkingController.onboarding);

// allocate parking
router.post("/parking", parkingController.allocateParking);

// deallocate parking
router.delete("/parking/:bookingId", parkingController.deallocateParking);

module.exports = router;
