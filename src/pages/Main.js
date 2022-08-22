import { useState, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useMoves } from "../contexts/movesContext";
import { useSetPlayers } from "../contexts/playersContext";
import GameEvents from "./GameEvents";
import GameTable from "./GameTable";

function Main({ initialPlayers }) {
  const [smallWindow, setSmallWindow] = useState(
    window.matchMedia("(max-width: 500px)").matches
  );
  const moves = useMoves();
  const setPlayers = useSetPlayers();

  const mainLogic = () => {
    const players = [...initialPlayers];
    const questionRegister = [];

    for (const move of moves) {
      for (const response of move.responses) {
        const { idx, has } = response;

        // if player didn't have cards
        if (!has) {
          for (const question of Object.values(move.question)) {
            players[idx].notCards.add(question);
          }
        } else {
          questionRegister.push({
            player: idx,
            has: Object.values(move.question),
          });
        }
      }
    }

    for (const question of questionRegister) {
      const status = question.has.map((card) => card);
    }

    setPlayers(players);
  };

  useEffect(() => {
    const onResize = () => {
      setSmallWindow(window.matchMedia("(max-width: 500px)").matches);
    };

    window.addEventListener("resize", onResize);

    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(mainLogic, [initialPlayers, moves]);

  return smallWindow ? (
    <Tabs className="tabs">
      <TabList>
        <Tab>Wydarzenia</Tab>
        <Tab>Tabela</Tab>
      </TabList>
      <TabPanel>
        <GameEvents />
      </TabPanel>
      <TabPanel>
        <GameTable />
      </TabPanel>
    </Tabs>
  ) : (
    <div className="container-split">
      <GameEvents />
      <GameTable />
    </div>
  );
}

export default Main;
