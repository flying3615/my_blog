import React from 'react'
import { Container } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Footer from '../components/Footer';
import Navigator from '../components/Nav'

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
    },
    main: {
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(2),
    },
    footer: {
        padding: theme.spacing(2),
        marginTop: 'auto',
        backgroundColor: 'white',
    },
}));


export default ({ children, showFooter=true }) => {

    const classes = useStyles();

    return (
        <Container maxWidth="lg" className={classes.root}>
            <header>
                <Navigator />
            </header>
            <main className={classes.main} >
                {children}
            </main>
           
            {
            showFooter&& <footer className={classes.footer}>
                <Footer />
            </footer>
            }

        </Container>
    )
}

