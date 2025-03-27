/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   CounterContext.tsx                                 :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: marvin <marvin@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2024/11/03 23:00:09 by marvin            #+#    #+#             */
/*   Updated: 2024/11/03 23:38:54 by marvin           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { createContext, useState, ReactNode } from "react";

export interface Item {
  title: string;
  text: string;
  preu: number;
}

interface CounterContextProps {
  numPagines: number;
  incrementPagines: () => void;
  decrementPagines: () => void;
  numIdiomes: number;
  incrementIdiomes: () => void;
  decrementIdiomes: () => void;
  total: number;
  handleCheckboxChange: (index: number) => void;
  content: Item[];
  checkedStates: boolean[];
  setCheckedStates: React.Dispatch<React.SetStateAction<boolean[]>>;
  isSwitchOn: boolean;
  setIsSwitchOn: React.Dispatch<React.SetStateAction<boolean>>;
  setNumIdiomes: React.Dispatch<React.SetStateAction<number>>;
  setNumPagines: React.Dispatch<React.SetStateAction<number>>;
}
  const content = [
    { title: "Seo", text: "Programació d'una web responsive completa", preu: 300 },
    { title: "Ads", text: "Programació d'una web responsive completa", preu: 400 },
    { title: "Web", text: "Programació d'una web responsive completa", preu: 500 }
  ];

export const CounterContext = createContext<CounterContextProps | undefined>(undefined);

export const CounterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [numPagines, setNumPagines] = useState(1);
  const [numIdiomes, setNumIdiomes] = useState(1);
  const [checkedStates, setCheckedStates] = useState([false, false, false]);
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const subtotal = content.reduce((sum, item, index) => sum + (checkedStates[index] ? item.preu : 0), 0);
  const total = (subtotal + (checkedStates[2] ? (numPagines + numIdiomes) * 30 : 0)) * (isSwitchOn ? 0.8 : 1);

  const incrementPagines = () => setNumPagines((prev) => (prev < 9 ? prev + 1 : prev));
  const decrementPagines = () => setNumPagines((prev) => (prev > 1 ? prev - 1 : prev));
  const incrementIdiomes = () => setNumIdiomes((prev) => (prev < 9 ? prev + 1 : prev));
  const decrementIdiomes = () => setNumIdiomes((prev) => (prev > 1 ? prev - 1 : prev));




  const handleCheckboxChange = (index: number) => {
    const newCheckedStates = [...checkedStates];
    newCheckedStates[index] = !newCheckedStates[index];
    setCheckedStates(newCheckedStates);
  };
  return (
    <CounterContext.Provider
      value={{ setNumIdiomes, setNumPagines, setCheckedStates, numPagines, incrementPagines, decrementPagines, numIdiomes, incrementIdiomes, decrementIdiomes, total, handleCheckboxChange, content, checkedStates, setIsSwitchOn, isSwitchOn }}
    >
      {children}
    </CounterContext.Provider>
  );
};

