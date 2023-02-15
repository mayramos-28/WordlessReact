import React from "react";
import { WordGame } from "./components/WordGame";

import "./css/keyboard.css";
import "./css/loading.css";
import "./css/error.css";
import "./css/game.css";
import "./css/index.css";
import "./css/letter.css";
import "./css/words.css";


function App() {
  return (
    <>
      <div id="root">
        <WordGame />
      </div>
    </>
  );
}

export default App;
