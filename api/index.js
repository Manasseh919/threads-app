const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const app = express();
const port = 4000;
const cors = require("cors");

app.use(cors());


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const jwt = require("jsonwebtoken");

mongoose
  .connect(
    "mongodb+srv://manasseh919:manasseh4313@cluster0.kbo3uam.mongodb.net/",
    {
      usenewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log(`Connected to mongo DB: ${mongoose.connection.host} `);
  })
  .catch((err) => {
    console.log("Error connecting to mongo DB");
  });

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
