import React from "react";
import axios from "axios";

interface Props {
  userId: string;
  currentUserId: string;
}

const Follow: React.FC<Props> = (props) => {
  const { userId, currentUserId } = props;

  const handleFollow = async () => {
    try {
      // Send follow request to server
      const res = await axios.patch("/api/users", {
        userId,
        currentUserId,
        follow: true,
      });

      if (res.status === 200) {
        console.log("Successfully followed user");
      } else {
        console.error("Error following user");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUnfollow = async () => {
    try {
      // Send unfollow request to server
      const res = await axios.patch("/api/users", {
        userId,
        currentUserId,
        unfollow: true,
      });

      if (res.status === 200) {
        console.log("Successfully unfollowed user");
      } else {
        console.error("Error unfollowing user");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <button onClick={handleFollow}>Follow</button>
      <button onClick={handleUnfollow}>Unfollow</button>
    </div>
  );
};

export default Follow;
