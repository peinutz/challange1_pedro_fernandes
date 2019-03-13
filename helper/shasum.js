var crypto = require("crypto");

const shasum = function(str) {
  return crypto
    .createHash("sha256")
    .update(str, "utf8")
    .digest("hex");
};

module.exports = {
  shasum
};
