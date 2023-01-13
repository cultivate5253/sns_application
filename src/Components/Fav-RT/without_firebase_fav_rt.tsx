import React, { useState, useEffect } from "react";
import axios from "axios";
import { PrismaClient } from "@prisma/client";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import RepeatIcon from "@material-ui/icons/Repeat";
interface Props {
tweetId: string;
userId: string;
}
const useStyles = makeStyles((theme: Theme) =>
createStyles({
favorite: {
color: theme.palette.error.main,
},
retweet: {
color: theme.palette.primary.main,
},
})
);
const FavRt: React.FC<Props> = (props) => {
const classes = useStyles();
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

if (res.status === 200) { console.log("Successfully favorited tweet"); setIsFavorited(!isFavorited); } else { console.error("Error favoriting tweet"); } 
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

if (res.status === 200) { console.log("Successfully retweeted tweet"); setIsRetweeted(!isRetweeted); } else { console.error("Error retweeting tweet"); } 
} catch (err) {
console.error(err);
}
};
useEffect(() => {
const checkFavorited = async () => {
try {
// Check if tweet is favorited
const res = await axios.get(/api/favorite/${tweetId}/${userId});
const data = res.data;
setIsFavorited(data.isFavorited);
} catch (err) {
console.error(err);
}
};
const checkRetweeted = async () => {
try {
// Check if tweet is retweeted
const res = await axios.get(/api/retweet/${tweetId}/${userId});
const data = res.data;
setIsRetweeted(data.isRetweeted);
} catch (err) {
console.error(err);
}
};
checkFavorited();
checkRetweeted();
}, []);
const useStyles = makeStyles((theme) => ({
button: {
margin: theme.spacing(1),
},
}));
const classes = useStyles();

return (
  <div>
    <IconButton onClick={handleFavorite}>
      {isFavorited ? (
        <FavoriteIcon className={classes.favorite} />
      ) : (
        <FavoriteBorderIcon className={classes.favorite} />
      )}
    </IconButton>
    <IconButton onClick={handleRetweet}>
      {isRetweeted ? (
        <RepeatIcon className={classes.retweet} />
      ) : (
        <RepeatIcon className={classes.retweet} />
      )}
    </IconButton>
  </div>
);
}
export default FavRt;