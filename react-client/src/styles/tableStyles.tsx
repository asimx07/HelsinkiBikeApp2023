export const styles = {
  root: {
    minHeight: "100vh",
    minWidth: "100vw",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),url(${"/src/assets/bg.jpg"})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "top-right",
    display: "flex",
    textAlign: "center",
  },
  headerContainer: {
    position: "absolute",
    top: 0,
    width: "100%",
    background: "rgba(0,0,0,0)",
  },
  tableCell: {
    backgroundColor: "#000",
    color: "#fff",
  },
  tableCellText: {
    color: "#fff",
    fontSize: "1rem",
  },
  paper: {
    marginTop: "100px",
    width: "100%",
    overflow: "auto",
    backgroundColor: "#0000006e",
  },
  tableContainer: {
    maxHeight: 400,
    display: "flex",
  },
  tableFooter: {
    color: "#fff",
    fontSize: "1rem",
  },
};
