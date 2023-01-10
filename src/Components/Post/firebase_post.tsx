import React, { useState } from 'react';
import { Form, Input, Button, Textarea } from '@/components/ui';
import { useAuth } from "@/contexts/auth";
import { db } from "@/firebase";
import { storage } from "@/firebase";

const TweetForm = () => {
const { user } = useAuth();
const [text, setText] = useState('');
const [image, setImage] = useState(null);

const handleChangeText = (e) => {
setText(e.target.value);
};

const handleChangeImage = (e) => {
setImage(e.target.files[0]);
};

const handleSubmit = async(e) => {
  e.preventDefault();

  
  // Tweetを保存する
  const tweetRef = db.collection("tweets").doc();
  const tweet = {
    text,
    user: {
      id: user.uid,
      name: user.displayName,
      avatar: user.photoURL,
    },
    createdAt: new Date(),
  };
  await tweetRef.set(tweet);

  // 画像がある場合はCloud Storageに保存する
  if (image) {
    const fileRef = storage.ref().child(`tweet/${tweetRef.id}/${image.name}`);
    await fileRef.put(image);
    const imageUrl = await fileRef.getDownloadURL();
    await tweetRef.update({ imageUrl });
  }
  };

  return (
  <Form onSubmit={handleSubmit}>
  <Input type="text" value={text} onChange={handleChangeText} />
  <Input type="file" onChange={handleChangeImage} />
  <Button type="submit">Tweetする</Button>
  </Form>
  );
  };

export default TweetForm;