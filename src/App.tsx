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
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
        </header>
        <Follow />
        <DM />
        <Search />
        <Post />
        <FavRT />
        <Auth />
      </div>
    </ThemeProvider>
  );
}

export default App;
