
const Location = require("../../../models/locations/Location");

module.exports = (req, res) => {
  Location.find({}, (err, locations) => {
    if (err) return res.send("Lütfen bağlantınızı kontrol edin.");
    res.send(locations);
  })
}
