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
 
  
  // describe("POST route", () => {
  //   const quoteToPost = {
  //     quote: "Peaky focking blinders.",
  //     movie: " -Peaky Blinders",
  //     year: 2017,
  //   };
  
  //   const expectedResponse = {
  //     success: true,
  //     quote: {
  //       id: 25,
  //       quote: "Peaky focking blinders.",
  //       movie: " -Peaky Blinders",
  //       year: 2017,
  //     },
  //   };
  
  //   it("Should post a new quote successfuly", async () => {
  //     const response = await request(app).post("/quote").send(quoteToPost);
  
  //     expect(response.status).toBe(200);
  //     expect(response.body.success).toBe(expectedResponse.success);
  //     expect(response.body.quote).toEqual(expectedResponse.quote);
  
  //     await request(app).get(`/quote/${response.body.quote.id}`).expect(200);
  //   });
  // });