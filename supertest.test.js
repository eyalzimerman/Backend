const request = require("supertest");

const app = require("./backend/app");

describe("GET route", () => {
  const expectedBin = {
    "my-todo": [
      {
        priority: "1",
        date: "2021-02-15 08:01:50",
        text: "fghfgbgg",
      },
    ],
  };

  const expectedIdError = { message: "ID cannot be found" };
  const expectedBinError = { message: "Invalid ID" };

  it("Should return a bin by a given id", async () => {
    const response = await request(app).get("/api/v3/b/1613733860787");

    // Is the status code 200
    expect(response.status).toBe(200);

    // Is the body equal expectedQuote
    expect(response.body).toEqual(expectedBin);
  });

  it("Should return an error message with status code 400 for illegal id", async () => {
    const response = await request(app).get("/api/v3/b/asdasd");

    // Is the status code 400
    expect(response.status).toBe(400);

    // Is the body equal expectedId
    expect(response.body).toEqual(expectedIdError);
  });

  it("Should return an error message with status code 404 for not found bin", async () => {
    const response = await request(app).get("/api/v3/b/1613733861187");

    // Is the status code 404
    expect(response.status).toBe(404);

    // Is the body equal expectedBin
    expect(response.body).toEqual(expectedBinError);
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
