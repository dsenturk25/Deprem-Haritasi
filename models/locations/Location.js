

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
  confirmations: {
    type: Number,
    required: true,
    default: 0
  }
})

locationSchema.statics.createLocation = function (body, callback) {
  const newLocation = new Location(body);
  if (newLocation) {
    newLocation.save();

    return callback(null, newLocation);
  }
  return callback("bad_request");
}

locationSchema.statics.confirmLocation = function (body, callback) {
  Location.findById(body._id, (err, location) => {

    location.confirmations += 1;
    location.save();

    if (err) return callback("bad_request", null);
    return callback(null, location);
  })
}

const Location = mongoose.model("Locations", locationSchema);

module.exports = Location;
