import { useEffect, useState, useContext } from "react";
import Instructions from "./components/Instructions";
import Navbar from "./components/Navbar";
import CookiesManager from "./js/CookiesManager";
import { LightModeContext } from "./contexts/LightModeProvider";
import { GameContext } from "./contexts/GameProvider";
import GameGrid from "./components/GameGrid";
import KeyBoard from "./components/KeyBoard";
import EndGameModal from "./components/EndGameModal";

const cookiesManager = new CookiesManager();

function App() {
  const [showInstructions, setShowInstructions] = useState(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  const { bgColor } = useContext(LightModeContext);

  const { gameEnded } = useContext(GameContext);

  function checkFirstTime() {
    const visited = cookiesManager.getCookie("visited");

    if (visited) {
      return;
    }

    cookiesManager.setCookie({
      name: "visited",
      value: "true",
      expiration: 365 * 24 * 60 * 60 * 1000,
    });

    setShowInstructions(true);
  }

  useEffect(() => {
    checkFirstTime();
  }, []);

  useEffect(() => {
    if (gameEnded) {
      setShowModal(true);
    }
  }, [gameEnded]);

  return (
    <div className={`App h-screen ${bgColor}`}>
      <Navbar
        showInstructions={() => {
          setShowInstructions(true);
        }}
        showEndGameModal={() => {
          setShowModal(true);
        }}
      />

      <GameGrid />
      <KeyBoard />
      <EndGameModal
        show={showModal}
        closeModal={() => {
          setShowModal(false);
        }}
      />

      <Instructions
        show={showInstructions}
        closeModal={() => {
          setShowInstructions(false);
        }}
      />
    </div>
  );
}

export default App;
