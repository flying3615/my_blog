import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../container/Layout";
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Container, Avatar } from "@material-ui/core";

const useStyles = makeStyles({

  cardAction: {
    padding: 20,
    "&:hover": {
      transform: 'translateY(-0.25rem);',
      boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
      backgroundColor: 'white'
    }
  },
  card: {
    maxWidth: 350,
    display: 'flex',
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 100,
  },

  link: {
    textDecoration: 'none',
  },

  avatar: {
    margin: 10
  }
});

export default function Index({ data }) {
  const { edges: posts } = data.allMarkdownRemark

  const classes = useStyles();
  return (
    <Layout className="blog-posts">
      <Container maxWidth="md">
        <Grid container spacing={6}>
          {posts
            .filter(post => post.node.frontmatter.title.length > 0)
            .map(({ node: post }) => {
              return (
                <Grid item xs={12} key={post.id}>
                  <Paper href={post.frontmatter.path} className="blog-post-preview" className={classes.cardAction}>
                    <Link to={post.frontmatter.path} className={classes.link}>

                      <Grid container spacing={2}>
                        <Grid item>
                          <Typography gutterBottom variant="display" component="h2">
                            {post.frontmatter.title}
                          </Typography>
                        </Grid>

                        <Grid item>
                          <Typography variant="body1" color="textSecondary" component="p">
                            {post.excerpt}
                          </Typography>
                        </Grid>

                        <Grid item xs={12} style={{display:'flex', alignItems:'center'}}>
                          <Avatar src={post.frontmatter.img} className={classes.avatar} />

                          <Typography gutterBottom variant="subtitle1" color='textSecondary'>on {post.frontmatter.date}</Typography>
                        </Grid>

                      </Grid>
                    </Link>
                  </Paper>
                </Grid>
              )
            })}
        </Grid>
      </Container>
    </Layout>
  )
}

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          excerpt(pruneLength: 250)
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
            path
            img
          }
        }
      }
    }
  }
`