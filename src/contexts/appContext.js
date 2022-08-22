import PlayersProvider from "./playersContext";
import MovesProvider from "./movesContext";
import InitialPlayersProvider from "./initialPlayersContext";
import ScreenProvider from "./screenContext";

const AppProvider = function ({ children }) {
  return (
    <ScreenProvider>
      <InitialPlayersProvider>
        <PlayersProvider>
          <MovesProvider>{children}</MovesProvider>
        </PlayersProvider>
      </InitialPlayersProvider>
    </ScreenProvider>
  );
};

export default AppProvider;
