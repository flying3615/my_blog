import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#757ce8',
            main: '#663399',
            dark: '#600c84',
            contrastText: '#fff',
        },
        secondary: {
            light: '#ff7961',
            main: '#84034a',
            dark: '#baafa6',
            contrastText: '#fff',
        },
        error: {
            main: red.A400,
        },
        background: {
            default: '#fff',
        },
        divider: '#f0f0f2'
    },

    typography: {
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    },
});

export default theme;