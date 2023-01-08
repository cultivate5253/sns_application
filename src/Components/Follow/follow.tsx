import React, { useState } from "react";
import firebase from "firebase";

interface FollowProps {
targetUserId: string;
}

const Follow: React.FC<FollowProps> = ({ targetUserId }) => {
const [following, setFollowing] = useState(false);
const userId = firebase.auth().currentUser.uid;

// フォロー状態を取得する
const getFollowState = () => {
firebase
.firestore()
.collection("following")
.doc(userId)
.get()
.then((doc) => {
setFollowing(doc.data()[targetUserId] === true); // [targetUserId] === trueは条件式
});
};

// フォロー/フォロー解除を実行する
const toggleFollow = () => {
// フォロー状態を反転する
setFollowing((following) => !following);


// フォロー情報を保存する
firebase
  .firestore()
  .collection("following")
  .doc(userId)
  .set(
    {
      [targetUserId]: !following,
    },
    { merge: true }
  );

// プロフィールにフォローしたユーザーのIDを保存する
firebase
  .firestore()
  .collection("users")
  .doc(userId)
  .set(
    {
      following: firebase.firestore.FieldValue.arrayUnion(targetUserId),
    },
    { merge: true }
  );
};

return (
<button onClick={toggleFollow}>
{following ? "フォロー解除" : "フォロー"}
</button>
);
};

export default Follow;