import { useMoves } from "../contexts/movesContext";
import Move from "../components/Move";

function GameEvents() {
  const moves = useMoves();

  return (
    <div class="container-events">
      {moves.map((move, idx) => (
        <Move key={`move-${idx}`} move={move} />
      ))}
    </div>
  );
}

export default GameEvents;
