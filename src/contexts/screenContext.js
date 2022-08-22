import React, { useState, useContext } from "react";
import { useInitialPlayers } from "./initialPlayersContext";

const ScreenContext = React.createContext();
const SetScreenContext = React.createContext();

const ScreenProvider = function ({ children }) {
  const initialPlayers = useInitialPlayers();
  const [screen, setScreen] = useState(
    !initialPlayers || initialPlayers[0].cards.size === 0 ? "start" : "main"
  );

  return (
    <ScreenContext.Provider value={screen}>
      <SetScreenContext.Provider value={setScreen}>
        {children}
      </SetScreenContext.Provider>
    </ScreenContext.Provider>
  );
};

export default ScreenProvider;

export const useScreen = function () {
  return useContext(ScreenContext);
};

export const useSetScreen = function () {
  return useContext(SetScreenContext);
};
