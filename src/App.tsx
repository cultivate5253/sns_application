import React from "react";
import logo from "./logo.svg";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { DM } from "./components/DM";
import { Search } from "./components/Search";
import { Post } from "./components/Post";
import { FavRT } from "./components/FavRT";
import { Auth } from "./components/Auth";
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