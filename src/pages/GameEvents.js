import { useMoves } from "../contexts/movesContext";
import Move from "../components/Move";

function GameEvents() {
  const moves = useMoves();

  return (
    <div>
      {moves.map((move) => (
        <Move move={move} />
      ))}
    </div>
  );
}

export default GameEvents;
