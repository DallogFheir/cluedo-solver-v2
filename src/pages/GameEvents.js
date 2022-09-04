import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { BackspaceFill } from "react-bootstrap-icons";
import { useMoves, useDeleteLastMove } from "../contexts/movesContext";
import { usePlayers } from "../contexts/playersContext";
import Move from "../components/Move";
import EventModal from "../components/EventModal";
import RestartModal from "../components/RestartModal";

function GameEvents({ filtered, setFiltered }) {
  const [showModal, setShowModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const players = usePlayers();
  const moves = useMoves();
  const deleteLastMove = useDeleteLastMove();

  const filterMoves = (move) => {
    if (filtered) {
      const playerWhoHadCard = move.responses.at(-1).idx;
      const crossedOutCards = [
        players[playerWhoHadCard].notCards.has(move.question.suspect),
        players[playerWhoHadCard].notCards.has(move.question.tool),
        players[playerWhoHadCard].notCards.has(move.question.room),
      ];

      return (
        move.asker !== 0 &&
        move.responses.at(-1).has &&
        typeof move.responses.at(-1).has !== "string" &&
        crossedOutCards.filter((el) => el).length !== 2 &&
        Object.values(move.question).every(
          (card) => !players[move.responses.at(-1).idx].cards.has(card)
        )
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
          Dodaj zapytanie
        </Button>
        <Form className="mt-5">
          <Form.Group className="d-flex">
            <Form.Check
              id="filter-checkbox"
              className="checkbox"
              type="checkbox"
              label="Pokaż tylko istotne"
              onChange={(e) => {
                setFiltered(e.target.checked);
              }}
              checked={filtered}
            />
          </Form.Group>
        </Form>
        <p
          className="mt-5 link link-start-again"
          onClick={() => setShowConfirmation(true)}
        >
          Zacznij od początku
        </p>
      </div>
      <EventModal show={showModal} setShow={setShowModal} />
      <RestartModal show={showConfirmation} setShow={setShowConfirmation} />
    </>
  );
}

export default GameEvents;
