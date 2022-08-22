import { usePlayers } from "../contexts/playersContext";

function Move({ move, moveIdx }) {
  const players = usePlayers();

  return (
    <div className="move">
      <div className="move-bold">
        {move.question.suspect}, {move.question.tool}, {move.question.room}
      </div>
      <div>
        {move.responses.map((submove, idx) => (
          <p key={`move-${moveIdx}-${idx}`} className="move-p">
            gracz <span className="move-bold">{players[submove.idx].name}</span>{" "}
            {submove.has ? "ma kartę" : "nie ma karty"}
          </p>
        ))}
      </div>
    </div>
  );
}

export default Move;
