import React, { useContext } from "react";
import { LightModeContext } from "../contexts/LightModeProvider";

const Letter = ({
  letter,
  submited,
  inPlace,
  correct,
  empty,
}: {
  letter: string;
  correct: boolean;
  inPlace: boolean;
  submited: boolean;
  empty: boolean;
}) => {
  const { lightMode, bgColor, textColor, bgNavbarColor } =
    useContext(LightModeContext);

  if (empty) {
    return (
      <div
        className={`flex items-center ${bgNavbarColor} text-center rounded-md aspect-square font-bold text-xl`}
      ></div>
    );
  }

  if (!submited) {
    return (
      <div
        className={`flex items-center ${bgColor} ${textColor} border ${
          lightMode ? "border-black" : "border-white"
        } text-center rounded-md aspect-square font-bold text-xl`}
      >
        <span className="inline-block align-middle w-full">{letter}</span>
      </div>
    );
  }

  if (!correct) {
    return (
      <div
        className={`flex items-center bg-gray-400 border border-black text-center rounded-md aspect-square font-bold text-xl`}
      >
        <span className="inline-block align-middle w-full">{letter}</span>
      </div>
    );
  }

  if (inPlace) {
    return (
      <div
        className={`flex items-center bg-green-500 text-white text-center rounded-md aspect-square font-bold text-xl`}
      >
        <span className="inline-block align-middle w-full">{letter}</span>
      </div>
    );
  }

  return (
    <div
      className={`flex items-center bg-yellow-500 text-white text-center rounded-md aspect-square font-bold text-xl`}
    >
      <span className="inline-block align-middle w-full">{letter}</span>
    </div>
  );
};

export default Letter;
