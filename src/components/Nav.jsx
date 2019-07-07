import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { graphql, useStaticQuery, Link } from "gatsby"
import theme from '../theme'

// Blog siteMap
const sections = [
    { display: 'Home', path: '/' },
    { display: 'Blog', path: '/blog' },
    { display: 'About', path: '/about' },
    { display: 'Files', path: '/my-files' },

]

const useStyles = makeStyles(theme => ({
    toolbar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbarTitle: {
        flex: 1,
    },
    toolbarSecondary: {
        justifyContent: 'space-between',
        overflowX: 'auto',
    },
    toolbarLink: {
        padding: theme.spacing(1),
        flexShrink: 0,
    },
}))

export default () => {

    const data = useStaticQuery(
        graphql`
            query {
                site {
                    siteMetadata {
                        title
                    }
                }
            }
        `
    )

    const classes = useStyles();

    return (
        <React.Fragment >
            <AppBar position="static" color="primary">
                <Toolbar className={classes.toolbar}>
                    <Button size="small">Subscribe</Button>
                    <Typography
                        component="h2"
                        variant="h5"
                        color="inherit"
                        align="center"
                        noWrap
                        className={classes.toolbarTitle}
                    >
                        {data.site.siteMetadata.title}

                    </Typography>
                    <IconButton>
                        <SearchIcon />
                    </IconButton>
                    <Button variant="outlined" size="small">
                        Sign up
                    </Button>
                </Toolbar>
            </AppBar>
            <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
                {sections.map(section => (
                    <Link
                        key={section.display}
                        to={section.path}
                        className={classes.toolbarLink}
                    >
                        {section.display}
                    </Link>
                ))}
            </Toolbar>
        </React.Fragment>
    )
}
