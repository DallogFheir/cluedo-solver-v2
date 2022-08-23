import { useState } from "react";
import Form from "react-bootstrap/Form";
import { useSetScreen } from "../contexts/screenContext";
import {
  useInitialPlayers,
  useSetInitialPlayers,
} from "../contexts/initialPlayersContext";
import { useSetPlayers } from "../contexts/playersContext";
import makeClassString from "../utilities/makeClassString";
import { CARDS } from "../assets/cards";
import NextArrow from "../components/NextArrow";

function Cards() {
  const setScreen = useSetScreen();
  const initialPlayers = useInitialPlayers();
  const setInitialPlayers = useSetInitialPlayers();

  const NUM_OF_CARDS = 18;
  const playersWithoutAll = initialPlayers.filter(
    (player) => player.name !== "ALL"
  ).length;
  const cardsPerPlayer = Math.floor(NUM_OF_CARDS / playersWithoutAll);
  const cardsForAll = 18 - cardsPerPlayer * playersWithoutAll;

  const [playerCards, setPlayerCards] = useState(
    Array(cardsPerPlayer).fill(CARDS.suspects[0])
  );
  const [playerCardsErrors, setPlayersCardsErrors] = useState(
    Array(cardsPerPlayer).fill(false)
  );
  const [allCards, setAllCards] = useState(
    Array(cardsForAll).fill(CARDS.suspects[0])
  );
  const [allCardsErrors, setAllCardsErrors] = useState(
    Array(cardsForAll).fill(false)
  );
  const [toggle, setToggle] = useState(false);

  const setPlayers = useSetPlayers();

  const validateCards = () => {
    if (
      cardsPerPlayer === 6 &&
      new Set(playerCards).size === 6 &&
      (playerCards.filter((card) => !CARDS.suspects.includes(card)).length ===
        0 ||
        playerCards.filter((card) => !CARDS.tools.includes(card)).length === 0)
    ) {
      setPlayersCardsErrors(Array(cardsPerPlayer).fill(true));
      setToggle((prevState) => !prevState);
      return;
    }

    let errors = Array(cardsPerPlayer).fill(false);
    for (const card of new Set(playerCards)) {
      const repeatedIndexes = [];

      if (playerCards.filter((c) => c === card).length > 1) {
        playerCards.forEach((c, idx) => {
          if (c === card) {
            repeatedIndexes.push(idx);
          }
        });
      }

      errors = errors.map((value, idx) =>
        repeatedIndexes.includes(idx) ? true : value
      );
    }
    if (errors.some((el) => el)) {
      setPlayersCardsErrors(errors);
      setToggle((prevState) => !prevState);
      return;
    }

    const playerNotCards = [
      ...CARDS.tools.filter((tool) => !playerCards.includes(tool)),
      ...CARDS.suspects.filter((suspect) => !playerCards.includes(suspect)),
      ...CARDS.rooms.filter((room) => !playerCards.includes(room)),
    ];
    setInitialPlayers((prevState) => {
      const newState = [...prevState];

      newState[0].cards = new Set(playerCards);
      newState[0].notCards = new Set(playerNotCards);
      for (let i = 1; i < newState.length; i++) {
        newState[i].notCards = new Set(playerCards);
      }

      return newState;
    });
    setPlayers(initialPlayers);
    setScreen("main");
  };

  const groupTrans = {
    suspects: "podejrzani",
    tools: "narzędzia zbrodni",
    rooms: "pomieszczenia",
  };

  return (
    <>
      <Form.Group className="d-flex flex-column justify-content-center align-items-center">
        <Form.Label className="fs-4">Wybierz swoje karty:</Form.Label>
        {Array(cardsPerPlayer)
          .fill()
          .map((_, idx) => (
            <Form.Select
              key={`player-${idx}-${toggle}`}
              className={makeClassString(
                "mt-4",
                "input-card",
                playerCardsErrors[idx] && "input-error",
                playerCardsErrors[idx] && "input-error-shake"
              )}
              value={playerCards[idx]}
              onChange={(e) => {
                setPlayerCards((prevState) => {
                  const newState = [...prevState];
                  newState[idx] = e.target.value;
                  return newState;
                });
              }}
            >
              {Object.entries(CARDS).map(([group, cards]) => (
                <optgroup key={group} label={groupTrans[group]}>
                  {cards.map((card) => (
                    <option key={card} value={card}>
                      {card}
                    </option>
                  ))}
                </optgroup>
              ))}
            </Form.Select>
          ))}
      </Form.Group>
      {cardsForAll !== 0 && (
        <Form.Group className="d-flex flex-column justify-content-center align-items-center">
          <Form.Label className="fs-4 mt-5">
            Wybierz karty widoczne dla wszystkich:
          </Form.Label>
          {Array(cardsForAll)
            .fill()
            .map((_, idx) => (
              <Form.Select
                key={`all-${idx}-${toggle}`}
                className="mt-4 input-card"
                value={allCards[idx]}
                onChange={(e) =>
                  setAllCards((prevState) => {
                    const newState = [...prevState];
                    newState[idx] = e.target.value;
                    return newState;
                  })
                }
              >
                {Object.entries(CARDS).map(([group, cards]) => (
                  <optgroup key={group} label={groupTrans[group]}>
                    {cards.map((card) => (
                      <option key={card} value={card}>
                        {card}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </Form.Select>
            ))}
        </Form.Group>
      )}
      <NextArrow onClick={validateCards} />
    </>
  );
}

export default Cards;
