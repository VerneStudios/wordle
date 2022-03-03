import { useRef, useContext } from "react";
import { GameContext } from "../contexts/GameProvider";
import Modal from "./Modal";
import pad from "../js/pad";

const EndGameModal = ({
  show,
  closeModal,
}: {
  show: boolean;
  closeModal: () => void;
}) => {
  const playButton = useRef<HTMLButtonElement>(null);

  const { secondsToNextGame, secretWord, gameEnded, lastGames, lastWonGames } =
    useContext(GameContext);

  return (
    <Modal show={show} closeModal={closeModal}>
      <div className="text-xs">
        <h1 className="text-center font-bold text-xl mb-8">Estadísticas</h1>

        <div className="grid grid-cols-2 gap-2 text-center mb-12">
          <div className="">
            <h1 className="text-center font-bold text-xl">{lastGames}</h1>
            <p className="">Jugadas.</p>
          </div>

          <div className="">
            <h1 className="text-center font-bold text-xl">{lastWonGames}</h1>
            <p className="">Victorias.</p>
          </div>
        </div>

        {gameEnded && secretWord && (
          <p className="my-5 text-center text-xl">
            La palabra era <span className="font-bold">{secretWord}</span>
          </p>
        )}
        {secondsToNextGame > 0 && (
          <>
            <h1 className="text-center font-bold text-xl mb-2">
              Siguiente palabra
            </h1>

            <h1 className="text-center font-bold text-xl mb-8">
              {pad(Math.floor(secondsToNextGame / 60).toString(), 2, "0")}:
              {pad(
                (
                  secondsToNextGame -
                  Math.floor(secondsToNextGame / 60) * 60
                ).toString(),
                2,
                "0"
              )}
            </h1>
          </>
        )}

        <button
          type="button"
          ref={playButton}
          onClick={closeModal}
          className="inline-flex items-center w-full px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          <span className="text-center w-full">Aceptar</span>
        </button>
      </div>
    </Modal>
  );
};

export default EndGameModal;
