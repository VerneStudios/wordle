/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
// import { CheckIcon } from "@heroicons/react/outline";

export default function Modal({ show, closeModal }) {
  return (
    <Transition.Root show={show} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={closeModal}
      >
        <div className="flex items-end justify-center h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-white bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div
              className={`inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left border border-black transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full sm:p-6`}
            >
              <div className="">
                <h1 className="text-center font-bold text-bg mb-3">
                  Cómo jugar
                </h1>

                <p className="mb-5">Adivina la palabra oculta en 5 intentos.</p>

                <p className="mb-5">
                  Cada intento debe ser una palabra válida de 5 letras.
                </p>

                <p className="mb-5">
                  Después de cada intento, el color de las letras cambia para
                  mostrar qué tan cerca estás de acertar la palabra.
                </p>

                <h1 className="text-left font-bold text-bg mb-3">Ejemplos</h1>

                <div className="grid grid-cols-5 gap-4">
                  <div className="flex items-center bg-green-500 rounded-md aspect-square ">
                    G
                  </div>
                  <div>G</div>
                  <div>G</div>
                  <div>G</div>
                  <div>G</div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
