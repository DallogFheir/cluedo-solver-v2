import { usePlayers } from "../contexts/playersContext";
import makeClassString from "../utilities/makeClassString";

function Move({ move, moveIdx }) {
  const players = usePlayers();

  const playerWhoHadCard = move.responses.at(-1).idx;
  const crossedOutCards = [
    players[playerWhoHadCard].notCards.has(move.question.suspect),
    players[playerWhoHadCard].notCards.has(move.question.tool),
    players[playerWhoHadCard].notCards.has(move.question.room),
  ];

  // filter out if asker is player, or no one had cards
  const ifFiltered =
    move.asker !== 0 &&
    move.responses.filter((response) => response.has).length ===
      move.responses.length &&
    typeof move.responses.at(-1).has !== "string" &&
    crossedOutCards.filter((el) => el).length !== 2;

  return (
    <div className={makeClassString("move", ifFiltered && "move-filter")}>
      <div className="move-bold">
        <span
          className={makeClassString(
            ifFiltered &&
              players[playerWhoHadCard].notCards.has(move.question.suspect) &&
              "move-item-crossed"
          )}
        >
          {move.question.suspect}
        </span>
        ,{" "}
        <span
          className={makeClassString(
            ifFiltered &&
              players[playerWhoHadCard].notCards.has(move.question.tool) &&
              "move-item-crossed"
          )}
        >
          {move.question.tool}
        </span>
        ,{" "}
        <span
          className={makeClassString(
            ifFiltered &&
              players[playerWhoHadCard].notCards.has(move.question.room) &&
              "move-item-crossed"
          )}
        >
          {move.question.room}
        </span>
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
