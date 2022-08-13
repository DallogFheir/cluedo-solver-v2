import { useState } from "react";
import Form from "react-bootstrap/Form";
import {
  PlusCircleFill,
  XCircleFill,
  ArrowRightCircleFill,
} from "react-bootstrap-icons";
import logoBig from "../assets/logo_big.png";
import logoMedium from "../assets/logo_medium.png";
import logoSmall from "../assets/logo_small.png";
import makeClassString from "../utilities/makeClassString";

function StartScreen({ setScreen }) {
  const [numOfPlayers, setNumOfPlayers] = useState(3);
  const [playerName, setPlayerName] = useState("");
  const [playerNameError, setPlayerNameError] = useState(false);
  const [otherPlayersNames, setOtherPlayersNames] = useState(Array(5).fill(""));
  const [otherPlayersNamesError, setOtherPlayersNamesError] = useState(
    Array(5).fill(false)
  );

  const validateInputs = () => {
    let error = false;

    if (playerName.trim() === "") {
      error = true;
      setPlayerNameError(true);
    }

    otherPlayersNames.forEach((otherPlayerName, idx) => {
      if (otherPlayerName.trim() === "") {
        error = true;
        setOtherPlayersNamesError((prevState) => {
          const newState = [...prevState];
          newState[idx] = true;
          return newState;
        });
      }
    });

    if (!error) {
      setScreen("cards");
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
            className={makeClassString(
              "input-player",
              playerNameError && "input-error"
            )}
            type="text"
            placeholder="Twoje imię..."
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
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
                className={makeClassString(
                  "input-player",
                  "input-player-other",
                  "mb-2",
                  otherPlayersNamesError[idx] && "input-error"
                )}
                key={idx}
                type="text"
                placeholder="Imię gracza..."
                value={otherPlayersNames[idx]}
                onChange={(e) =>
                  setOtherPlayersNames((prevState) => {
                    const newState = [...prevState];
                    newState[idx] = e.target.value;
                    return newState;
                  })
                }
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
        onClick={() => setNumOfPlayers((prevState) => prevState + 1)}
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
        onClick={() => setNumOfPlayers((prevState) => prevState - 1)}
      >
        <span className="me-2">Usuń gracza</span>
        <XCircleFill />
      </div>
      <ArrowRightCircleFill
        className="mt-5 arrow-next"
        onClick={validateInputs}
      />
    </>
  );
}

export default StartScreen;
