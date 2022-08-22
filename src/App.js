import { useScreen } from "./contexts/screenContext";
import StartScreen from "./pages/StartScreen";
import Cards from "./pages/Cards";
import Main from "./pages/Main";

function App() {
  const screen = useScreen();

  switch (screen) {
    case "start":
      return (
        <div className="d-flex flex-column justify-content-center align-items-center container">
          <StartScreen />
        </div>
      );
    case "cards":
      return (
        <div className="d-flex flex-column justify-content-center align-items-center container">
          <Cards />
        </div>
      );
    case "main":
      return <Main />;
    default:
      throw new Error(`Unknown screen: ${screen}.`);
  }
}

export default App;
