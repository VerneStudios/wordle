import { useContext } from "react";
import { LightModeContext } from "../contexts/LightModeProvider";
import { GameContext } from "../contexts/GameProvider";

const KeyBoardLetter = (props: any) => {
  const { letter, icon, onClick } = props;

  const { textColor, bgKeyColor } = useContext(LightModeContext);
  const { keyLetters } = useContext(GameContext);

  let bgColor = bgKeyColor;
  let txtColor = textColor;

  if (keyLetters && keyLetters.hasOwnProperty(letter)) {
    if (keyLetters[letter] === 2) {
      bgColor = "bg-green-500";
      txtColor = "text-white";
    }

    if (keyLetters[letter] === 1) {
      bgColor = "bg-yellow-500";
      txtColor = "text-white";
    }
  }

  return (
    <button
      onClick={onClick}
      className={`py-3 flex items-center ${bgColor} ${txtColor} text-center rounded-md font-bold text-sm`}
    >
      {letter && <span className="w-full"> {letter}</span>}
      {icon && <span className="w-full"> {icon}</span>}
    </button>
  );
};

export default KeyBoardLetter;
