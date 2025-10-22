// routes/artistsRouter.js
const { Router } = require("express");
const artistsController = require("../controllers/artistsController");
const artistsRouter = Router();

artistsRouter.get("/", artistsController.artistsListGet);

artistsRouter.get("/create", artistsController.artistsCreateGet);
artistsRouter.post("/create", artistsController.artistsCreatePost);

artistsRouter.get("/:id", artistsController.artistDetailGet);

artistsRouter.get("/:id/update", artistsController.artistUpdateGet);
artistsRouter.post("/:id/update", artistsController.artistUpdatePost);

module.exports = artistsRouter;
