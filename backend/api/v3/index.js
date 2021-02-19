const { Router } = require("express");
const b = require("./b");

const v3 = Router();

v3.use("/b", b);
v3.use("*", (req, res) => {
  res.status(404).send(({"message": "Page Not Found"}));
});

module.exports = v3;