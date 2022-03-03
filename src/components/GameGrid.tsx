import React, { useState, useContext, useEffect } from "react";
import Word from "./Word";
import { GameContext } from "../contexts/GameProvider";

const GameGrid = () => {
  const { game, answers } = useContext(GameContext);

  const [words, setWords] = useState<string[]>([]);

  useEffect(() => {
    if (game && game.length > 0) {
      const wordsWithPadding = [...game];

      while (wordsWithPadding.length < 5) {
        wordsWithPadding.push("");
      }

      setWords(wordsWithPadding);
    }
  }, [game]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
      <div className={`max-w-xs mx-auto mt-12`}>
        {words.map((word, index) => {
          const empty = index >= game.length;

          const result = answers[index] || [-1, -1, -1, -1, -1];
          const submited = answers[index] !== undefined;

          return (
            <Word
              key={index}
              word={word}
              result={result}
              submited={submited}
              className={"mb-2"}
              empty={empty}
            />
          );
        })}
      </div>
    </div>
  );
};

export default GameGrid;
