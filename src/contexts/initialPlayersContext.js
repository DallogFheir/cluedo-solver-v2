import React, { useState, useEffect, useContext } from "react";
import { playerReviver, playerReplacer } from "../utilities/jsonUtils";

const InitialPlayersContext = React.createContext();
const SetInitialPlayersContext = React.createContext();

const InitialPlayersProvider = function ({ children }) {
  const [initialPlayers, setInitialPlayers] = useState(
    JSON.parse(localStorage.getItem("initialPlayers"), playerReviver)
  );

  useEffect(() => {
    localStorage.setItem(
      "initialPlayers",
      JSON.stringify(initialPlayers, playerReplacer)
    );
  }, [initialPlayers]);

  return (
    <InitialPlayersContext.Provider value={initialPlayers}>
      <SetInitialPlayersContext.Provider value={setInitialPlayers}>
        {children}
      </SetInitialPlayersContext.Provider>
    </InitialPlayersContext.Provider>
  );
};

export default InitialPlayersProvider;

export const useInitialPlayers = function () {
  return useContext(InitialPlayersContext);
};

export const useSetInitialPlayers = function () {
  return useContext(SetInitialPlayersContext);
};
