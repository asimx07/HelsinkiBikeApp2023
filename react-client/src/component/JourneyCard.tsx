import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";
const APP_URL = import.meta.env.VITE_PUBLIC_URL;

export default function JourneyCard() {
  const navigate = useNavigate();
  const handleCardClick = () => {
    navigate("/journeys");
  };

  return (
    <Card
      sx={{
        maxWidth: 500,
        background: "rgba(0,80,0,0.5)",
        justifyContent: "center",
      }}
      onClick={handleCardClick}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="400"
          image={APP_URL + "/assets/bike.jpg"}
          alt="bike"
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{
              fontFamily: "nunito",
              fontWeight: "300",
            }}
          >
            Journeys
          </Typography>
          <Typography variant="body2" color="text.secondary"></Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
