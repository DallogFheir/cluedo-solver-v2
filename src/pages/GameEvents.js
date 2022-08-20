import { useState } from "react";
import Button from "react-bootstrap/Button";
import { useMoves } from "../contexts/movesContext";
import Move from "../components/Move";
import EventModal from "../components/EventModal";

function GameEvents() {
  const [showModal, setShowModal] = useState(false);
  const moves = useMoves();

  return (
    <>
      <div className="container-events">
        {moves.map((move, idx) => (
          <Move key={`move-${idx}`} move={move} />
        ))}
        <Button variant="light" onClick={() => setShowModal(true)}>
          Dodaj wydarzenie
        </Button>
      </div>
      <EventModal show={showModal} setShow={setShowModal} />
    </>
  );
}

export default GameEvents;
