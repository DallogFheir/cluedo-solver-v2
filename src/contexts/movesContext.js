import React, { useState, useEffect, useContext } from "react";

const MovesContext = React.createContext();
const MovesUpdateContext = React.createContext();

const MovesProvider = function ({ children }) {
  const [moves, setMoves] = useState(JSON.parse(localStorage.getItem("moves")));

  useEffect(() => {
    localStorage.setItem("moves", JSON.stringify(moves));
  }, [moves]);

  return (
    <MovesContext.Provider value={moves}>
      <MovesUpdateContext.Provider value={setMoves}>
        {children}
      </MovesUpdateContext.Provider>
    </MovesContext.Provider>
  );
};

export default MovesProvider;

export const useMoves = function () {
  return useContext(MovesContext);
};

export const useUpdateMoves = function () {
  return useContext(MovesUpdateContext);
};