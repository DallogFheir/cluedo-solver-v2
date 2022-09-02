import { useScreen } from "./contexts/screenContext";
import StartScreen from "./pages/StartScreen";
import Cards from "./pages/Cards";
import Main from "./pages/Main";

function App() {
  const screen = useScreen();

  switch (screen) {
    case "start":
      return (
        <div className="d-flex flex-column justify-content-start justify-content-md-center  align-items-center screen-container">
          <StartScreen />
        </div>
      );
    case "cards":
      return (
        <div className="d-flex flex-column justify-content-start justify-content-md-center  align-items-center screen-container">
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
