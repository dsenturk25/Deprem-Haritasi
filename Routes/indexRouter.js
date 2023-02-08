
const express = require("express");
const router = express.Router();

const indexGetController = require("../controllers/index/index/get");
const addLocationPostController = require("../controllers/index/addLocation/post")
const locationGetController = require("../controllers/index/getLocations/get");

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


module.exports = router;
