
const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const session = require("express-session");
const dotenv = require("dotenv");
const path = require("path");
const bodyParser = require("body-parser");
const favicon = require("serve-favicon");

const app = express();

const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

const indexRouter = require("./Routes/indexRouter");

const mongoUri = process.env.mongoUri || "mongodb://127.0.0.1:27017/deprem-harita-api";
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.static(path.join(__dirname, "public")));

dotenv.config({ path: path.join(__dirname, ".env") });

app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", indexRouter);

server.listen(PORT, () => {
  console.log("Server is listening on port", PORT);
})
