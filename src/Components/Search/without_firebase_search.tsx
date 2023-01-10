import React, { useState } from "react";
import axios from "axios";

const Search: React.FC = () => {
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
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search"
        />
        <button type="submit">Search</button>
      </form>
      {error && <p>{error}</p>}
      {results.map((result) => (
        <div key={result.id}>
          <h3>{result.title}</h3>
          <p>{result.body}</p>
        </div>
      ))}
    </div>
  );
};

export default Search;
