import { useState } from "react";
import Button from "react-bootstrap/Button";
import { BackspaceFill } from "react-bootstrap-icons";
import { useMoves, useDeleteLastMove } from "../contexts/movesContext";
import Move from "../components/Move";
import EventModal from "../components/EventModal";
import RestartModal from "../components/RestartModal";

function GameEvents() {
  const [showModal, setShowModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const moves = useMoves();
  const deleteLastMove = useDeleteLastMove();

  return (
    <>
      <div className="container-events">
        {moves.map((move, idx) => (
          <Move key={`move-${idx}`} move={move} moveIdx={idx} />
        ))}
        {moves.length > 0 && (
          <BackspaceFill
            className="mt-3 arrow-remove"
            onClick={() => deleteLastMove()}
          />
        )}
        <Button
          className="mt-5"
          variant="light"
          onClick={() => setShowModal(true)}
        >
          Dodaj wydarzenie
        </Button>
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
