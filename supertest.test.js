const request = require("supertest");
const fs = require("fs")
const app = require("./backend/app");
let dataToDelete =[];
const expectedIDError = {message: "ID cannot be found"}
const expectedBinError = {message: "Bin cannot be found"}
//test for get
describe("GET route", () => {
    const expectedBin = {
        "my-todo": [
            {
                "priority": "1",
                "date": "2021-02-15 08:01:50",
                "text": "shira"
            },
        ],
    };
  
    
    it("Should return a bin by a given id", async () => {
      const response = await request(app).get("/api/v3/b/1613733860787");
  
      expect(response.status).toBe(200);
      expect(response.body).toEqual(expectedBin);
    });
  
    it("Sholud return an error message with status code 400 for illgeal ID", async () => {
      const response = await request(app).get("/api/v3/b/fhgfhj");
  
      expect(response.status).toBe(400);
      expect(response.body.message).toEqual(expectedIDError.message);
    });

    it("Sholud return an error message with status code 404 for Bin not found", async () => {
      const response = await request(app).get("/api/v3/b/1111111111111");
  
      expect(response.status).toBe(404);
      expect(response.body.message).toEqual(expectedBinError.message);
    });
  });
 
  //test for post
  beforeAll(() => {
    console.log("Test Start");
    dataToDelete =[];

  });
  describe("POST route", () => {

    const binToPost = {
      priority: "1",
      date: "2021-02-15 08:01:50",
      text: "fghfgbgg"
    };
    const binIllegal = {}
    
    it("Should post a new Bin successfully", async () => {
      const response = await request(app).post("/api/v3/b").send(binToPost);
      const id= JSON.parse(response.text).id;
      const expectedResponse = {"message":"task added successfully", id}

      expect(response.status).toBe(200);
      expect(response.body).toEqual(expectedResponse);

      dataToDelete.push(`${id}.json`);

      await request(app).get(`/api/v3/b/${response.body.id}`).expect(200);
    });

    it("Should not add a blanked bin with illegal body", async () => {
      const response = await request(app).post("/api/v3/b").send(binIllegal);
      const binIllegalExpected = {"message" : "Bin cannot be blank"};

      expect(response.status).toBe(400);
      expect(response.body).toEqual(binIllegalExpected);
    });
  });
afterAll(() => {
  console.log("Test Ended");
  let allUsers = fs.readdirSync("./backend/bins");
  for (let i = 0; i <allUsers.length; i++) {
    for(let j = 0; j< dataToDelete.length; j++) {
    if(allUsers[i] === dataToDelete[j]) {
      fs.unlinkSync(`./backend/bins/${allUsers[i]}`);
    }
  }
}
  });
  console.log(dataToDelete);
//test for put
  describe("Put route", () => {
    const updateBin = {
      "my-todo": [
        {
            "priority": "1",
            "date": "2021-02-15 08:01:50",
            "text": "shira"
        }
    ]
    };
    const expectedUpdateBin = {
        "my-todo": [
            {
                "priority": "1",
                "date": "2021-02-15 08:01:50",
                "text": "shira"
            }
        ]
    };
    it("Should update a Bin successfully", async () => {
      const response = await request(app).put("/api/v3/b/1613733860787").send(updateBin);
  
      expect(response.status).toBe(200);
      expect(response.body).toEqual(expectedUpdateBin);
  
    });

 it("No new file is created by put", async () => {

  let allUsers = fs.readdirSync("./backend/bins");
  allUsersLengthBefore = allUsers.length

  const response = await request(app).put("/api/v3/b/1613733860787").send(updateBin);
  
  expect(response.status).toBe(200);
allUsersLengthAfter = allUsers.length
  expect(response.body).toEqual(expectedUpdateBin);
expect(allUsersLengthBefore).toEqual(allUsersLengthAfter)
 });

it("return a error status message 400 for illegal ID", async () => {
  const response = await request(app).get("/api/v3/b/fhgfhj");
  
  expect(response.status).toBe(400);
  expect(response.body).toEqual(expectedIDError);
});

it("Sholud return an error message with status code 404 for Bin not found", async () => {
  const response = await request(app).get("/api/v3/b/1111111111111");

  expect(response.status).toBe(404);
  expect(response.body).toEqual(expectedBinError);
});
  });

describe("Delete route", () => {
  const expectedResponse = {"message": "removed bin!"}
  it("Should delete a Bin by id", async () => {
    const response = await request(app).delete("/api/v3/b/1234567890123")
    
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expectedResponse);
  
  });
  it("Should return an error message with status code 400 for illegal ID", async () => {
    const response = await request(app).delete("/api/v3/b/gfh");
console.log(response);
    expect(response.status).toBe(400);
    expect(response.body).toEqual(expectedIDError);
  });

  it("Should return an error message with status code 404 for Bin not found", async () => {
    const response = await request(app).delete("/api/v3/b/1111111111111");

    expect(response.status).toBe(404);
    expect(response.body).toEqual(expectedBinError);
  });
});

