import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import express, { Request, Response, NextFunction } from 'express';

const prisma = new PrismaClient();
const router = express.Router();

interface LoginBody {
  email: string;
  password: string;
}

interface SignupBody {
  name: string;
  email: string;
  password: string;
}

interface MessageBody {
  senderId: number;
  receiverId: number;
  content: string;
}

router.post("/login", async (req: Request, res: Response, next: NextFunction) => {
  const { email, password }: LoginBody = req.body;
  try {
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
  } catch (err) {
    next(err);
  }
});

router.post("/signup", async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password }: SignupBody = req.body;
    try {
    // Check if the email address is already in use
    const emailTaken = await prisma.user.findOne({ where: { email } });
    if (emailTaken) {
        return res.status(409).send({ message: "Email already in use" });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
        // Create a new user in the database
        const user = await prisma.user.create({
            data: { name, email, password: hashedPassword }
        });
        res.send({ message: "User created successfully" });
    } catch (err) {
        next(err);
    }
});

router.get("/tweets", async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get all tweets
    const tweets = await prisma.tweet.findMany();
    res.send(tweets);
  } catch (err) {
    next(err);
  }
});

router.post(
  "/tweets",
  async (req: Request, res: Response, next: NextFunction) => {
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
      next(err);
    }
  }
);

router.post(
  "/messages",
  async (req: Request, res: Response, next: NextFunction) => {
    const { senderId, receiverId, content }: MessageBody = req.body;
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
      next(err);
    }
  }
);

router.patch(
  "/users",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Extract the userId, currentUserId, and follow/unfollow flag from the request body
      const { userId, currentUserId, follow, unfollow } = req.body;
      // Check if the current user is trying to follow themselves
      if (userId === currentUserId) {
        return res.status(400).send({ message: "Cannot follow yourself" });
      }
      // Check if the follow flag is set
      if (follow) {
        // Check if the current user is already following the target user
        const existingFollow = await prisma.follow.findOne({
          where: {
            followerId: currentUserId,
            followingId: userId,
          },
        });
        if (existingFollow) {
          return res
            .status(409)
            .send({ message: "You are already following this user" });
        }
        // Create a new follow relationship in the database
        await prisma.follow.create({
          data: {
            follower: { connect: { id: currentUserId } },
            following: { connect: { id: userId } },
          },
        });
        return res.send({ message: "Successfully followed user" });
      }
      // Check if the unfollow flag is set
      if (unfollow) {
        // Check if the current user is already following the target user
        const existingFollow = await prisma.follow.findOne({
          where: {
            followerId: currentUserId,
            followingId: userId,
          },
        });
        if (!existingFollow) {
          return res
            .status(409)
            .send({ message: "You are not following this user" });
        }
        // Delete the follow relationship from the database
        await prisma.follow.delete({
          where: {
            id: existingFollow.id,
          },
        });
        return res.send({ message: "Successfully unfollowed user" });
      }
    } catch (err) {
      next(err);
    }
  }
);

export default router;
