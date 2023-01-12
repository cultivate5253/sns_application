import mysql, { Connection, OkPacket } from 'mysql2/promise';
import { FC, useEffect } from 'react';

interface IUsers {
  id: number;
  name: string;
  email: string;
  password: string;
}
interface ITweets {
  id: number;
  content: string;
  user_id: number;
}
interface IMessages {
  id: number;
  content: string;
  sender_id: number;
  receiver_id: number;
}

const CreateTables: FC = () => {
  useEffect(() => {
    (async function () {
      const connection: Connection = await mysql.createConnection({
        host: "localhost",
        user: "your-username",
        password: "your-password",
        database: "your-database-name",
      });
      try {
        const [usersResult]: [OkPacket] =
          await connection.execute(`CREATE TABLE users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255),
        email VARCHAR(255) UNIQUE,
        password VARCHAR(255)
      )`);
        console.log(
          `Users table created, affectedRows: ${usersResult.affectedRows}`
        );
        const [tweetsResult]: [OkPacket] =
          await connection.execute(`CREATE TABLE tweets (
          id INT AUTO_INCREMENT PRIMARY KEY,
          content TEXT,
          user_id INT,
          FOREIGN KEY (user_id) REFERENCES users(id)
        )`);
        console.log(
          `Tweets table created, affectedRows: ${tweetsResult.affectedRows}`
        );
        const [messagesResult]: [OkPacket] =
          await connection.execute(`CREATE TABLE messages (
          id INT AUTO_INCREMENT PRIMARY KEY,
          content TEXT,
          sender_id INT,
          receiver_id INT,
          FOREIGN KEY (sender_id) REFERENCES users(id),
          FOREIGN KEY (receiver_id) REFERENCES users(id)
        )`);
        console.log(
          `Messages table created, affectedRows: ${messagesResult.affectedRows}`
        );
      } catch (error) {
        console.log(error);
      } finally {
        await connection.end();
      }
    })();
  }, []);
  return <div>Loading...</div>;
};

export default CreateTables;
