import { useState, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import GameEvents from "./GameEvents";
import GameTable from "./GameTable";

function Main() {
  const [smallWindow, setSmallWindow] = useState(
    window.matchMedia("(max-width: 500px)").matches
  );

  useEffect(() => {
    const onResize = () => {
      setSmallWindow(window.matchMedia("(max-width: 500px)").matches);
    };

    window.addEventListener("resize", onResize);

    return () => window.removeEventListener("resize", onResize);
  }, []);

  return smallWindow ? (
    <Tabs className="tabs">
      <TabList>
        <Tab>Wydarzenia</Tab>
        <Tab>Tabela</Tab>
      </TabList>
      <TabPanel>
        <GameEvents />
      </TabPanel>
      <TabPanel>
        <GameTable />
      </TabPanel>
    </Tabs>
  ) : (
    <div className="container-split">
      <GameEvents />
      <GameTable />
    </div>
  );
}

export default Main;
