import React from 'react'
import { Container } from '@material-ui/core'
import { makeStyles, MuiThemeProvider } from '@material-ui/core/styles'
import Footer from '../components/Footer'
import Navigator from '../components/Nav'
import theme from '../theme'
import Search from '../components/search'
import CssBaseline from '@material-ui/core/CssBaseline'

const searchIndices = [
  { name: `Posts`, title: `Blog Posts`, hitComp: `PostHit` }
]

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh'
  },
  main: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  footer: {
    padding: theme.spacing(2),
    marginTop: 'auto',
    borderTop: '1px solid rgba(7,94,115,0.3)'
  }
}))

export default ({ children, showFooter = true }) => {
  const classes = useStyles()

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <header>
        <Navigator />
        <Search collapse indices={searchIndices} />
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
