import React, { createContext, useEffect, useState } from "react";
import dicionaryData from "../assets/words.json";
import CookiesManager from "../js/CookiesManager";

const GameContext = createContext<any>(true);
const nextWordTime = 300000;
const cookiesManager = new CookiesManager();

const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const [game, setGame] = useState([""]);
  const [currentLine, setCurrentLine] = useState(0);
  const [secretWord, setSecretWord] = useState("");
  const [answers, setAnswers] = useState<number[][]>([]);
  const [keyLetters, setKeyLetters] = useState<any>({});
  const [gameEnded, setGameEnded] = useState<boolean>(false);
  const [lastWordSnapshot, setLastWordSnapshot] = useState(0);
  const [secondsToNextGame, setSecondsToNextGame] = useState(0);
  const [lastGames, setLastGames] = useState(0);
  const [lastWonGames, setLastWonGames] = useState(0);

  function addCharacter(letter: string) {
    const newGame = [...game];

    const currentText = newGame[currentLine];

    if (currentText.length > 4) {
      return;
    }
    newGame[currentLine] = currentText + letter;

    setGame(newGame);
  }

  function deleteCharacter() {
    const currentText = game[currentLine];

    const newText = currentText.slice(0, -1);

    const newGame = [...game];

    newGame[currentLine] = newText;

    setGame(newGame);
  }

  function submitLine() {
    if (game[currentLine].length !== 5) {
      return;
    }

    if (currentLine > 4) {
      return;
    }
    addLine();
  }

  function addLine() {
    const newGame = [...game];

    evaluateLine(currentLine);
    setGame(newGame);

    if (currentLine < 4) {
      newGame.push("");
      setCurrentLine(newGame.length - 1);
      return;
    }
  }

  function generateWord() {
    resetGame();
    const newWord =
      dicionaryData[Math.floor(Math.random() * dicionaryData.length)];

    const timeStamp = new Date().getTime() + nextWordTime;

    setLastWordSnapshot(timeStamp);

    setSecretWord(newWord.toUpperCase());
  }

  function win() {
    cookiesManager.setCookie({
      name: "lastWonGames",
      value: (lastWonGames + 1).toString(),
      expiration: 365 * 24 * 60 * 60 * 1000,
    });
    setLastWonGames(lastWonGames + 1);
  }

  function endGame() {
    cookiesManager.setCookie({
      name: "lastGames",
      value: (lastGames + 1).toString(),
      expiration: 365 * 24 * 60 * 60 * 1000,
    });

    setLastGames(lastGames + 1);
    setGameEnded(true);
  }

  function getLastGamesFromCookies() {
    const lastGamesCookie = cookiesManager.getCookie("lastGames");
    const lastWonGamesCookie = cookiesManager.getCookie("lastWonGames");

    if (lastGamesCookie) {
      setLastGames(parseInt(lastGamesCookie.value));
    }

    if (lastWonGamesCookie) {
      setLastWonGames(parseInt(lastWonGamesCookie.value));
    }
  }

  function resetGame() {
    setGame([""]);
    setCurrentLine(0);
    setAnswers([]);
    setKeyLetters({});
    setGameEnded(false);
  }

  function evaluateLine(line: number) {
    const lineAnswer: number[] = [];

    const lineWord: string = game[line];

    const newKeyLetters = { ...keyLetters };

    const normalizedSecretWord = secretWord
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    lineWord.split("").forEach((letter, index) => {
      if (letter === normalizedSecretWord[index]) {
        lineAnswer.push(2);
        newKeyLetters[letter] = 2;
      } else if (normalizedSecretWord.includes(letter)) {
        lineAnswer.push(1);
        if (newKeyLetters[letter] !== 2) {
          newKeyLetters[letter] = 1;
        }
      } else {
        lineAnswer.push(0);
      }
    });

    setKeyLetters(newKeyLetters);

    const newAnswers: number[][] = [...answers];

    newAnswers[line] = lineAnswer;

    setAnswers(newAnswers);
  }

  function checkIfWin() {
    const answer = answers[currentLine];

    if (!answer) {
      return;
    }

    if (answer.includes(1) || answer.includes(0)) {
      return;
    }

    win();
    endGame();
    return;
  }

  useEffect(() => {
    generateWord();
    getLastGamesFromCookies();
  }, []);

  let gameInterval: any = null;

  useEffect(() => {
    if (lastWordSnapshot) {
      gameInterval = setInterval(() => {
        setSecondsToNextGame(
          Math.floor((lastWordSnapshot - new Date().getTime()) / 1000)
        );

        if (lastWordSnapshot < new Date().getTime()) {
          generateWord();
        }
      }, 1000);
    }

    return () => {
      if (gameInterval) {
        clearInterval(gameInterval);
      }
    };
  }, [lastWordSnapshot]);

  useEffect(() => {
    checkIfWin();
    if (answers.length === 5) {
      endGame();
    }
  }, [answers]);

  return (
    <GameContext.Provider
      value={{
        game,
        setGame,
        addCharacter,
        deleteCharacter,
        submitLine,
        currentLine,
        answers,
        keyLetters,
        secretWord,
        gameEnded,
        secondsToNextGame,
        lastGames,
        lastWonGames,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export { GameProvider, GameContext };
