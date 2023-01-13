import React, { useState } from "react";
import axios from "axios";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme: Theme) =>
createStyles({
form: {
display: "flex",
alignItems: "center",
},
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

export const Search: React.FC = () => {
  const classes = useStyles();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.get("/api/search", {
        params: {
          q: query,
        },
      });

      if (res.status === 200) {
        setResults(res.data);
      } else {
        setError(res.data.error);
      }
    } catch (err) {
      console.error(err);
      setError("Error searching");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className={classes.form}>
        <TextField
          id="query"
          label="Search"
          className={classes.textField}
          value={query}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Search
        </Button>
      </form>
      {error && <p>{error}</p>}
      {results.length > 0 && (
        <div>
          <h2>Results</h2>
          <ul>
            {results.map((result) => (
              <li key={result.id}>{result.title}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};



