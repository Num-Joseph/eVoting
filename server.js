const express = require("express");
const app = express();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const PORT = 3030;

app.get("/", (req, res) => {
  res.send("Welcome to our campus voting App!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}!`);
});
