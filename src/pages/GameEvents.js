import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { BackspaceFill } from "react-bootstrap-icons";
import { useMoves, useDeleteLastMove } from "../contexts/movesContext";
import Move from "../components/Move";
import EventModal from "../components/EventModal";
import RestartModal from "../components/RestartModal";

function GameEvents() {
  const [filtered, setFiltered] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const moves = useMoves();
  const deleteLastMove = useDeleteLastMove();

  const filterMoves = (move) => {
    if (filtered) {
      return (
        move.asker !== 0 &&
        move.responses.filter((response) => response.has).length ===
          move.responses.length &&
        typeof move.responses.at(-1).has !== "string"
      );
    }

    return true;
  };

  return (
    <>
      <div className="container-events">
        {moves.filter(filterMoves).map((move, idx) => (
          <Move key={`move-${idx}`} move={move} moveIdx={idx} />
        ))}
        {moves.length > 0 && (
          <div>
            {!filtered && (
              <BackspaceFill
                className="mt-3 arrow-remove"
                onClick={() => deleteLastMove()}
              />
            )}
          </div>
        )}
        <Button
          className="mt-5"
          variant="light"
          onClick={() => setShowModal(true)}
        >
          Dodaj wydarzenie
        </Button>
        <Form className="mt-5">
          <Form.Group>
            <Form.Check
              className="checkbox"
              type="checkbox"
              label="Przefiltruj"
              onChange={(e) => {
                setFiltered(e.target.checked);
              }}
            />
          </Form.Group>
        </Form>
        <p className="mt-5 link" onClick={() => setShowConfirmation(true)}>
          Zacznij od początku
        </p>
      </div>
      <EventModal show={showModal} setShow={setShowModal} />
      <RestartModal show={showConfirmation} setShow={setShowConfirmation} />
    </>
  );
}

export default GameEvents;
