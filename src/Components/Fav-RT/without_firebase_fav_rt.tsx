import React, { useState, useEffect } from "react";
import axios from "axios";
import { PrismaClient } from "@prisma/client";

interface Props {
  tweetId: string;
  userId: string;
}

const FavRt: React.FC<Props> = (props) => {
  const { tweetId, userId } = props;
  const [isFavorited, setIsFavorited] = useState(false);
  const [isRetweeted, setIsRetweeted] = useState(false);
  const prisma = new PrismaClient(); // create a new Prisma client

  const handleFavorite = async () => {
    try {
      // Send favorite request to server
      const res = await axios.post("/api/favorite", {
        tweetId,
        userId,
      });

      if (res.status === 200) {
        console.log("Successfully favorited tweet");
        setIsFavorited(true);
      } else {
        console.error("Error favoriting tweet");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleRetweet = async () => {
    try {
      // Send retweet request to server
      const res = await axios.post("/api/retweet", {
        tweetId,
        userId,
      });

      if (res.status === 200) {
        console.log("Successfully retweeted tweet");
        setIsRetweeted(true);
      } else {
        console.error("Error retweeting tweet");
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const checkFavorited = async () => {
      try {
        // Check if tweet is favorited
        const res = await axios.get(`/api/favorite/${tweetId}/${userId}`);
        const data = res.data;
        setIsFavorited(data.isFavorited);
      } catch (err) {
        console.error(err);
      }
    };

    const checkRetweeted = async () => {
      try {
        // Check if tweet is retweeted
        const res = await axios.get(`/api/retweet/${tweetId}/${userId}`);
        const data = res.data;
        setIsRetweeted(data.isRetweeted);
      } catch (err) {
        console.error(err);
      }
    };

    checkFavorited();
    checkRetweeted();
  }, []);

return (
  <div>
    {isFavorited ? (
      <button onClick={handleFavorite}>Unfavorite</button>
    ) : (
      <button onClick={handleFavorite}>Favorite</button>
    )}
    {isRetweeted ? (
      <button onClick={handleRetweet}>Unretweet</button>
    ) : (
      <button onClick={handleRetweet}>Retweet</button>
    )}
  </div>
);

export default FavRt;
