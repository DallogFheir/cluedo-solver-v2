import { useState, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { playerReviver, playerReplacer } from "../utilities/jsonUtils";
import {
  useInitialPlayers,
  useSetInitialPlayers,
} from "../contexts/initialPlayersContext";
import { useMoves } from "../contexts/movesContext";
import { useSetPlayers } from "../contexts/playersContext";
import GameEvents from "./GameEvents";
import GameTable from "./GameTable";

function Main() {
  const [smallWindow, setSmallWindow] = useState(
    window.matchMedia("(max-width: 500px)").matches
  );
  const moves = useMoves();
  const setPlayers = useSetPlayers();
  const initialPlayers = useInitialPlayers();
  const setInitialPlayers = useSetInitialPlayers();

  const mainLogic = () => {
    const players = JSON.parse(
      JSON.stringify(initialPlayers, playerReplacer),
      playerReviver
    );
    let questionRegister = [];

    for (const move of moves) {
      for (const response of move.responses) {
        const { idx, has } = response;

        // if player didn't have cards
        if (!has) {
          for (const question of Object.values(move.question)) {
            players[idx].notCards.add(question);
          }
        } else if (typeof has === "string") {
          // if player had a card and it's known
          players[idx].cards.add(has);
          players
            .filter((_, playerIdx) => playerIdx !== idx)
            .forEach((player) => player.notCards.add(has));
        } else {
          // if player had a card but it's not known
          questionRegister.push({
            player: idx,
            has: Object.values(move.question),
          });
        }
      }
    }

    let thereWereChanges = true;
    while (thereWereChanges) {
      thereWereChanges = false;

      questionRegister = questionRegister.filter((question) => {
        const status = question.has.filter(
          (card) => !players[question.player].notCards.has(card)
        );

        if (status.length === 1) {
          players[question.player].cards.add(status[0]);
          players
            .filter((_, playerIdx) => playerIdx !== question.player)
            .forEach((player) => player.notCards.add(status[0]));
          thereWereChanges = true;
        }

        return !thereWereChanges;
      });
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
        <GameEvents setInitialPlayers={setInitialPlayers} />
      </TabPanel>
      <TabPanel>
        <GameTable />
      </TabPanel>
    </Tabs>
  ) : (
    <div className="container-split">
      <GameEvents setInitialPlayers={setInitialPlayers} />
      <GameTable />
    </div>
  );
}

export default Main;
