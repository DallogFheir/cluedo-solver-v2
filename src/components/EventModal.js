import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { usePlayers, useUpdatePlayers } from "../contexts/playersContext";
import CARDS from "../assets/cards";

function EventModal({ show, setShow }) {
  const players = usePlayers();
  const [asker, setAsker] = useState(0);
  const [question, setQuestion] = useState({
    suspect: CARDS.suspects[0],
    tool: CARDS.tools[0],
    room: CARDS.rooms[0],
  });
  const [answers, setAnswers] = useState({});

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
    handleClose();
  };

  const responses = [];
  let nextPlayerIdx;
  for (let i = asker + 1, j = 0; j < players.length - 1; j++) {
    nextPlayerIdx = (i + j) % players.length;
    const nextPlayer = players[nextPlayerIdx];

    const ifPlayerHasCard = [
      question.suspect,
      question.tool,
      question.room,
    ].some((card) => nextPlayer.cards.has(card));
    const ifPlayerDoesNotHaveCard = [
      question.suspect,
      question.tool,
      question.room,
    ].every((card) => nextPlayer.notCards.has(card));

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
        responses.push({
          idx: nextPlayerIdx,
          has: answers[nextPlayerIdx],
        });
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
          <Form.Select onChange={(e) => setAsker(e.target.value)}>
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
            onChange={(e) =>
              setQuestion((prevState) => {
                const newState = { ...prevState };
                newState.suspect = e.target.value;
                return newState;
              })
            }
          >
            {CARDS.suspects.map((suspect, idx) => (
              <option key={`modal-suspect-${idx}`} value={suspect}>
                {suspect}
              </option>
            ))}
          </Form.Select>
          <Form.Select
            className="modal-select"
            onChange={(e) =>
              setQuestion((prevState) => {
                const newState = { ...prevState };
                newState.tool = e.target.value;
                return newState;
              })
            }
          >
            {CARDS.tools.map((tool, idx) => (
              <option key={`modal-tool-${idx}`} value={tool}>
                {tool}
              </option>
            ))}
          </Form.Select>
          <Form.Select
            className="modal-select"
            onChange={(e) =>
              setQuestion((prevState) => {
                const newState = { ...prevState };
                newState.room = e.target.value;
                return newState;
              })
            }
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
              onChange={(e) =>
                setAnswers((prevState) => {
                  const newState = { ...prevState };

                  newState[nextPlayerIdx] =
                    e.target.value === "has" ? true : false;

                  return newState;
                })
              }
            >
              <option value="has">ma</option>
              <option value="does-not-have">nie ma</option>
            </Form.Select>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleAdd}>
          Dodaj
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EventModal;