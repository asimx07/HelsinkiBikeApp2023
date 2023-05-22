import { useState, useEffect } from "react";
import "./App.css";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./styles/theme";
import {
  Typography,
  IconButton,
  Container,
  Box,
  Collapse,
} from "@mui/material";
import Header from "./component/Header";
import JourneyCard from "./component/JourneyCard";
import StationCard from "./component/StationCard";
const APP_URL = import.meta.env.VITE_PUBLIC_URL;
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const styles = {
  root: {
    minHeight: "100vh",
    //minWidth: "100vw",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),url(${
      APP_URL + "/src/assets/bg.jpg"
    })`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "top-right",
    display: "flex",
    textAlign: "center",
  },
  heading: {
    textAlign: "center",
    color: "#FFEEF9",
    fontFamily: "nunito",
    fontWeight: 700,
    fontSize: "3.5rem",
  },
  expandMoreButton: {
    fontSize: "3rem",
  },
  journeyCardContainer: {
    minHeight: "100vh",
    justifyContent: "center",

    alignItems: "center",
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),url(${
      APP_URL + "/src/assets/bg.jpg"
    })`,

    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "top-right",
    display: "flex",
    textAlign: "center",
  },
};

function App() {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(true);
  }, []);
  console.log(APP_URL);

  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Paper style={styles.root}>
        <Header />

        <Collapse
          direction="up"
          in={checked}
          {...(checked ? { timeout: 500 } : {})}
          collapsedSize={0}
        >
          <Container>
            <Typography style={styles.heading} variant="h3">
              Helsinki Bike App
            </Typography>
            <IconButton onClick={handleScrollDown}>
              <ExpandMoreIcon style={styles.expandMoreButton} />
            </IconButton>
          </Container>
        </Collapse>
      </Paper>
      <Paper style={styles.journeyCardContainer}>
        <Box style={{ margin: "20px" }}>
          <JourneyCard />
        </Box>
        <Box style={{ margin: "20px" }}>
          <StationCard />
        </Box>
      </Paper>
    </ThemeProvider>
  );
}

export default App;
