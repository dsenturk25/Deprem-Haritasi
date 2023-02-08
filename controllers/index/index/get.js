
module.exports = (req, res) => {
  res.render("index/index", {
    page: "index/index",
    title: "Harita",
    includes: {
      external: {
        css: ["page", "general"],
        js: ["page", "functions"]
      }
    },
  })
}
