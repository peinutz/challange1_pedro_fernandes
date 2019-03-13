/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-constant-condition */
const request = require("supertest");
const mongoose = require("mongoose");
const expect = require("chai").expect;
const mongoDB = "mongodb://127.0.0.1/test_database";
const app = require("../app");
const HashMessage = require("../models/HashMessage");

mongoose
  .connect(mongoDB)
  .then(console.log("Connected to test database"))
  .catch(err => console.log(err));

beforeEach(function(done) {
  function clearCollections() {
    for (var collection in mongoose.connection.collections) {
      mongoose.connection.collections[collection].remove(function() {});
    }
    return done();
  }

  if (mongoose.connection.readyState === 0) {
    mongoose.connect(mongoDB, function(err) {
      if (err) throw err;
      return clearCollections();
    });
  } else {
    return clearCollections();
  }
});

describe("API", () => {
  let server;

  before(() => {
    server = app.listen(3001);
  });

  after(done => {
    mongoose.connection.close();
    server.close(done);
  });

  it("when getting a hash should return 404 status code if hash not found", async () => {
    //Arrange
    let expectedMessage = "Message not found.";

    try {
      await request(server).get(
        "/message/2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae"
      );
    } catch (err) {
      expect(err.status).to.equal(404);
    }
  });

  it("when posting a message should return the correct hash", async () => {
    //Arrange
    let expectedHash =
      "2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae";
    let message = "foo";

    //Act
    let response = await request(server)
      .post("/message")
      .set("Accept", "application/json")
      .send({ message: message })
      .expect(200);

    //Assert
    expect(response.body.digest).to.equal(expectedHash);
  });

  it("when getting an existing hash returns the correct message", async () => {
    //Arrange
    let message = {
      message: "foo",
      hash: "2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae"
    };

    await new HashMessage(message).save();

    //Act
    let response = await request(server).get(
      "/message/2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae"
    );

    //Assert
    expect(response.body).to.equal(message.message);
    expect(response.status).to.equal(200);
  });
});
