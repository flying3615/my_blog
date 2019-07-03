import React from 'react'
import { Link, Button } from "gatsby-theme-material-ui";
import { Container, Box, Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Favorite from '@material-ui/icons/Favorite';


function MadeWithLove() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {`Made with `}<Favorite style={{ color: 'red' }} />{` by the `}
            <Link color="inherit" href="https://material-ui.com/">
                {`Yufei`}
            </Link>
        </Typography>
    );
}

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


export default ({children}) => {

    const classes = useStyles();

    return (
    <div className={classes.root}>
        <Container maxWidth="sm" className={classes.main} >
            {children}
        </Container>
        <footer className={classes.footer}>
            <Container maxWidth="sm">
                <MadeWithLove />
            </Container>
        </footer>
    </div>
)}