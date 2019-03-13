/* eslint-disable no-console */
const mongoose = require("mongoose");
const app = require("./app");

const db = process.env.MONGO_URL || "mongodb://mongo:27017/test-1";

mongoose
  .connect(db)
  // eslint-disable-next-line no-unused-vars
  .then(console.log("Connected to database"))
  .catch(err => console.log(err));

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server runing on port ${port}`));
