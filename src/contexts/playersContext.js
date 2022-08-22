import React, { useState, useContext } from "react";
import { playerReviver } from "../utilities/jsonUtils";

const PlayersContext = React.createContext();
const PlayersUpdateContext = React.createContext();

const PlayersProvider = function ({ children }) {
  const [players, setPlayers] = useState(
    JSON.parse(localStorage.getItem("initialPlayers"), playerReviver)
  );

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

export const useSetPlayers = function () {
  return useContext(PlayersUpdateContext);
};
