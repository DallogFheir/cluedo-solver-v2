import PlayersProvider from "./playersContext";
import MovesProvider from "./movesContext";

const AppProvider = function ({ children }) {
  return (
    <PlayersProvider>
      <MovesProvider>{children}</MovesProvider>
    </PlayersProvider>
  );
};

export default AppProvider;
