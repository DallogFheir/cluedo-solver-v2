import Table from "react-bootstrap/Table";

import { usePlayers } from "../contexts/playersContext";
import GameTablePart from "../components/GameTablePart";
import { CARDS } from "../assets/cards";

function GameTable() {
  const players = usePlayers();

  return (
    <div className="container-table">
      <Table className="table">
        <thead>
          <tr>
            <th></th>
            {players.map((player, idx) => (
              <th key={`player-name-${idx}`} className="table-cell">
                {player.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <GameTablePart name="PODEJRZANI" cards={CARDS.suspects} />
          <GameTablePart name="NARZĘDZIA ZBRODNI" cards={CARDS.tools} />
          <GameTablePart name="POMIESZCZENIA" cards={CARDS.rooms} />
        </tbody>
      </Table>
    </div>
  );
}

export default GameTable;
