import React, { useState } from "react";
import axios from "axios";
import { PrismaClient } from "@prisma/client";
import { TextField, Button } from "@material-ui/core";

interface Props {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

export const Auth: React.FC<Props> = (props) => {
  const { isAuthenticated, setIsAuthenticated } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const prisma = new PrismaClient(); // create a new Prisma client

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Use Prisma to check if user exists and if their password matches
      const user = await prisma.user.findOne({
        where: {
          email,
        },
      });
      if (!user) {
        console.error("User not found");
        return;
      }
      const passwordMatches = await bcrypt.compare(password, user.password);
      if (!passwordMatches) {
        console.error("Incorrect password");
        return;
      }

      // Send login request to server
      const res = await axios.post("/api/login", {
        email,
        password,
      });

      if (res.status === 200) {
        console.log("Successfully logged in");
        setIsAuthenticated(true);
      } else {
        console.error("Error logging in");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Use Prisma to create a new user
      const hashedPassword = await bcrypt.hash(password, 10);
      await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
        },
      });

      // Send signup request to server
      const res = await axios.post("/api/signup", {
        email,
        password,
      });

      if (res.status === 200) {
        console.log("Successfully signed up");
        setIsAuthenticated(true);
      } else {
        console.error("Error signing up");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {isAuthenticated ? (
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setIsAuthenticated(false)}
        >
          Logout
        </Button>
      ) : (
        <form>
          <TextField
            label="Email"
            value={email}
            onChange={handleEmailChange}
            variant="outlined"
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            variant="outlined"
          />
          <Button variant="contained" color="primary" onClick={handleLogin}>
            Login
          </Button>
          <Button variant="contained" color="primary" onClick={handleSignup}>
            Signup
          </Button>
        </form>
      )}
    </div>
  );
};

