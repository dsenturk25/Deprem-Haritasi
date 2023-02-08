

const mongoose = require("mongoose");

const locationSchema = mongoose.Schema({

  latitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  total_victims: {
    type: Number,
    required: true
  },
})

locationSchema.statics.createLocation = function (body, callback) {
  const newLocation = new Location(body);
  if (newLocation) {
    newLocation.save();

    return callback(null, newLocation);
  }
  return callback("bad_request");
}

const Location = mongoose.model("Locations", locationSchema);

module.exports = Location;
