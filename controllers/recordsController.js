const { body, validationResult } = require("express-validator");
const db = require("../db/queries");

async function recordsListGet (req, res) {
  // console.log("Records: ", records);
  // res.send("Records: " + records.map(record => record.title).join(", "));
  res.render("index", {
    title: "Record list",
    // records: records,
  });
}

//TODO: implement the rest of the controller functions (create, update, delete, search)

module.exports = {
  recordsListGet,
  // recordsCreateGet,
  // recordsCreatePost,
};
