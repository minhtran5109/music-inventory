// routes/artistsRouter.js
const { Router } = require("express");
const artistsController = require("../controllers/artistsController");
const artistsRouter = Router();

artistsRouter.get("/", artistsController.artistsListGet);
artistsRouter.get("/:id", artistsController.artistDetailGet);
// artistsRouter.post("/create", artistsController.artistsCreatePost);

module.exports = artistsRouter;
