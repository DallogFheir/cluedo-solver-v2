import { useState } from "react";
import { usePlayers } from "./contexts/playersContext";
import StartScreen from "./pages/StartScreen";
import Cards from "./pages/Cards";
import Main from "./pages/Main";

function App() {
  const players = usePlayers();
  const [screen, setScreen] = useState(players ? "main" : "start");

  switch (screen) {
    case "start":
      return (
        <div className="d-flex flex-column justify-content-center align-items-center container">
          <StartScreen setScreen={setScreen} />
        </div>
      );
    case "cards":
      return (
        <div className="d-flex flex-column justify-content-center align-items-center container">
          <Cards setScreen={setScreen} />
        </div>
      );
    case "main":
      return <Main />;
    default:
      throw new Error(`Unknown screen: ${screen}.`);
  }
}

export default App;
