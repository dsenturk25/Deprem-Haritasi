
const Location = require("../../../models/locations/Location");

module.exports = (req, res) => {
  console.log(req.body)
  Location.confirmLocation(req.body, (err, location) => {
    if (err) return res.send("Lütfen bağlantınızı kontrol ediniz");
    return res.redirect("/");
  })
}

