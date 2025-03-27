import React, { useState } from 'react';
import BudgetCard from './BudgetCard';
import { BudgetCardProps } from './Budget';
import BudgetNavBar from './BudgetNavBar';

interface StoredBudgetProps {
  budgetCards: BudgetCardProps[];
  setBudgetCards: (cards: BudgetCardProps[]) => void;
}

const StoredBudgets: React.FC<StoredBudgetProps> = ({ budgetCards, setBudgetCards }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const sortByName = () => {
    const sorted = [...budgetCards].sort((a, b) => a.name.localeCompare(b.name));
    setBudgetCards(sorted);
  };

  const sortByTotal = () => {
    const sorted = [...budgetCards].sort((a, b) => a.total - b.total);
    setBudgetCards(sorted);
  };

  const sortByDateAsc = () => {
    const sorted = [...budgetCards].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    setBudgetCards(sorted);
  };

  const sortByDateDesc = () => {
    const sorted = [...budgetCards].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    setBudgetCards(sorted);
  };

  const hiddenClass = budgetCards.length === 0 ? 'hidden' : '';

  const handleSort = (sortFunction: () => void) => {
    sortFunction();
  };

  const filteredBudgetCards = budgetCards.filter(card =>
    card.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <h2 className={hiddenClass}>Pressupostos en curs:</h2>
      <BudgetNavBar
        hidden={hiddenClass}
        sortByName={() => handleSort(sortByName)}
        sortByTotal={() => handleSort(sortByTotal)}
        sortByDateAsc={() => handleSort(sortByDateAsc)}
        sortByDateDesc={() => handleSort(sortByDateDesc)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      {filteredBudgetCards.map((card) => (
        <div className="cardElement" key={card.date}>
          <BudgetCard
            total={card.total}
            checkedStates={card.checkedStates}
            content={card.content}
            name={card.name}
            phone={card.phone}
            email={card.email}
            date={card.date}
            numIdiomes={card.numIdiomes}
            numPagines={card.numPagines}
          />
        </div>
      ))}
    </>
  );
};

export default StoredBudgets;