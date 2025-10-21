// routes/tracksRouter.js
const { Router } = require("express");
const tracksController = require("../controllers/tracksController");
const tracksRouter = Router();

tracksRouter.get("/", tracksController.tracksListGet);

tracksRouter.post("/create", tracksController.tracksCreatePost);
tracksRouter.get("/create", tracksController.tracksCreateGet);

tracksRouter.get("/:id", tracksController.trackDetailGet);

tracksRouter.get("/:id/update", tracksController.tracksUpdateGet);
tracksRouter.post("/:id/update", tracksController.tracksUpdatePost);

module.exports = tracksRouter;
