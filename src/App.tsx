import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import { Follow } from './components/Follow';
import { Post } from './components/Post';
import { DM } from './components/DM';
import { Auth } from './components/Auth';
import './App.css';
import { createTheme, ThemeProvider } from "@material-ui/core/styles";　　//ThemeProviderは、カスタマイズしたスタイルを適用するために使う


const theme = createTheme({   //独自のスタイルを設定
  // 追加のCSSスタイル
});

function App() {
  return (
  <ThemeProvider theme={theme}>
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Counter />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <span>
          <span>Learn </span>
          <a
            className="App-link"
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux-toolkit.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a
            className="App-link"
            href="https://react-redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Redux
          </a>
        </span>
      </header>
      <Follow />
      <Post />
      <DM />
      
      <Auth />
  
    </div>
  </ThemeProvider>
  );
}

export default App;
