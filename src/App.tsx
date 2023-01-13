import React from "react";
import logo from "./logo.svg";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { DM } from "./Components/DM/NoFirebase";
import { Search } from "./Components/Search/NoFirebase";
import { Post } from "./Components/Post/NoFirebase";
import { FavRT } from "./Components/FavRT/NoFirebase";
import { Auth } from "./Components/Auth/NoFirebase";
import { Follow } from "./Components/Follow/NoFirebase";
import "./App.css";

const theme = createTheme({
  // additional CSS styles
});

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [tweetId, setTweetId] = useState("");
  const [userId, setUserId] = useState("");
   const [currentUserId, setCurrentUserId] = useState("");

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
        </header>
        <Follow userId={userId} currentUserId={currentUserId} />
        <DM userId={userId} currentUserId={currentUserId} />
        <Search />
        <Post />
        <FavRT tweetId={tweetId} userId={userId} />
        <Auth isAuthenticated={isAuth} setIsAuthenticated={setIsAuth} />
      </div>
    </ThemeProvider>
  );
}

export default App;
