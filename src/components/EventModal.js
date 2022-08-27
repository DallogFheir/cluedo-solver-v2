import { useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { usePlayers } from "../contexts/playersContext";
import { useUpdateMoves } from "../contexts/movesContext";
import { CARDS } from "../assets/cards";

function EventModal({ show, setShow }) {
  const lastInput = useRef();
  const players = usePlayers();
  const updateMoves = useUpdateMoves();
  const [asker, setAsker] = useState(0);
  const [question, setQuestion] = useState({
    suspect: CARDS.suspects[0],
    tool: CARDS.tools[0],
    room: CARDS.rooms[0],
  });
  const [answers, setAnswers] = useState({});
  const [toggle, setToggle] = useState(false);

  const handleClose = () => {
    setAsker(0);
    setQuestion({
      suspect: CARDS.suspects[0],
      tool: CARDS.tools[0],
      room: CARDS.rooms[0],
    });
    setAnswers({});
    setShow(false);
  };

  const handleAdd = () => {
    updateMoves({ asker, question, responses });

    handleClose();
  };

  const responses = [];
  let nextPlayerIdx;
  for (let i = asker + 1, j = 0; j < players.length - 1; j++) {
    nextPlayerIdx = (i + j) % players.length;
    const nextPlayer = players[nextPlayerIdx];

    const ifPlayerHasCard = Object.values(question).some((card) =>
      nextPlayer.cards.has(card)
    );
    const ifPlayerDoesNotHaveCard = Object.values(question).every((card) =>
      nextPlayer.notCards.has(card)
    );

    if (ifPlayerHasCard) {
      responses.push({
        idx: nextPlayerIdx,
        has: ifPlayerHasCard,
      });
      break;
    } else if (ifPlayerDoesNotHaveCard) {
      responses.push({
        idx: nextPlayerIdx,
        has: ifPlayerHasCard,
      });
    } else {
      if (nextPlayerIdx in answers) {
        if (answers[nextPlayerIdx]) {
          const cardsThatCanHave = Object.values(question).filter(
            (card) => !nextPlayer.notCards.has(card)
          );

          if (cardsThatCanHave.length === 1) {
            responses.push({
              idx: nextPlayerIdx,
              has: cardsThatCanHave[0],
            });
          } else {
            responses.push({
              idx: nextPlayerIdx,
              has: answers[nextPlayerIdx],
            });
          }
          break;
        } else {
          responses.push({
            idx: nextPlayerIdx,
            has: false,
          });
        }
      } else {
        break;
      }
    }
  }

  return (
    <Modal className="modal" show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Dodaj wydarzenie</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <p className="modal-text">Wybierz osobę pytającą:</p>
          <Form.Select
            onChange={(e) => {
              setAsker(e.target.value);
              setAnswers({});
            }}
          >
            {players.map((player, idx) => (
              <option key={`option-player-${idx}`} value={idx}>
                {player.name}
              </option>
            ))}
          </Form.Select>
        </div>
        <div className="modal-div">
          <p>Wybierz, o co pytała:</p>
          <Form.Select
            className="modal-select"
            onChange={(e) => {
              setQuestion((prevState) => {
                const newState = { ...prevState };
                newState.suspect = e.target.value;
                return newState;
              });
              setAnswers({});
            }}
          >
            {CARDS.suspects.map((suspect, idx) => (
              <option key={`modal-suspect-${idx}`} value={suspect}>
                {suspect}
              </option>
            ))}
          </Form.Select>
          <Form.Select
            className="modal-select"
            onChange={(e) => {
              setQuestion((prevState) => {
                const newState = { ...prevState };
                newState.tool = e.target.value;
                return newState;
              });
              setAnswers({});
            }}
          >
            {CARDS.tools.map((tool, idx) => (
              <option key={`modal-tool-${idx}`} value={tool}>
                {tool}
              </option>
            ))}
          </Form.Select>
          <Form.Select
            className="modal-select"
            onChange={(e) => {
              setQuestion((prevState) => {
                const newState = { ...prevState };
                newState.room = e.target.value;
                return newState;
              });
              setAnswers({});
            }}
          >
            {CARDS.rooms.map((room, idx) => (
              <option key={`modal-room-${idx}`} value={room}>
                {room}
              </option>
            ))}
          </Form.Select>
        </div>
        <div className="modal-separator">
          {responses.map((response, idx) => (
            <p key={`modal-response-${idx}`}>
              gracz{" "}
              <span className="modal-bold">{players[response.idx].name}</span>{" "}
              {response.has ? "ma kartę" : "nie ma karty"}
              <span className="modal-bold">
                {typeof response.has === "string" ? ` ${response.has}` : ""}
              </span>
            </p>
          ))}
        </div>
        {responses.length < players.length - 1 && !responses.at(-1)?.has && (
          <div className="modal-div">
            <div>
              odpowiedź gracza{" "}
              <span className="modal-bold">{players[nextPlayerIdx].name}</span>:
            </div>
            <Form.Select
              key={`last-select-${toggle}`}
              defaultValue=""
              onChange={(e) => {
                setAnswers((prevState) => {
                  const newState = { ...prevState };

                  newState[nextPlayerIdx] = e.target.value === "has";

                  return newState;
                });
                setToggle((prevState) => !prevState);
              }}
            >
              <option value=""></option>
              <option value="has">ma</option>
              <option value="does-not-have">nie ma</option>
            </Form.Select>
          </div>
        )}
        <div className="modal-div">
          {asker === 0 &&
            answers[nextPlayerIdx] &&
            Object.values(question).filter(
              (card) => !players[nextPlayerIdx].notCards.has(card)
            ).length !== 1 && (
              <Form.Select
                ref={lastInput}
                defaultValue=""
                onChange={(e) =>
                  setAnswers((prevState) => {
                    if (e.target.value !== "") {
                      const newState = { ...prevState };

                      newState[nextPlayerIdx] = e.target.value;

                      return newState;
                    }

                    return prevState;
                  })
                }
              >
                {answers[nextPlayerIdx] === true && <option value=""></option>}
                {Object.values(question)
                  .filter((card) => !players[nextPlayerIdx].notCards.has(card))
                  .map((question, idx) => (
                    <option key={`answer-to-asker-${idx}`} value={question}>
                      {question}
                    </option>
                  ))}
              </Form.Select>
            )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          disabled={
            (responses.length < players.length - 1 && !responses.at(-1)?.has) ||
            lastInput.current?.value === ""
          }
          onClick={handleAdd}
        >
          Dodaj
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EventModal;
