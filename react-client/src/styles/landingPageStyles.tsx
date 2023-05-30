const APP_URL = import.meta.env.VITE_PUBLIC_URL;

const styles = {
  root: {
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
  heading: {
    textAlign: "center",
    color: "#FFEEF9",
    fontFamily: "nunito",
    fontWeight: 700,
    fontSize: "3.5rem",
  },
  expandMoreButton: {
    fontSize: "4rem",
  },
  cardContainer: {
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

export default styles;
