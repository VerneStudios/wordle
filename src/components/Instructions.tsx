/* This example requires Tailwind CSS v2.0+ */
import { useRef } from "react";
import Word from "./Word";
import Modal from "./Modal";
// import { CheckIcon } from "@heroicons/react/outline";

export default function Instructions({
  show,
  closeModal,
}: {
  show: boolean;
  closeModal: () => void;
}) {
  const playButton = useRef<HTMLButtonElement>(null);

  return (
    <Modal show={show} closeModal={closeModal}>
      <div className="text-xs">
        <h1 className="text-center font-bold text-xl mb-8">Cómo jugar</h1>

        <p className="mb-5">Adivina la palabra oculta en 5 intentos.</p>

        <p className="mb-5">
          Cada intento debe ser una palabra válida de 5 letras.
        </p>

        <p className="mb-5">
          Después de cada intento, el color de las letras cambia para mostrar
          qué tan cerca estás de acertar la palabra.
        </p>

        <h1 className="text-left font-bold text-bg mb-3">Ejemplos</h1>

        <Word word="GATOS" result={[2, -1, -1, -1, -1]} submited={true} />
        <p className="my-5">
          La letra <span className="font-bold">G</span> está en la posición
          correcta.
        </p>

        <Word word="VOCAL" result={[-1, -1, 1, -1, -1]} submited={true} />

        <p className="my-5">
          La letra <span className="font-bold">C</span> está en la palabra pero
          posición incorrecta.
        </p>

        <Word word="CANTO" result={[-1, -1, -1, -1, 0]} submited={true} />

        <p className="my-5">
          La letra <span className="font-bold">O</span> no está en la palabra.
        </p>

        <p className="mb-5">
          Puede haber letras repetidas. Las pistas son independientes de cada
          letra.
        </p>

        <p className="text-center mb-5">¡Una palabra nueva cada 5 minutos!</p>

        <button
          type="button"
          className="inline-flex items-center w-full px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          ref={playButton}
          onClick={closeModal}
        >
          <span className="text-center w-full"> ¡Jugar!</span>
        </button>
      </div>
    </Modal>
  );
}
