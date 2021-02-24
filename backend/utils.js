const fs = require("fs");

const delay = (request, response, next) => {
  setTimeout(next, 1000);
};

const blankBinCheck = (request, response, next) => {
  const bin = request.body;
  if (Object.keys(bin).length === 0) {
    response.status(400).send({ message: "Bin cannot be blank" });
    return;
  }
  next();
};

const checkID = (request, response, next) => {
  const { id } = request.params;
  if (id.length !== 13 || /\D/.test(id)) {
    response.status(400).send({ message: "Invalid ID" });
    return;
  }
  next();
};

const checkBin = (request, response, next) => {
  let allUsers = fs.readdirSync("./backend/bins");
  const { id } = request.params;
  if (!allUsers.includes(`${id}.json`)) {
    response.status(404).send({ message: "ID cannot be found" });
  } else {
    next();
  }
};

module.exports = {
  blankBinCheck: blankBinCheck,
  checkID: checkID,
  delay: delay,
  checkBin: checkBin,
};
