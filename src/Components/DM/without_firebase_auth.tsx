import React, { useState, useEffect } from "react";
import axios from "axios";
import { PrismaClient } from "@prisma/client";

interface Props {
  userId: string;
  currentUserId: string;
}

const DM: React.FC<Props> = (props) => {
  const { userId, currentUserId } = props;
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState<any[]>([]);
  const prisma = new PrismaClient(); // create a new Prisma client

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Send message to server
      const res = await axios.post("/api/messages", {
        userId,
        currentUserId,
        message,
      });

      if (res.status === 200) {
        console.log("Successfully sent message");
        setMessage("");
      } else {
        console.error("Error sending message");
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchConversation = async () => {
      try {
        // Get conversation from server
        const res = await axios.get(`/api/messages/${userId}/${currentUserId}`);
        const data = res.data;
        setConversation(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchConversation();
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={message} onChange={handleChange} />
        <button type="submit">Send</button>
      </form>
      <ul>
        {conversation.map((message: any) => (
          <li key={message.id}>{message.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default DM;
