import {createTheme} from "@mui/material";

export default createTheme({
    palette: {
        primary: {
            main: "#2c2c2c"
        },
        secondary: {
            main: "#f06292"
        },
        text: {
            primary: "#fff"
        },
    },
    typography: {
        fontFamily: "Roboto, sans-serif",
        h2: {
            fontSize: "2.5rem",
            fontWeight: 700
        },
        h3: {
            fontSize: "1.5rem",
            fontWeight: 400
        },
        h4: {
            fontSize: "1.2rem",
            fontWeight: 700
        },
        button: {
            borderRadius: "30px",
            "&:hover": {
                color: "#f06292 !important"
            }
        }
    },

})