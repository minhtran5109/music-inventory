// routes/recordsRouter.js
const { Router } = require("express");
const recordsController = require("../controllers/recordsController");
const recordsRouter = Router();

recordsRouter.get("/", recordsController.recordsListGet);
// recordsRouter.get("/create", recordsController.recordsCreateGet);
// recordsRouter.post("/create", recordsController.recordsCreatePost);

module.exports = recordsRouter;
