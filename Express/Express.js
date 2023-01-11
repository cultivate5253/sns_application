const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const connection = require('./database');
const router = express.Router();

type LoginBody = {
  email: string;
  password: string;
};

router.post("/login", async (req, res) => {
  const { email, password }: LoginBody = req.body;
  // Check if a user with the given email exists
  const user = await prisma.user.findOne({ where: { email } }); 
  
  if (!user) {
    return res.status(401).send({ message: "Invalid email or password" });
  }
  // Check if the provided password is correct
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(401).send({ message: "Invalid email or password" });
  }
  // If the email and password are correct, generate a JWT
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
  res.send({ token });
});

router.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;
    // Check if the email address is already in use
    const emailTaken = await prisma.user.findOne({ where: { email } });
    if (emailTaken) {
        return res.status(409).send({ message: "Email already in use" });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        // Create a new user in the database
        const user = await prisma.user.create({
            data: { name, email, password: hashedPassword }
        });
        res.send({ message: "User created successfully" });
    } catch (err) {
        res.status(500).send({ message: "An error occurred" });
    }
});

router.get("/tweets", async (req, res) => {
  try {
    // Get all tweets
    const tweets = await prisma.tweet.findMany();
    res.send(tweets);
  } catch (err) {
    res.status(500).send({ message: "An error occurred" });
  }
});

router.post("/tweets", async (req, res) => {
  const { content } = req.body;
  try {
    // Create a new tweet
    const tweet = await prisma.tweet.create({
      data: {
        content,
        user: {
          connect: { id: req.userId },
        },
      },
    });
    res.send(tweet);
  } catch (err) {
    res.status(500).send({ message: "An error occurred" });
  }
});

router.post("/messages", async (req, res) => {
  const { senderId, receiverId, content } = req.body;
  try {
    // Create a new message
    const message = await prisma.message.create({
      data: {
        sender: {
          connect: { id: senderId },
        },
        receiver: {
          connect: { id: receiverId },
        },
        content,
      },
    });
    res.send(message);
  } catch (err) {
    res.status(500).send({ message: "An error occurred" });
  }
});

module.exports = router;

