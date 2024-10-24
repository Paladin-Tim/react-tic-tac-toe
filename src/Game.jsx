import { useState } from "react";
import { GameLayout } from "./GameLayout";

export const Game = () => {
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [isDraw, setIsDraw] = useState(false);
  const [fields, setFields] = useState(Array(9).fill(""));
  const isGameEnded = calculateWinner(fields);

  function calculateWinner(fields) {
    const WIN_PATTERNS = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < WIN_PATTERNS.length; i++) {
      const [a, b, c] = WIN_PATTERNS[i];
      if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
        return fields[a];
      }
    }
    return null;
  }

  return (
    <>
      <GameLayout
        fields={fields}
        setFields={setFields}
        currentPlayer={currentPlayer}
        setCurrentPlayer={setCurrentPlayer}
        isGameEnded={isGameEnded}
        isDraw={isDraw}
        setIsDraw={setIsDraw}
      />
    </>
  );
};
