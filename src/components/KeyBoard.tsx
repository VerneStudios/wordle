import React, { useContext, useEffect } from "react";
import { GameContext } from "../contexts/GameProvider";
import { LightModeContext } from "../contexts/LightModeProvider";
import KeyBoardLetter from "./KeyBoardLetter";
import { BackspaceIcon, CheckCircleIcon } from "@heroicons/react/outline";

const letterRows = [
  "Q,W,E,R,T,Y,U,I,O,P",
  "A,S,D,F,G,H,J,K,L,Ñ",
  "ENTER,Z,X,C,V,B,N,M,BACKSPACE",
];

const KeyBoard = () => {
  const {
    game,
    addCharacter,
    deleteCharacter,
    submitLine,
    currentLine,
    answer,
    gameEnded,
  } = useContext(GameContext);

  const { bgNavbarColor } = useContext(LightModeContext);

  useEffect(() => {
    if (gameEnded) {
      return;
    }
    function handleKeyDown(event: any) {
      (document.activeElement as HTMLElement).blur();

      const key = event.key.toUpperCase();

      let keyIsValid = false;

      letterRows.forEach((row) => {
        if (row.includes(key)) {
          keyIsValid = true;
        }
      });

      if (!keyIsValid) {
        return;
      }

      if (key === "ENTER") {
        submitLine();
        return;
      }

      if (key === "BACKSPACE") {
        deleteCharacter();
        return;
      }

      addCharacter(key);
    }

    //set up keyboard listeners
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    game,
    currentLine,
    answer,
    addCharacter,
    submitLine,
    deleteCharacter,
    gameEnded,
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
      <div className={`max-w-xl mx-auto mt-12 ${bgNavbarColor} rounded-lg`}>
        <div className="grid grid-cols-10 gap-2 p-2">
          {letterRows[0].split(",").map((letter, index) => {
            return (
              <KeyBoardLetter
                key={index}
                letter={letter}
                onClick={() => {
                  if (gameEnded) {
                    return;
                  }
                  addCharacter(letter);
                }}
              />
            );
          })}
        </div>

        <div className="grid grid-cols-10 gap-2 p-2 mx-auto">
          {letterRows[1].split(",").map((letter, index) => {
            return (
              <KeyBoardLetter
                key={index}
                letter={letter}
                onClick={() => {
                  if (gameEnded) {
                    return;
                  }
                  addCharacter(letter);
                }}
              />
            );
          })}
        </div>

        <div className="grid grid-cols-9 gap-2 p-2">
          {letterRows[2].split(",").map((letter, index) => {
            if (letter === "BACKSPACE") {
              return (
                <KeyBoardLetter
                  key={index}
                  icon={<BackspaceIcon className="w-5 mx-auto" />}
                  onClick={() => {
                    if (gameEnded) {
                      return;
                    }
                    deleteCharacter();
                  }}
                />
              );
            }

            if (letter === "ENTER") {
              return (
                <KeyBoardLetter
                  key={index}
                  icon={<CheckCircleIcon className="w-5 mx-auto" />}
                  onClick={() => {
                    if (gameEnded) {
                      return;
                    }
                    submitLine();
                  }}
                />
              );
            }

            return (
              <KeyBoardLetter
                key={index}
                letter={letter}
                onClick={() => {
                  if (gameEnded) {
                    return;
                  }
                  addCharacter(letter);
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default KeyBoard;
