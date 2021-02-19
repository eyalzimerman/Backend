
const fs = require("fs");

const delay = (request, response, next) => {
    setTimeout(next, 1000);
}

const blankBinCheck = (request, response, next) => {
    const bin = Request.body;
    if(Object.keys(bin).length === 0) {
        response.status(404).send(({"message" : "Bin cannot be blank"}));
    }
    next();
}

const checkID = (request, response, next) => {
    let allUsers = fs.readdirSync('.backend/bins');
    const {id} = Request.params;
    if(!allUsers.includes(`%{id}.json`)) {
        response.status(404).send(({"message" :"ID cannot found"}));
    }
    next();
}


module.exports = {
    blankBinCheck: blankBinCheck,
    checkID: checkID,
    delay: delay

}
