import PlayersProvider from "./playersContext";
import MovesProvider from "./movesContext";
import InitialPlayersProvider from "./initialPlayersContext";
import ScreenProvider from "./screenContext";

const AppProvider = function ({ children }) {
  return (
    <InitialPlayersProvider>
      <ScreenProvider>
        <PlayersProvider>
          <MovesProvider>{children}</MovesProvider>
        </PlayersProvider>
      </ScreenProvider>
    </InitialPlayersProvider>
  );
};

export default AppProvider;
