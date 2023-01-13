import React, { useState, useEffect } from "react";
import { PrismaClient } from "@prisma/client";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

interface Props {
  userId: string;
  currentUserId: string;
}

const useStyles = makeStyles((theme) => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "100%",
  },
  button: {
    margin: theme.spacing(1),
  },
}));

export const DM: React.FC<Props> = (props) => {
  const { userId, currentUserId } = props;
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState<any[]>([]);
  const prisma = new PrismaClient(); // create a new Prisma client
  const classes = useStyles();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Use Prisma to create a new message
      await prisma.message.create({
        data: {
          text: message,
          sender: {
            connect: { id: currentUserId },
          },
          recipient: {
            connect: { id: userId },
          },
        },
      });
      setMessage("");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchConversation = async () => {
      try {
        // Use Prisma to retrieve conversation
        const conversation = await prisma.message.findMany({
          where: {
            OR: [
              {
                AND: [{ senderId: userId }, { recipientId: currentUserId }],
              },
              {
                AND: [{ senderId: currentUserId }, { recipientId: userId }],
              },
            ],
          },
        });
        setConversation(conversation);
      } catch (err) {
        console.error(err);
      }
    };

    fetchConversation();
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          id="message"
          label="message"
          className={classes.textField}
          value={message}
          onChange={handleChange}
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={handleSubmit}
        >
          Send
        </Button>
      </form>

      <ul>
        {conversation.map((message: any) => (
          <li key={message.id}>{message.text}</li>
        ))}
      </ul>
    </div>
  );
};
