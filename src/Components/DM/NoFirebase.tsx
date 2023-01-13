import React, { useState, useEffect } from "react";
import axios from "axios";
import { PrismaClient } from "@prisma/client";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

interface Props {
userId: string;
currentUserId: string;
}

const useStyles = makeStyles((theme) => ({   //Reactコンポーネントに適用するスタイルを定義する

textField: {
marginLeft: theme.spacing(1), //theme.spacing(1)は8px
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
const res = await axios.get(/api/messages/${userId}/${currentUserId});
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

