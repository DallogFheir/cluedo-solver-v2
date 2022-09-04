import { useState, useEffect } from "react";
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
  const setPlayers = useSetPlayers();

  const NUM_OF_CARDS = 18;
  const [cardsPerPlayer, setCardsPerPlayer] = useState(
    Math.floor(NUM_OF_CARDS / initialPlayers.length)
  );

  const [playerCards, setPlayerCards] = useState(
    Array(cardsPerPlayer).fill(CARDS.suspects[0])
  );
  const [playerCardsErrors, setPlayersCardsErrors] = useState(
    Array(cardsPerPlayer).fill(false)
  );
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    setPlayerCards(Array(cardsPerPlayer).fill(CARDS.suspects[0]));
    setPlayersCardsErrors(Array(cardsPerPlayer).fill(false));
  }, [cardsPerPlayer]);

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
      newState[0].numOfCards = cardsPerPlayer;
      for (let i = 1; i < newState.length; i++) {
        newState[i].notCards = new Set(playerCards);

        if (initialPlayers.length === 3) {
          newState[i].numOfCards = 6;
        } else if (initialPlayers.length === 6) {
          newState[i].numOfCards = 3;
        } else {
          newState[i].numOfCards = null;
        }
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
      <Form>
        {[4, 5].includes(initialPlayers.length) && (
          <>
            <Form.Label className="fs-4">Wybierz, ile masz kart:</Form.Label>
            <Form.Group className="d-flex justify-content-evenly mb-5">
              <Form.Check
                id="first-radio"
                className="fs-5"
                name="num-of-cards"
                type="radio"
                label={initialPlayers.length === 4 ? "4" : "3"}
                value={initialPlayers.length === 4 ? "4" : "3"}
                defaultChecked
                onChange={(e) => setCardsPerPlayer(parseInt(e.target.value))}
              />
              <Form.Check
                id="second-radio"
                className="fs-5"
                name="num-of-cards"
                type="radio"
                label={initialPlayers.length === 4 ? "5" : "4"}
                value={initialPlayers.length === 4 ? "5" : "4"}
                onChange={(e) => setCardsPerPlayer(parseInt(e.target.value))}
              />
            </Form.Group>
          </>
        )}
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
      </Form>
      <div>
        <NextArrow onClick={validateCards} />
      </div>
    </>
  );
}

export default Cards;
