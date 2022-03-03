import React from "react";
import Letter from "./Letter";

const Word = (props: any) => {
  const { word, empty, result, submited, className = "" } = props;

  const letters: string[] = word.split("");

  while (letters.length < 5) {
    letters.push("");
  }

  return (
    <div className={`grid grid-cols-5 gap-2 ${className}`}>
      {letters.map((letter, index) => {
        const charResult = submited ? result[index] || 0 : -1;

        return (
          <Letter
            key={index}
            letter={letter}
            correct={charResult > 0}
            inPlace={charResult === 2}
            submited={charResult > -1}
            empty={empty}
          />
        );
      })}
    </div>
  );
};

export default Word;
