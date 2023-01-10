import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const router = express.Router();

type LoginBody = {
  email: string;
  password: string;
};

router.post("/login", async (req, res) => {
  const { email, password }: LoginBody = req.body;
  // Check if a user with the given email exists
  const user = await prisma.user.findOne({ where: { email } }); //事前に定義されたDBのuserモデルに対し、findOneメソッドを使用して、emailを条件に検索を行う
  
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

module.exports = router;

