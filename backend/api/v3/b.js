const express = require("express");
const fs = require("fs");
const { checkID, blankBinCheck, checkBin } = require("../../utils");
const router = express.Router();
const middleware = require('../../utils');

router.use(express.json());
router.use(middleware.delay);

router.get("/", (request, response) => {
    try {
        let allUsers = fs.readdirSync('./backend/bins');
        let allBins = [];
    
        for (let i = 0; i < allUsers.length; i++) {
            let body = fs.readFileSync(`./backend/bins/${allUsers[i]}`, {encoding:'utf8', flag:'r'});
            body = JSON.parse(body);
            allBins.push(body);
        }
        response.status(200).json(allBins);
    } catch (e) {
        response.status(500).json({"message": "Internal Server Error!", "error": `${e}`});
    }
});

router.get("/:id", checkID, checkBin, (request, response) => {
    try {
        const { id } = request.params;
        let body = fs.readFileSync(`./backend/bins/${id}.json`, {encoding:'utf8', flag:'r'});
        body = JSON.parse(body);
        response.status(200).json(body); 
    } catch (e) {
        response.status(500).json({"message": "Internal Server Error!", "error": `${e}`});
    }
});
router.post("/", blankBinCheck, (request, response) => {
    try {
        const { body } = request;
        const id = Date.now();
        fs.writeFileSync(`./backend/bins/${id}.json`,JSON.stringify(body, null, 4));
        response.status(200).send({"message":"task added successfully",id : id});
    } catch (e) {
        response.status(500).json({"message": "Internal Server Error!", "error": `${e}`});
    }
});

router.put("/:id", checkID, blankBinCheck, checkBin, (request, response) => {
    try {
        let allUsers = fs.readdirSync('./backend/bins');
        const { id } = request.params;
        const { body } = request;
        for (let i = 0; i < allUsers.length; i++) {
            if (allUsers[i] === `${id}.json`) {
                    fs.writeFileSync(`./backend/bins/${id}.json`, JSON.stringify(body, null, 4));
                    response.status(200).json(body);
            }
        }
    } catch (e) {
        response.status(500).json({"message": "Internal Server Error!", "error": `${e}`});
    }
});

router.delete('/:id', checkID, checkBin, (request, response)=>{
    try {
        let allUsers = fs.readdirSync('./backend/bins');
        const { id } = request.params;
        for(let i = 0; i< allUsers.length; i++){
            if (allUsers[i] === `${id}.json`) {
                fs.unlinkSync(`./backend/bins/${id}.json`);
                response.status(201).send('removed');
            }
        }
    } catch (e) {
        response.status(500).json({"message": "Internal Server Error!", "error": `${e}`});
    }
});
    
module.exports = router;