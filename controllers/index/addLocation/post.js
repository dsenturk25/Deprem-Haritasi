
const Location = require("../../../models/locations/Location");

module.exports = (req, res) => {

  Location.createLocation(req.body, (err, location) => {
    if (err) return res.send("Lokasyon oluşturulamadı. Bağlantınızı kontrol edip yeniden deneyin.");

    if (location) res.redirect("/");
  })
}
