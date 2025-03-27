import React, { useState } from 'react';
import { useCounterContext } from '../../context/useCounterContext';
import StoredBudgets from './StoredBudgets';
import { Item } from '../../context/CounterContext';

export interface BudgetCardProps {
  total: number;
  checkedStates: boolean[];
  content: Item[];
  name: string;
  phone: string;
  email: string;
  date: number;
  numPagines: number;
  numIdiomes: number;
}

const Budget: React.FC = () => {
  const { checkedStates, total, content, setCheckedStates, setNumIdiomes, setNumPagines, numIdiomes, numPagines, setIsSwitchOn } = useCounterContext();
  const [budgetCards, setBudgetCards] = useState<BudgetCardProps[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  // console.log(budgetCards);

  const handleAddBudgetCard = () => {
    const nameElement = document.querySelector<HTMLInputElement>("#name");
    const phoneElement = document.querySelector<HTMLInputElement>("#phone");
    const emailElement = document.querySelector<HTMLInputElement>("#email");

    if (!nameElement || !phoneElement || !emailElement) { // puto typescript obliga checkear que existan los elementos
      console.error("One or more input elements not found");
      return;
    }

    const name = nameElement.value.trim();
    const phone = phoneElement.value.trim();
    const email = emailElement.value.trim();

    const namePattern = /^[A-Za-z\s]+$/;
    const phonePattern = /^\+?\d{9,15}$/;
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

    if (!name || !phone || !email) {
      setErrorMessage("Has d'omplir tot el formulari");
      return;
    }
    if (!namePattern.test(name)) {
      setErrorMessage("Error al nom");
      return;
    }
    if (!phonePattern.test(phone)) {
      setErrorMessage("Número de telèfon incorrecte");
      return;
    }
    if (!emailPattern.test(email)) {
      setErrorMessage("Email incorrecte");
      return;
    }
    if (checkedStates.every(state => state === false)) {
      setErrorMessage("Ep! Selecciona un servei!")
      return;
    }

    // Reset formulari
    setErrorMessage("");
    nameElement.value= "";
    phoneElement.value = "";
    emailElement.value = "";
    setNumIdiomes(1);
    setNumPagines(1);
    const checkboxes = document.querySelectorAll<HTMLInputElement>('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
      checkbox.checked = false;
    });
    setIsSwitchOn(false);
    
    
    const newCard: BudgetCardProps = {
      total,
      checkedStates,
      content,
      name,
      phone,
      email,
      date: Date.now(),
      numPagines,
      numIdiomes
    };
    
    setBudgetCards([...budgetCards, newCard]);

    setCheckedStates([false, false, false]);
  };

  return (
    <>
      <div className="cardElement items-center">
        <div>
          <h2 className="mb-7 text-center md:text-start">Demanar pressupost:</h2>
          <div className="cardContent flex flex-col md:flex-row justify-between gap-y-4 gap-x-1 lg:gap-x-3">
            <input
              className="min-w-0 flex-1 active:outline focus:shadow-lg shadow-sm border-2 border-gray-500 rounded-md py-2 pl-2"
              type="text"
              name="nom"
              placeholder="Nom"
              id="name"
            />
            <input
              className="min-w-0 flex-1 active:outline focus:shadow-lg shadow-sm border-2 border-gray-500 rounded-md py-2 pl-2"
              type="tel"
              name="telefon"
              placeholder="Telefon"
              id="phone"
            />
            <input
              className="min-w-0 flex-1 active:outline focus:shadow-lg shadow-sm border-2 border-gray-500 rounded-md py-2 pl-2"
              type="email"
              name="e-mail"
              placeholder="E-mail"
              required
              title="Please enter a valid email address."
              id="email"
            />
            <button
              onClick={handleAddBudgetCard}
              className="whitespace-nowrap w-auto flex-1 textbold bg-orange-400 rounded shadow-md py-2 px-4 font-medium text-orange-950 hover:shadow-lg hover:outline outline-orange-300 active:ring ring-orange-700 active:outline-orange-400 active:shadow-xl"
            >
              Sol·licitar pressupost <em className="inline md:hidden lg:inline font-3xl font-extrabold">&rarr;</em>
            </button>
          </div>
          {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
        </div>
      </div>
      <StoredBudgets budgetCards={budgetCards} setBudgetCards={setBudgetCards} /> {/* Cards of variable num */}
    </>
  );
};

export default Budget;