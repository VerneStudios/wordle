import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { LightModeProvider } from "./contexts/LightModeProvider";
import { GameProvider } from "./contexts/GameProvider";

ReactDOM.render(
  <React.StrictMode>
    <GameProvider>
      <LightModeProvider>
        <App />
      </LightModeProvider>
    </GameProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
