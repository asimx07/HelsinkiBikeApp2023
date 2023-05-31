const APP_URL = import.meta.env.VITE_PUBLIC_URL;

export const styles = {
  root: {
    minHeight: "100vh",
    minWidth: "100vw",
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),url(${
      APP_URL + "/src/assets/bg.jpg"
    })`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "top-right",
  },
  content: {
    paddingTop: "100px",
    display: "flex",
    height: "calc(100vh - 60px)",
    backgroundColor: "#0000006e",
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    padding: "24px",
    color: "#FFF",
  },
  stationDetails: {
    textAlign: "center" as "center",
    marginTop: "24px",
  },

  detailItem: {
    marginBottom: "12px",
  },
};
