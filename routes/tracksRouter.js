// routes/tracksRouter.js
const { Router } = require("express");
const tracksController = require("../controllers/tracksController");
const tracksRouter = Router();

tracksRouter.get("/", tracksController.tracksListGet);
tracksRouter.get("/:id", tracksController.trackDetailGet);
// tracksRouter.post("/create", tracksController.tracksCreatePost);

module.exports = tracksRouter;
