const request = require("supertest");
const app = require("./backend/app");

describe("GET route", () => {
    const expectedBin = {
        "my-todo": [
            {
                "priority": "1",
                "date": "2021-02-15 08:01:50",
                "text": "fghfgbgg"
            },
        ],
    };
  
    const expectedIDError = {message: "ID cannot be found"}
    const expectedBinError = {message: "Bin cannot be found"}
    it("Should return a quote by a given id", async () => {
      const response = await request(app).get("/api/v3/b/1613733860787");
  
      // Is the status code 200
      expect(response.status).toBe(200);
  
      // Is the body equal expectedQuote
      expect(response.body).toEqual(expectedBin);
    });
  
    it("Sholud return an error message with status code 400 for illgeal ID", async () => {
      const response = await request(app).get("/api/v3/b/fhgfhj");
  
      // Is the status code 400
      expect(response.status).toBe(400);
  
      // Is the body equal expectedQuote
      expect(response.body.message).toEqual(expectedIDError.message);
    });

    it("Sholud return an error message with status code 404 for Bin not found", async () => {
      const response = await request(app).get("/api/v3/b/1111111111111");
  
      // Is the status code 400
      expect(response.status).toBe(404);
  
      // Is the body equal expectedQuote
      expect(response.body.message).toEqual(expectedBinError.message);
    });
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
  
      await request(app).get(`/api/v3/b/${response.body.id}`).expect(200);
    });

    it("Should not add a blanked bin with illegal body", async () => {
      const response = await request(app).post("/api/v3/b").send(binIllegal);
      const binIllegalExpected = {"message" : "Bin cannot be blank"};

      expect(response.status).toBe(400);
      expect(response.body).toEqual(binIllegalExpected);
    });
  });