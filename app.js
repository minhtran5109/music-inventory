require('dotenv').config();
const express = require("express");
const path = require("path");

const tracksRouter = require("./routes/tracksRouter");
const artistsRouter = require("./routes/artistsRouter");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));

app.use("/tracks", tracksRouter);
app.use("/artists", artistsRouter);

app.get("/", (req, res) => {
  res.send("Welcome to Music DB");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
