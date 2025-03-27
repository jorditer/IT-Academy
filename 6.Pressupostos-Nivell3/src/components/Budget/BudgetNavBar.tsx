import React, { useState } from 'react';

interface BudgetNavBarProps {
  hidden: string;
  sortByDateAsc: () => void;
  sortByDateDesc: () => void;
  sortByName: () => void;
  sortByTotal: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const BudgetNavBar: React.FC<BudgetNavBarProps> = ({
  hidden,
  sortByDateAsc,
  sortByDateDesc,
  sortByName,
  sortByTotal,
  searchQuery,
  setSearchQuery,
}) => {
  const [selectedButton, setSelectedButton] = useState<string | null>(null);

  const handleButtonClick = (buttonName: string, sortFunction: () => void) => {
    setSelectedButton((prevButton) => {
      if (prevButton === buttonName) {
        sortByDateAsc();
        return null;
      } else {
        sortFunction();
        return buttonName;
      }
    });
  };

  return (
    <div className={`${hidden} gap-x-4 pe-3 flex-col md:flex-row gap-y-8 md:gap-y-0 flex md:justify-end items-center justify-evenly`}>
      <div className="w-full md:w-auto budget-search flex px-4 bg-orange-50 py-3 rounded-md border-2 border-orange-500 overflow-hidden max-w-md font-[sans-serif]">
        <input
          type="text"
          placeholder="Search"
          className="w-full md:w-auto outline-none bg-transparent text-gray-600 text-sm"
          value={searchQuery} // Controlled Component, sincroniza el valor con el state que está modificando, en teoría minimiza errores pero parece funcionar bien igual sin este
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192.904 192.904" width="16px" className="fill-gray-600">
          <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
        </svg>
      </div>
      <div className="flex space-x-16 md:space-x-4">
        <button
          className={`${selectedButton === 'Data' ? 'budget-nav-selected' : 'budget-nav'}`}
          onClick={() => handleButtonClick('Data', sortByDateDesc)}
        >
          Data
        </button>
        <button
          className={`${selectedButton === 'Import' ? 'budget-nav-selected' : 'budget-nav'}`}
          onClick={() => handleButtonClick('Import', sortByTotal)}
        >
          Import
        </button>
        <button
          className={`${selectedButton === 'Nom' ? 'budget-nav-selected' : 'budget-nav'}`}
          onClick={() => handleButtonClick('Nom', sortByName)}
        >
          Nom
        </button>
      </div>
    </div>
  );
};

export default BudgetNavBar;