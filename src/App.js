import { useState } from "react";
import StartScreen from "./pages/StartScreen";
import Cards from "./pages/Cards";
import Main from "./pages/Main";

function App() {
  const [screen, setScreen] = useState("start");

  return (
    <div className="d-flex flex-column justify-content-center align-items-center container">
      {(() => {
        switch (screen) {
          case "start":
            return <StartScreen setScreen={setScreen} />;
          case "cards":
            return <Cards setScreen={setScreen} />;
          case "main":
            return <Main />;
          default:
            throw new Error(`Unknown screen: ${screen}.`);
        }
      })()}
    </div>
  );
}

export default App;
