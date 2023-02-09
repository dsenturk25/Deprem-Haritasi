
const express = require("express");
const router = express.Router();

const indexGetController = require("../controllers/index/index/get");
const addLocationPostController = require("../controllers/index/addLocation/post")
const locationGetController = require("../controllers/index/getLocations/get");
const confirmLocationPostController = require("../controllers/index/confirmLocation/post");

router.get(
  "/",
  indexGetController
)

router.get(
  "/get_locations",
  locationGetController
)

router.post(
  "/add_location",
  addLocationPostController
)

router.post(
  "/confirm_location",
  confirmLocationPostController
)


module.exports = router;
