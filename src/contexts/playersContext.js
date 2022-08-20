import React, { useState, useEffect, useContext } from "react";

const PlayersContext = React.createContext();
const PlayersUpdateContext = React.createContext();

const PlayersProvider = function ({ children }) {
  const [players, setPlayers] = useState(
    JSON.parse(localStorage.getItem("players"), (key, value) => {
      if (key === "cards" || key === "notCards") {
        return new Set(value);
      }

      return value;
    })
  );

  useEffect(() => {
    localStorage.setItem(
      "players",
      JSON.stringify(players, (key, value) => {
        if (value instanceof Set) {
          return [...value];
        }

        return value;
      })
    );
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

  return ({ idx, name, cards, notCards }) => {
    setPlayers((prevState) => {
      const newState = [...prevState];

      if (!cards) {
        cards = [];
      }
      if (!notCards) {
        notCards = [];
      }

      for (let i = 0; i < newState.length; i++) {
        if (i === idx) {
          newState[i].cards = new Set([...newState[i].cards, ...cards]);
          newState[i].notCards = new Set([
            ...newState[i].notCards,
            ...notCards,
          ]);
          break;
        }
      }

      return newState;
    });
  };
};
