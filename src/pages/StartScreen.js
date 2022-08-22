import { useState } from "react";
import Form from "react-bootstrap/Form";
import { PlusCircleFill, XCircleFill } from "react-bootstrap-icons";
import makeClassString from "../utilities/makeClassString";
import NextArrow from "../components/NextArrow";
import logoBig from "../assets/logo_big.png";
import logoMedium from "../assets/logo_medium.png";
import logoSmall from "../assets/logo_small.png";

function StartScreen({ setScreen, setInitialPlayers }) {
  const [initialRender, setInitialRender] = useState(true);
  const [numOfPlayers, setNumOfPlayers] = useState(3);
  const [playerName, setPlayerName] = useState("");
  const [playerNameError, setPlayerNameError] = useState(false);
  const [playerNameErrorShake, setPlayerNameErrorShake] = useState(false);
  const [otherPlayersNames, setOtherPlayersNames] = useState(Array(5).fill(""));
  const [otherPlayersNamesError, setOtherPlayersNamesError] = useState(
    Array(5).fill(false)
  );
  const [otherPlayersNamesErrorShake, setOtherPlayersNamesErrorShake] =
    useState(Array(5).fill(false));
  const [toggle, setToggle] = useState(false);

  const validateInputs = () => {
    setPlayerNameError(playerName.trim() === "");
    setPlayerNameErrorShake(playerName.trim() === "");
    setOtherPlayersNamesError((prevState) => {
      const newState = [...prevState];

      for (let i = 0; i < numOfPlayers - 1; i++) {
        newState[i] = otherPlayersNames[i].trim() === "";
      }

      return newState;
    });
    setOtherPlayersNamesErrorShake((prevState) => {
      const newState = [...prevState];

      for (let i = 0; i < numOfPlayers - 1; i++) {
        newState[i] = otherPlayersNames[i].trim() === "";
      }

      return newState;
    });

    let error = false;
    if (playerName.trim() === "") {
      error = true;
    }
    for (let i = 0; i < numOfPlayers - 1; i++) {
      if (otherPlayersNames[i].trim() === "") {
        error = true;
      }
    }
    if (!error) {
      const players = [
        playerName,
        ...otherPlayersNames.slice(0, numOfPlayers - 1),
      ];
      if (numOfPlayers === 4 || numOfPlayers === 5) {
        players.push("ALL");
      }

      setInitialPlayers(
        players.map((player) => {
          return { name: player, cards: new Set(), notCards: new Set() };
        })
      );
      setScreen("cards");
    } else {
      // force React to rerender inputs to trigger animation
      setToggle((prevState) => !prevState);
    }
  };

  return (
    <>
      <picture>
        <source srcSet={logoBig} media="(min-width: 900px)" />
        <source srcSet={logoMedium} media="(min-width: 500px)" />
        <img src={logoSmall} alt="logo" />
      </picture>
      <div className="mt-5">
        <Form.Group>
          <Form.Label className="fs-4">Wpisz swoje imię:</Form.Label>
          <Form.Control
            autoFocus
            key={`playerName - ${toggle}`}
            className={makeClassString(
              "input-player",
              playerNameError && "input-error",
              playerNameErrorShake && "input-error-shake"
            )}
            type="text"
            placeholder="Twoje imię..."
            value={playerName}
            onChange={(e) => {
              setPlayerName(e.target.value);
              setPlayerNameError(e.target.value.trim() === "");
            }}
          />
        </Form.Group>
      </div>
      <div className="mt-5">
        <Form.Group className="d-flex flex-column align-items-center">
          <Form.Label className="fs-4">
            Wpisz imiona innych graczy, zaczynając od tego, który siedzi po
            Twojej prawej stronie.
          </Form.Label>
          {Array(numOfPlayers - 1)
            .fill(0)
            .map((_, idx) => (
              <Form.Control
                autoFocus={!initialRender}
                className={makeClassString(
                  "input-player",
                  "mb-2",
                  otherPlayersNamesError[idx] && "input-error",
                  otherPlayersNamesErrorShake[idx] && "input-error-shake"
                )}
                key={`otherPlayerName${idx} - ${toggle}`}
                type="text"
                placeholder="Imię gracza..."
                value={otherPlayersNames[idx]}
                onChange={(e) => {
                  setOtherPlayersNames((prevState) => {
                    const newState = [...prevState];
                    newState[idx] = e.target.value;
                    return newState;
                  });

                  setOtherPlayersNamesError((prevState) => {
                    const newState = [...prevState];
                    newState[idx] = e.target.value.trim() === "";
                    return newState;
                  });
                }}
              />
            ))}
        </Form.Group>
      </div>
      <div
        className={makeClassString(
          "fs-5",
          "add-player",
          numOfPlayers === 6 && "hidden"
        )}
        onClick={() => {
          setNumOfPlayers((prevState) => prevState + 1);
          setInitialRender(false);
        }}
      >
        <span className="me-2">Dodaj gracza</span>
        <PlusCircleFill />
      </div>{" "}
      <div
        className={makeClassString(
          "fs-5",
          "delete-player",
          numOfPlayers <= 3 && "hidden"
        )}
        onClick={() => {
          setNumOfPlayers((prevState) => prevState - 1);
          setInitialRender(false);
        }}
      >
        <span className="me-2">Usuń gracza</span>
        <XCircleFill />
      </div>
      <NextArrow onClick={validateInputs} />
    </>
  );
}

export default StartScreen;
