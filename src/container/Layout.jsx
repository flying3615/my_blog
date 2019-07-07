import React from 'react'
import { Container } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Footer from '../components/Footer';
import Navigator from '../components/Nav'
import theme from "../theme"
import { MuiThemeProvider } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
    },
    main: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    footer: {
        padding: theme.spacing(2),
        marginTop: 'auto',
        backgroundColor: 'white',
    },
}));


export default ({ children, showFooter = true }) => {

    const classes = useStyles();

    return (
        <MuiThemeProvider theme={theme} style={{padding:0}}>
            <header>
                <Navigator />
            </header>
            <Container maxWidth="lg" className={classes.root}>
                <main className={classes.main} >
                    {children}
                </main>
            </Container>
            {
                showFooter && <footer className={classes.footer}>
                    <Footer />
                </footer>
            }
        </MuiThemeProvider>
    )
}

