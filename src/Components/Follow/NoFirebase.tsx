import React from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

interface Props {
userId: string;
currentUserId: string;
}

const useStyles = makeStyles((theme) => ({ //スタイルを定義
button: {
margin: theme.spacing(1),
},
}));

export const Follow: React.FC<Props> = (props) => {
const classes = useStyles();  //上記で定義したスタイルをコンポーネントから呼び出せるようにする

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
    <Button
      variant="contained"
      color="primary"
      className={classes.button}
      onClick={handleFollow}
    >
      Follow
    </Button>
    <Button
      variant="contained"
      color="secondary"
      className={classes.button}
      onClick={handleUnfollow}
    >
      Unfollow
    </Button>
  </div>
);
}

