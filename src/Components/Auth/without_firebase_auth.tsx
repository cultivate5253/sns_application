import React, { useState } from "react";
import axios from "axios";
import { PrismaClient } from "@prisma/client";

interface Props {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

const Auth: React.FC<Props> = (props) => {
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
        <button onClick={() => setIsAuthenticated(false)}>Logout</button>
      ) : (
        <form>
          <input type="text" value={email} onChange={handleEmailChange} />
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <button type="submit" onClick={handleLogin}>
            Login
          </button>
          <button type="submit" onClick={handleSignup}>
            Signup
          </button>
        </form>
      )}
    </div>
  );
};

export default Auth;
