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

export const useSetPlayers = function () {
  return useContext(PlayersUpdateContext);
};

export const useUpdatePlayers = function () {
  const setPlayers = useContext(PlayersUpdateContext);

  return ({ name, cards, notCards }) => {
    setPlayers((prevState) => {
      const newState = [...prevState];

      if (!cards) {
        cards = [];
      }
      if (!notCards) {
        notCards = [];
      }

      for (const player of newState) {
        if (player.name === name) {
          player.cards = new Set([...player.cards, ...cards]);
          player.notCards = new Set([...player.notCards, ...notCards]);
          break;
        }
      }

      return newState;
    });
  };
};
