import React from "react";

interface IdiomModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
}

const IdiomModal: React.FC<IdiomModalProps> = ({ isOpen, onClose, title, content }) => {
  if (!isOpen) return null;

  return (
    <div
      id="default-modal"
      tabIndex={-1}
      aria-hidden="true"
      className="border h-auto fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
 <div className="relative p-4 w-full max-w-2xl h-auto">
        <div className="relative p-5 md:p-14 bg-orange-50 flex-grow overflow-y-auto rounded-lg shadow">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
            <h2 className="mx-auto w-full self-center text-center text-gray-900">{title}</h2>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
              onClick={onClose} // Add onClick handler to close the modal
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
          </div>
          <div className=" p-4 md:p-">
            <p className="text-center">{content}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdiomModal;
