import { usePlayers } from "../contexts/playersContext";
import makeClassString from "../utilities/makeClassString";

function Move({ move, moveIdx }) {
  const players = usePlayers();

  // filter out if asker is player, or no one had cards
  const ifFiltered =
    move.asker !== 0 &&
    move.responses.filter((response) => response.has).length ===
      move.responses.length &&
    typeof move.responses.at(-1).has !== "string";

  return (
    <div className={makeClassString("move", ifFiltered && "move-filter")}>
      <div className="move-bold">
        {move.question.suspect}, {move.question.tool}, {move.question.room}
      </div>
      <div>
        {move.responses.map((submove, idx) => (
          <p key={`move-${moveIdx}-${idx}`} className="move-p">
            gracz <span className="move-bold">{players[submove.idx].name}</span>{" "}
            {submove.has ? "ma kartę" : "nie ma karty"}
            {submove.has !== true && (
              <span className="move-bold"> {submove.has}</span>
            )}
          </p>
        ))}
      </div>
    </div>
  );
}

export default Move;
