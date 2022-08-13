import React, { useState, useEffect, useContext } from "react";

const PlayersContext = React.createContext();
const PlayersUpdateContext = React.createContext();

const PlayersProvider = function ({ children }) {
  const [players, setPlayers] = useState(
    JSON.parse(localStorage.getItem("players"))
  );

  useEffect(() => {
    localStorage.setItem("players", JSON.stringify(players));
  }, [players]);

  return (
    <PlayersContext.Provider value={players}>
      <PlayersUpdateContext.Provider value={setPlayers}>
        {children}
      </PlayersUpdateContext.Provider>
    </PlayersContext.Provider>
  );
};

export default PlayersProvider;

export const usePlayers = function () {
  return useContext(PlayersContext);
};

export const useUpdatePlayers = function () {
  return useContext(PlayersUpdateContext);
};
