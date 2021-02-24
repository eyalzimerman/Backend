const request = require("supertest");
const fs = require("fs");

const app = require("./backend/app");
let dataToDelete = [];

describe("GET route", () => {
  const expectedBin = {
    "my-todo": [
      {
        priority: "1",
        date: "2021-02-15 08:01:50",
        text: "eyal",
      },
    ],
  };

  const expectedIdError = { message: "Invalid ID" };
  const expectedBinError = { message: "ID cannot be found" };

  it("Should return a bin by a given id", async () => {
    const response = await request(app).get("/api/v3/b/1613733860787");

    // Is the status code 200
    expect(response.status).toBe(200);

    // Is the body equal expectedBin
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

beforeAll(() => {
  console.log("Tests Started");
  dataToDelete = [];
});
afterAll(() => {
  console.log("Tests ended");
});

afterEach(() => {
  let allUsers = fs.readdirSync("./backend/bins");
  for (let i = 0; i < allUsers.length; i++) {
    for (let j = 0; j < dataToDelete.length; j++) {
      if (allUsers[i] === dataToDelete[j]) {
        fs.unlinkSync(`./backend/bins/${allUsers[i]}`);
      }
    }
  }
});

let allUsers = fs.readdirSync("./backend/bins");
let allUsersLengthBeforeUpdateAndPost = allUsers.length;

describe("POST route", () => {
  const binToPost = {
    priority: "1",
    date: "2021-02-15 08:01:50",
    text: "fghfgbgg",
  };

  const binIllegal = {};
  const binIllegalExpected = { message: "Bin cannot be blank" };

  it("Should post a new bin successfully", async () => {
    const response = await request(app).post("/api/v3/b/").send(binToPost);
    const id = JSON.parse(response.text).id;
    const expectedResponse = { message: "task added successfully", id };

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expectedResponse);
    dataToDelete.push(`${id}.json`);
  });

  it("Should not add a blanked bin with illegal body", async () => {
    const response = await request(app).post("/api/v3/b/").send(binIllegal);

    expect(response.status).toBe(400);
    expect(response.body).toEqual(binIllegalExpected);
  });
});

describe("PUT route", () => {
  const binToUpdate = {
    "my-todo": [
      {
        priority: "1",
        date: "2021-02-15 08:01:50",
        text: "eyal",
      },
    ],
  };
  const expectedUpdateBin = {
    "my-todo": [
      {
        priority: "1",
        date: "2021-02-15 08:01:50",
        text: "eyal",
      },
    ],
  };
  const expectedBinError = { message: "ID cannot be found" };
  const expectedIdError = { message: "Invalid ID" };
  it("Should update a bin by a given id", async () => {
    const response = await request(app)
      .put("/api/v3/b/1613733860787")
      .send(binToUpdate);

    // Is the status code 200
    expect(response.status).toBe(200);

    // Is the body equal expectedBin
    expect(response.body).toEqual(expectedUpdateBin);
  });

  it("Should not create new bin when updating", async () => {
    const response = await request(app)
      .put("/api/v3/b/1613733860787")
      .send(binToUpdate);

    // Is the status code 200
    expect(response.status).toBe(200);

    // Is the body equal expectedBin
    expect(response.body).toEqual(expectedUpdateBin);

    allUsers = fs.readdirSync("./backend/bins");
    let allUsersLengthAfterUpdate = allUsers.length;

    // Is the length of all bins is equal before and after update
    expect(allUsersLengthBeforeUpdateAndPost).toEqual(
      allUsersLengthAfterUpdate
    );
  });

  it("Should return an error message with status code 400 for illegal id", async () => {
    const response = await request(app)
      .put("/api/v3/b/asdasd")
      .send(binToUpdate);

    // Is the status code 400
    expect(response.status).toBe(400);

    // Is the body equal expectedId
    expect(response.body).toEqual(expectedIdError);
  });

  it("Should return an error message with status code 404 for not found bin", async () => {
    const response = await request(app)
      .put("/api/v3/b/1213733861187")
      .send(binToUpdate);

    // Is the status code 404
    expect(response.status).toBe(404);

    // Is the body equal expectedBin
    expect(response.body).toEqual(expectedBinError);
  });
});

describe("DELETE route", () => {
  const expectedResponse = { message: "task delete successfully" };
  const expectedIdError = { message: "Invalid ID" };
  const expectedBinError = { message: "ID cannot be found" };
  it("Should delete a bin by id", async () => {
    const response = await request(app).delete("/api/v3/b/1111111111111");
    // Is the status code 200
    expect(response.status).toBe(200);

    // Is the body equal expectedBin
    expect(response.body).toEqual(expectedResponse);
  });

  it("Should return an error message with status code 400 for illegal id", async () => {
    const response = await request(app).delete("/api/v3/b/asdasd");

    // Is the status code 400
    expect(response.status).toBe(400);

    // Is the body equal expectedId
    expect(response.body).toEqual(expectedIdError);
  });
  it("Should return an error message with status code 404 for Bin not found", async () => {
    const response = await request(app).delete("/api/v3/b/1111111121111");
    expect(response.status).toBe(404);
    expect(response.body).toEqual(expectedBinError);
  });
});
