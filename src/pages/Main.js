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
import { CARDS, NUM_OF_CARDS } from "../assets/cards";
import GameEvents from "./GameEvents";
import GameTable from "./GameTable";

function Main() {
  const [smallWindow, setSmallWindow] = useState(
    window.matchMedia("(max-width: 800px)").matches
  );
  const [filtered, setFiltered] = useState(false);
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

      // check for situations where player had a card but now it's known
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

      // check for situations where there is solution known and n-1 players don't have a card
      Object.entries(CARDS).forEach(([_, cards]) => {
        const notSolutions = cards.filter(
          (card) => !players.every((player) => player.notCards.has(card))
        );

        if (notSolutions.length < cards.length) {
          notSolutions.forEach((notSolution) => {
            const playersWhoPossiblyHaveCard = players.filter(
              (player) => !player.notCards.has(notSolution)
            );

            if (playersWhoPossiblyHaveCard.length === 1) {
              const playersCardsBeforeCount =
                playersWhoPossiblyHaveCard[0].cards.size;
              playersWhoPossiblyHaveCard[0].cards.add(notSolution);

              if (
                playersWhoPossiblyHaveCard[0].cards.size >
                playersCardsBeforeCount
              ) {
                thereWereChanges = true;
              }
            }
          });
        }
      });

      // check the number of cards
      players.forEach((player) => {
        const numOfCards = player.numOfCards;

        if (numOfCards !== null) {
          // if number of cards of player = maximum
          if (player.cards.size === numOfCards) {
            Object.values(CARDS).forEach((group) =>
              group.forEach((card) => {
                const playerNotCardsBeforeCount = player.notCards.size;

                if (!player.cards.has(card)) {
                  player.notCards.add(card);

                  if (player.notCards.size > playerNotCardsBeforeCount) {
                    thereWereChanges = true;
                  }
                }
              })
            );
          }
          // check if number of not known cards is equal to number of remaining cards to have
          const numOfCardsAll = NUM_OF_CARDS + 3;
          const emptyCardsCount =
            numOfCardsAll - player.notCards.size - player.cards.size;

          const playersCardsBeforeCount = player.cards.size;

          if (emptyCardsCount === numOfCards - player.cards.size) {
            Object.values(CARDS).forEach((group) =>
              group.forEach((card) => {
                if (!player.cards.has(card) && !player.notCards.has(card)) {
                  player.cards.add(card);
                }
              })
            );

            if (player.cards.size > playersCardsBeforeCount) {
              thereWereChanges = true;
            }
          }
        }
      });

      // check if number of cards is now known
      if (players.length === 4 || players.length === 5) {
        players.forEach((player, idx) => {
          if (player.numOfCards === null) {
            // 4 players - 4, 4, 5, 5
            // 5 players - 3, 3, 4, 4, 4

            const otherPlayersNumOfCards = players
              .filter((_, pidx) => pidx !== idx)
              .map((p) => p.numOfCards);

            if (players.length === 4) {
              if (players.cards.size === 5) {
                player.numOfCards = 5;
                thereWereChanges = true;
              }

              if (
                otherPlayersNumOfCards.filter((num) => num === 4).length === 2
              ) {
                player.numOfCards = 5;
                thereWereChanges = true;
              } else if (
                otherPlayersNumOfCards.filter((num) => num === 5).length === 2
              ) {
                player.numOfCards = 4;
                thereWereChanges = true;
              }
            } else {
              if (player.cards.size === 4) {
                player.numOfCards = 4;
                thereWereChanges = true;
              }

              if (
                otherPlayersNumOfCards.filter((num) => num === 3).length === 2
              ) {
                player.numOfCards = 4;
                thereWereChanges = true;
              } else if (
                otherPlayersNumOfCards.filter((num) => num === 4).length === 3
              ) {
                player.numOfCards = 3;
                thereWereChanges = true;
              }
            }
          }
        });
      }
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

  useEffect(mainLogic, [initialPlayers, setPlayers, moves]);

  return smallWindow ? (
    <Tabs className="tabs">
      <TabList>
        <Tab>Wydarzenia</Tab>
        <Tab>Tabela</Tab>
      </TabList>
      <TabPanel>
        <GameEvents
          filtered={filtered}
          setFiltered={setFiltered}
          setInitialPlayers={setInitialPlayers}
        />
      </TabPanel>
      <TabPanel>
        <GameTable />
      </TabPanel>
    </Tabs>
  ) : (
    <div className="container-split">
      <GameEvents
        filtered={filtered}
        setFiltered={setFiltered}
        setInitialPlayers={setInitialPlayers}
      />
      <GameTable />
    </div>
  );
}

export default Main;
