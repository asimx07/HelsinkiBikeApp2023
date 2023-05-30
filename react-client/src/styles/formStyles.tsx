const APP_URL = import.meta.env.VITE_PUBLIC_URL;

const styles = {
  paper: {
    overflow: "hidden",
    backgroundColor: "#0000006e",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${APP_URL}/src/assets/bg.jpg)`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "top-right",
    display: "flex",
    textAlign: "center",
  },
  box: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#0000006e",
  },
  card: {
    backgroundColor: "#0000006e",
  },
  textField: {
    "& .MuiInputBase-root": {
      color: "#FFFFFF",
      "&:before": {
        borderBottomColor: "transparent",
      },
      "&:after": {
        borderBottomColor: "transparent",
      },
    },
    "& .MuiInputLabel-root": {
      color: "#FFFFFF",
    },
    "& .MuiInput-underline:before": {
      borderBottomColor: "transparent",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "transparent",
    },
    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
      borderBottomColor: "transparent",
    },
    "& .MuiFormHelperText-root": {
      color: "#FFFFFF",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#FFFFFF",
        borderWidth: 1,
        opacity: 1, // Adjust the opacity value as needed
      },
      "&:hover fieldset": {
        borderColor: "#FFFFFF",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#FFFFFF",
      },
      "&.MuiAutocomplete-hasPopupIcon .MuiOutlinedInput-input": {
        padding: "10px 26px 10px 12px", // Adjust the padding as needed
      },
    },
  },
};

export default styles;
