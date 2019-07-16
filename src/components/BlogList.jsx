import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../container/Layout'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import { Container, Avatar } from '@material-ui/core'
const useStyles = makeStyles({

  cardAction: {
    padding: 20,
    '&:hover': {
      transform: 'translateY(-0.25rem);',
      boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
      backgroundColor: 'white'
    }
  },
  card: {
    maxWidth: 350,
    display: 'flex'
  },
  cardDetails: {
    flex: 1
  },
  cardMedia: {
    width: 100
  },

  link: {
    textDecoration: 'none'
  },

  avatar: {
    margin: 10
  }
})
export default function BlogList ({ posts }) {
  const classes = useStyles()

  return (
    <Container maxWidth="md">
      <Grid container spacing={6}>
        {posts
          .filter(post => post.title.length > 0)
          .map((post) => {
            return (
              <Grid item xs={12} key={post.id}>
                <Paper href={post.path} className={classes.cardAction}>
                  <Link to={post.path} className={classes.link}>

                    <Grid container spacing={2}>
                      <Grid item>
                        <Typography gutterBottom variant="display" component="h2">
                          {post.title}
                        </Typography>
                      </Grid>

                      <Grid item>
                        <Typography variant="body1" color="textSecondary" component="p">
                          {post.excerpt}
                        </Typography>
                      </Grid>

                      <Grid item xs={12} style={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar src={post.img} className={classes.avatar} />
                        <Typography gutterBottom variant="subtitle1" color='textSecondary'>on {post.date}</Typography>
                      </Grid>
                      
                    </Grid>
                  </Link>
                </Paper>
              </Grid>
            )
          })}
      </Grid>
    </Container>
  )
}
