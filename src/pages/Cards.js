import { useState } from "react";
import Form from "react-bootstrap/Form";
import { usePlayers, useUpdatePlayers } from "../contexts/playersContext";
import makeClassString from "../utilities/makeClassString";
import CARDS from "../assets/cards";
import NextArrow from "../components/NextArrow";

function Cards({ setScreen }) {
  const players = usePlayers();
  const updatePlayers = useUpdatePlayers();

  const NUM_OF_CARDS = 18;
  const playersWithoutAll = players.filter(
    (player) => player.name !== "ALL"
  ).length;
  const cardsPerPlayer = Math.floor(18 / playersWithoutAll);
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

  const validateCards = () => {
    if (
      cardsPerPlayer === 6 &&
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

    updatePlayers({ name: players[0].name, cards: playerCards });
    for (let i = 1; i < players.length; i++) {
      updatePlayers({ name: players[i].name, notCards: playerCards });
    }
    setScreen("main");
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
                <optgroup key={group} label={group}>
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
                  <optgroup key={group} label={group}>
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
