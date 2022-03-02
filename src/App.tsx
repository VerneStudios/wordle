import React, { useEffect, useState } from "react";
import Modal from "./components/Modal";
import CookiesManager from "./js/CookiesManager";
import { CookieType } from "./types";

const cookiesManager = new CookiesManager();

function App() {
  const [showInstructions, setShowInstructions] = useState(false);

  function checkFirstTime() {
    const visited = cookiesManager.getCookie("visited");

    if (visited) {
      return;
    }

    cookiesManager.setCookie({
      name: "visited",
      value: "true",
      expiration: 30000,
    });

    setShowInstructions(true);
  }

  useEffect(() => {
    checkFirstTime();
  }, []);

  return (
    <div className="App">
      <button
        onClick={() => {
          setShowInstructions(true);
        }}
      >
        Open
      </button>
      <Modal
        show={showInstructions}
        closeModal={() => {
          setShowInstructions(false);
        }}
      ></Modal>
    </div>
  );
}

export default App;
