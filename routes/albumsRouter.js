const { Router } = require("express");
const albumsController = require("../controllers/albumsController");
const albumsRouter = Router();

albumsRouter.get("/", albumsController.albumsListGet);

albumsRouter.post("/create", albumsController.albumsCreatePost);
albumsRouter.get("/create", albumsController.albumsCreateGet);

albumsRouter.get("/:albumId/update", albumsController.albumUpdateGet);
albumsRouter.post("/:albumId/update", albumsController.albumUpdatePost);

module.exports = albumsRouter;
