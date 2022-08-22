import React, { useState, useEffect, useContext } from "react";

const MovesContext = React.createContext();
const SetMovesContext = React.createContext();

const MovesProvider = function ({ children }) {
  const [moves, setMoves] = useState(
    JSON.parse(localStorage.getItem("moves")) ?? []
  );

  useEffect(() => {
    localStorage.setItem("moves", JSON.stringify(moves));
  }, [moves]);

  return (
    <MovesContext.Provider value={moves}>
      <SetMovesContext.Provider value={setMoves}>
        {children}
      </SetMovesContext.Provider>
    </MovesContext.Provider>
  );
};

export default MovesProvider;

export const useMoves = function () {
  return useContext(MovesContext);
};

export const useSetMoves = function () {
  return useContext(SetMovesContext);
};

export const useUpdateMoves = function () {
  const setMoves = useContext(SetMovesContext);

  return (move) => setMoves((prevState) => [...prevState, move]);
};

export const useDeleteLastMove = function () {
  const setMoves = useContext(SetMovesContext);

  return () => setMoves((prevState) => [...prevState].slice(0, -1));
};
