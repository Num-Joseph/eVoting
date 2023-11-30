const express = require("express");
const app = express();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const PORT = 3030;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to our campus voting App!");
});

app.post("/signup", async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    const newVoter = await prisma.voter.create({
      data: { fullName, email, password },
    });

    res.status(200).json({ newVoter });
  } catch (error) {
    console.log(error);
    res.status(409).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}!`);
});
