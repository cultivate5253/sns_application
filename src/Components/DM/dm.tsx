import React, { useState } from "react";
import firebase from "firebase";

// 送信する側のユーザーID
const senderId = "abcdefg";
// 受信する側のユーザーID
const receiverId = "hijklmn";

const DM = () => {
const [messages, setMessages] = useState([]);

// 相互フォローしているかどうかを確認する
const checkFollowState = async () => {
const senderDoc = await firebase
.firestore()
.collection("following")
.doc(senderId)
.get();


const receiverDoc = await firebase
  .firestore()
  .collection("following")
  .doc(receiverId)
  .get();

// senderIdがreceiverIdをフォローしているかどうか
const senderFollowsReceiver = senderDoc.data()[receiverId] === true;
// receiverIdがsenderIdをフォローしているかどうか
const receiverFollowsSender = receiverDoc.data()[senderId] === true;

// 相互フォローしている場合のみDMを送受信できる
if (senderFollowsReceiver && receiverFollowsSender) {
  return true;
} else {
  return false;
}
};

const sendMessage = () => {
  const message = "こんにちは";

  // 相互フォローしているかどうかを確認する
  if (checkFollowState()) {
    // メッセージを保存する
    firebase.firestore().collection("messages").add({
      senderId: senderId,
      receiverId: receiverId,
      message: message,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
  } else {
    // 相互フォローしていない場合はエラーを表示する
    console.error("相互フォローしていません");
  }
};

// DMを受信する
const receiveMessage = () => {
// 受信する側のユーザーが受信するDMのリストを取得する
const query = firebase
.firestore()
.collection("messages")
.where("receiverId", "==", receiverId);


query.onSnapshot((snapshot) => {
  snapshot.forEach((doc) => {
    setMessages((prevMessages) => [...prevMessages, doc.data()]);
  });
});
};

return (
<div>
<button onClick={sendMessage}>DMを送信する</button>
<button onClick={receiveMessage}>DMを受信する</button>
{messages.map((message) => (
<p>{message.message}</p>
))}
</div>
);
};

export default DM;