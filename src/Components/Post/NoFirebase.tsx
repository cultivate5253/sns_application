import React, { useState } from "react";
import axios from "axios";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme: Theme) =>
createStyles({
textField: {
marginLeft: theme.spacing(1),
marginRight: theme.spacing(1),
width: "100%",
},
button: {
margin: theme.spacing(1),
},
})
);

export const Post: React.FC = () => {
const classes = useStyles();
const [text, setText] = useState("");
const [error, setError] = useState("");

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
setText(e.target.value);
};

const handleSubmit = async (e: React.FormEvent) => {
e.preventDefault();
try {
// Send post request to server
const res = await axios.post("/api/posts", {
text,
});

  if (res.status === 200) {
    console.log("Successfully created post");
    setText("");
  } else {
    setError(res.data.error);
  }
} catch (err) {
  console.error(err);
  setError("Error creating post");
}
};

const useStyles = makeStyles((theme) => ({
form: {
width: "100%",
marginTop: theme.spacing(1),
},
textField: {
marginLeft: theme.spacing(1),
marginRight: theme.spacing(1),
width: "100%",
},
button: {
margin: theme.spacing(1),
},
}));

const classes = useStyles();

return (

  <div>
    <form className={classes.form} onSubmit={handleSubmit}>
      <TextField
        id="outlined-basic"
        label="Post"
        variant="outlined"
        value={text}
        onChange={handleChange}
        className={classes.textField}
        placeholder="Write your post here"
        error={error !== ""}
        helperText={error !== "" ? error : ""}
      />
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        type="submit"
      >
        Post
      </Button>
    </form>
  </div>
);
};
