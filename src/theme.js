import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#f7f7f7"
        },
        secondary: {
            main: "#222222"
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