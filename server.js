const express = require("express");

const app = express();
const bodyParser = require("body-parser");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");

const PORT = 3030;

app.use(bodyParser.json());

// app.get("/", (req, res) => {
//   res.send("Welcome to our campus voting App!");
// });

async function hashPassword(password) {
  try {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    const hashPassword = await bcrypt.hash(password, salt);
    return hashPassword;
  } catch (error) {
    console.log("Hashing password error", error);
    throw error;
  }
}

app.post("/signup", async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    const hashPassword = await hashPassword(password);

    const newVoter = await prisma.voter.create({
      data: { fullName, email, password: hashPassword },
    });

    res.status(200).json({ newVoter });
  } catch (error) {
    console.log(error);
    res.status(409).json({ error: "Internal server error" });
  }
});

const generatVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 90000).toString();
};

const sendVerificationEmail = async (email, code) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "konum5437@gmail.com",
      pass: "Joseph_5",
    },
  });

  const mailOptions = {
    from: "konum5437@gmail.com",
    to: "email",
    subject: "Verification Code",
    text: "Your verification code is ${code}",
  };

  await transporter.sendMail(mailOptions);
};

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}!`);
});
