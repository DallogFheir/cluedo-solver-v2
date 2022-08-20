import { XLg, CheckLg } from "react-bootstrap-icons";
import { usePlayers } from "../contexts/playersContext";

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
          <td className="table-cell">{card}</td>
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
