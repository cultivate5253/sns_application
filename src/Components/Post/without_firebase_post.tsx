import React, { useState } from "react";
import axios from "axios";

const Post: React.FC = () => {
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

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={text}
          onChange={handleChange}
          placeholder="Write your post here"
        />
        <button type="submit">Post</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default Post;
