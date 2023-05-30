import { useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./styles/theme";
import {
  Typography,
  IconButton,
  Container,
  Box,
  Collapse,
  Paper,
  CssBaseline,
} from "@mui/material";
import Header from "./component/Header";
import JourneyCard from "./component/JourneyCard";
import StationCard from "./component/StationCard";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styles from "./styles/landingPageStyles";
function App() {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(true);
  }, []);

  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Paper sx={styles.root}>
        <Header />

        <Collapse
          in={checked}
          {...(checked ? { timeout: 500 } : {})}
          collapsedSize={0}
        >
          <Container>
            <Typography sx={styles.heading} variant="h3">
              Helsinki Bike App
            </Typography>
            <IconButton onClick={handleScrollDown}>
              <ExpandMoreIcon style={styles.expandMoreButton} />
            </IconButton>
          </Container>
        </Collapse>
      </Paper>
      <Paper sx={styles.cardContainer}>
        <Box style={{ margin: "20px" }} data-testid="journey-card">
          <JourneyCard />
        </Box>
        <Box style={{ margin: "20px" }} data-testid="station-card">
          <StationCard />
        </Box>
      </Paper>
    </ThemeProvider>
  );
}

export default App;
