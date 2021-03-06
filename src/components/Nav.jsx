import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { graphql, useStaticQuery, Link } from 'gatsby'
import window from 'global'
import Search from './search'

// Blog siteMap
const sections = [
  { display: 'Home', path: '/' },
  { display: 'Blog', path: '/blog' },
  { display: 'About', path: '/about' },
  { display: 'Files', path: '/my-files' }
]

const searchIndices = [
  { name: `Posts`, title: `Blog Posts`, hitComp: `PostHit` }
]

const useStyles = makeStyles(theme => ({
  toolbar: {
    // borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
    marginLeft: '1.5rem',
    marginRight: '1.5rem'
  },
  toolbarSecondary: {
    justifyContent: 'flex-start',
    overflowX: 'auto',
    borderBottom: `1px solid ${theme.palette.divider}`,
    marginBottom: 10
  },
  toolbarLink: {
    flexShrink: 0,
    height: '100%',
    textDecoration: 'none',
    '&:hover': {
      borderBottom: `3px solid ${theme.palette.primary.main}`
    }
  },

  toolbarLinkActive: {
    flexShrink: 0,
    height: '100%',
    textDecoration: 'none',
    borderBottom: `3px solid ${theme.palette.primary.main}`
  }
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

  const classes = useStyles()

  const isActive = (value) =>
    (window.location && window.location.pathname === value ? classes.toolbarLinkActive : classes.toolbarLink)

  return (
    <React.Fragment >
      <AppBar position="static" color="primary">
        <Toolbar className={classes.toolbar}>
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

          <Search collapse indices={searchIndices} />

        </Toolbar>
      </AppBar>
      <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
        {sections.map(section => (
          <Link
            key={section.display}
            to={section.path}
            className={isActive(section.path)}
          >
            <Typography
              variant="h5"
              align="center"
              noWrap
              className={classes.toolbarTitle}
            >
              {section.display}
            </Typography>
          </Link>
        ))}
      </Toolbar>
    </React.Fragment>
  )
}
