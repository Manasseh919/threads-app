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

const User = require("./models/User");
const Post = require("./models/Post");

/* endpoint to register a user in the backend/*  */
app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    //create new user
    const newUser = new User({ name, email, password });

    //generate and store the verification token
    newUser.verificationToken = crypto.randomBytes(20).toString("hex");

    //save user to backend
    await newUser.save();

    //send the verification email to the user
    sendVerificationEmail(newUser.email, newUser.verificationToken);

    res.status(200).json({ message: "Registration successful " });
  } catch (error) {
    console.log("error registering user", error);
    res.status(500).json({ message: "Error registering user" });
  }
});

const sendVerificationEmail = async (email, verificationToken) => {
  //create a nodemailer transporter

  const transporter = nodemailer.createTestAccount({
    service: "gmail",
    auth: {
      user: "manasseh919@gmail.com",
      pass: "pyms cgdv rrag zlyr",
    },
  });

  //compose the email message
  const mailOptions = {
    from: "threads.com",
    to: email,
    subject: "Email Verification",
    text: `please click the following link to verify your email http://localhost:4000/verify/${verificationToken}`,
  };
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log("error sending mail: ", error);
  }
};

app.get("/verigy/:token", async (req, res) => {
  try {
    const token = req.params.token;

    const user = await User.findOne({ verificationToken: token });
    if(!user){
        return res.status(400).json({message:"Invalid Token"})
    }

    user.verified = true;
    user.verificationToken = undefined;
    await user.save()
  } catch (error) {
    console.log("error getting token", error);
    res.status(500).json({ message: "email verfication failed" });
  }
});
