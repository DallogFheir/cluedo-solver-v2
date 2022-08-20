import { XLg, CheckLg } from "react-bootstrap-icons";
import { usePlayers } from "../contexts/playersContext";
import makeClassString from "../utilities/makeClassString";

function GameTablePart({ name, cards }) {
  const players = usePlayers();

  return (
    <>
      <tr>
        <td className="table-cell table-cell-bold" colSpan={players.length + 1}>
          PODEJRZANI
        </td>
      </tr>
      {cards.map((card, idx) => (
        <tr key={`${name}-${idx}`}>
          <td
            className={makeClassString(
              "table-cell",
              players.some((player) => player.cards.has(card)) &&
                "table-cell-crossed",
              players.every((player) => player.notCards.has(card)) &&
                "table-cell-solution"
            )}
          >
            {card}
          </td>
          {players.map((player, playerIdx) => (
            <td
              key={`${name}-${idx}-player-${playerIdx}`}
              className="table-cell"
            >
              {player.cards.has(card) ? (
                <CheckLg />
              ) : player.notCards.has(card) ? (
                <XLg />
              ) : (
                ""
              )}
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}

export default GameTablePart;
