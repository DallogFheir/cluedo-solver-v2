import { useEffect, useState } from "react";
import { usePlayers } from "./contexts/playersContext";
import { playerReplacer, playerReviver } from "./utilities/jsonUtils";
import StartScreen from "./pages/StartScreen";
import Cards from "./pages/Cards";
import Main from "./pages/Main";

function App() {
  const [initialPlayers, setInitialPlayers] = useState(
    JSON.parse(localStorage.getItem("initialPlayers"), playerReviver) ?? null
  );
  const [screen, setScreen] = useState(
    initialPlayers && initialPlayers[0].cards.size !== 0 ? "main" : "start"
  );

  useEffect(() => {
    localStorage.setItem(
      "initialPlayers",
      JSON.stringify(initialPlayers, playerReplacer)
    );
  }, [initialPlayers]);

  switch (screen) {
    case "start":
      return (
        <div className="d-flex flex-column justify-content-center align-items-center container">
          <StartScreen
            setScreen={setScreen}
            setInitialPlayers={setInitialPlayers}
          />
        </div>
      );
    case "cards":
      return (
        <div className="d-flex flex-column justify-content-center align-items-center container">
          <Cards
            setScreen={setScreen}
            initialPlayers={initialPlayers}
            setInitialPlayers={setInitialPlayers}
          />
        </div>
      );
    case "main":
      return <Main initialPlayers={initialPlayers} />;
    default:
      throw new Error(`Unknown screen: ${screen}.`);
  }
}

export default App;
