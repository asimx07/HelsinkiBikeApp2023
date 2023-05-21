import { useState } from "react";
import "./App.css";
import { JourneysList } from "./component/JourneysList";
import { StationList } from "./component/StationList";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./styles/theme";
import "./styles/table.css";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="container">
          <StationList />
        </div>
        <div className="container">
          <JourneysList />
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
