/* eslint-disable no-console */
const express = require("express");
const bodyParser = require("body-parser");
const { shasum } = require("./helper/shasum");
const HashMessage = require("./models/HashMessage");
var cors = require("cors");

const app = express();

app.use(cors());
//middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/message", async (req, res) => {
  const newMessage = {
    message: req.body.message,
    hash: shasum(req.body.message)
  };

  try {
    let hashMessage = await new HashMessage(newMessage).save();
    return res.status(200).json({
      digest: hashMessage.hash
    });
  } catch (err) {
    return res.status(500).json(err);
  }
});

app.get("/message/:hash", async (req, res) => {
  const hash = req.params.hash;
  try {
    let hashMessage = await HashMessage.findOne({ hash: hash });

    if (hashMessage) return res.status(200).json(hashMessage.message);

    return res.status(404).json({
      err_msg: "Message not found."
    });
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = app;
