import React, { useContext } from "react";
import {
  QuestionMarkCircleIcon,
  PresentationChartBarIcon,
} from "@heroicons/react/solid";

import { LightModeContext } from "../contexts/LightModeProvider";

const Navbar = ({
  showInstructions,
  showEndGameModal,
}: {
  showInstructions: () => void;
  showEndGameModal: () => void;
}) => {
  const { lightMode, toggleLightMode, textColor, bgNavbarColor } =
    useContext(LightModeContext);

  return (
    <div className={`flex ${bgNavbarColor} ${textColor} p-3`}>
      <div className="flex flex-1 items-center font-bold text-xl text-center">
        <span className="w-full text-left">
          <button
            className=""
            onClick={() => {
              showInstructions();
            }}
          >
            <QuestionMarkCircleIcon className="w-10 h-10" />
          </button>
        </span>
      </div>

      <div className="flex flex-1 items-center font-bold text-xl text-center">
        <span
          className="w-full text-center"
          style={{
            fontFamily: "Roboto; !important",
            fontStyle: "normal",
            fontWeight: "600",
            fontSize: "30px",
            letterSpacing: "0.075em",
          }}
        >
          WORDLE
        </span>
      </div>
      <div className="flex flex-1 items-center font-bold text-xl text-right">
        <span className="inline-block w-full text-right">
          <button className="mr-3" onClick={showEndGameModal}>
            <PresentationChartBarIcon className="w-8" />
          </button>

          <button className="h-full" onClick={toggleLightMode}>
            <img
              src={lightMode ? `/images/darkMode.svg` : `/images/lightMode.svg`}
              className="h-8"
              alt="darkMode"
            />
          </button>
        </span>
      </div>
    </div>
  );
};

export default Navbar;
