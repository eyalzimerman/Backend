const fs = require("fs");

const delay = (request, response, next) => {
    setTimeout(next, 1000);
}


const blankBinCheck = (request, response , next) => {
    const bin = request.body;
    if(Object.keys(bin).length === 0) {
        response.status(400).send(({"message": "Bin cannot be blank"}));
    } else {
        next();
    }
}

const checkID = (request, response, next) => {
    let allUsers = fs.readdirSync('./backend/bins');
    const { id } = request.params;
    if(!allUsers.includes(`${id}.json`)) {
        response.status(400).send(({"message": "ID cannot found"}));
    } else {
        next();
    }
}

module.exports = {
    blankBinCheck: blankBinCheck,
    delay: delay,
    checkID: checkID
}
