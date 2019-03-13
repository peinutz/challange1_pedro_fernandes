let { shasum } = require("../helper/shasum");
const expect = require("chai").expect;

describe("Shasum", () => {
  it("should return the correct hash for a string", () => {
    let message = "foo";
    let expectedResult =
      "2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae";

    let actualResult = shasum(message);

    expect(actualResult).to.equal(expectedResult);
  });
});
