import React, { useState, useEffect } from "react";
import { db } from "@/firebase";
import { Link } from "react-router-dom";
import { Avatar, Button, Loading } from "@/components/ui";

const TweetList = () => {
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = db.collection("tweets").onSnapshot((snapshot) => {
      const tweets = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTweets(tweets);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <div>
      {tweets.map((tweet) => (
        <div key={tweet.id}>
          <Link to={`/${tweet.user.id}`}>
            <Avatar src={tweet.user.avatar} alt={tweet.user.name} />
          </Link>
          <div>
            <Link to={`/${tweet.user.id}`}>{tweet.user.name}</Link>
            <p>{tweet.text}</p>
            {tweet.imageUrl && <img src={tweet.imageUrl} alt="Tweet画像" />}
          </div>
          <Button>コメントする</Button>
        </div>
      ))}
    </div>
  );
};

export default TweetList;
