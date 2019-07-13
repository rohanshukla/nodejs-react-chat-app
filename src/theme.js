import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#b0deff",
            dark: "#a1dd70",
            light: "#fdfff0",
            contrastText: "#fff8a6"
        },
        secondary: {
            main: "#233142",
            dark: "#eeeeee",
            light: "#deecff"
        }
    },
    typography: {
        useNextVariants: true,
        fontFamily: [
            'Lato',
            'sans-serif',
        ].join(",")
    }
});

export {
    theme,
}