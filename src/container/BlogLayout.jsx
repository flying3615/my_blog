import React from 'react'
import { Helmet } from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from './Layout';
import { Disqus, CommentCount } from 'gatsby-plugin-disqus'
import Paper from '@material-ui/core/Paper'
import Chip from '@material-ui/core/Chip'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import BlogCard from '../components/BlogCard'
import ArrowBack from '@material-ui/icons/ArrowBack'
import ArrowForward from '@material-ui/icons/ArrowForward'

const useStyles = makeStyles(theme => ({
  blogPaper: {
    padding: theme.spacing(5),
    backgroundColor: theme.palette.background.blog
  },
  blogCardGroup: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5)
  },
  navLink: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline'
    }
  },
  chip: {
    margin: theme.spacing(1)
  }
}))

export default function Template ({ data, pageContext }) {
  const classes = useStyles()

  const { prev, next, tags, recommend } = pageContext

  const { markdownRemark: post } = data

  const disqusConfig = {
    identifier: post.id,
    title: post.title
  }

  return (
    <Layout className="blog-post-container" showFooter={false}>
      <Helmet title={`Yufei's Blog - ${post.frontmatter.title}`} />
      <CommentCount config={disqusConfig} placeholder={''} />

      <Grid container spacing={6}>

        <Grid item xs={12}>
          <Typography align="center" Typography variant="h3" gutterBottom>{post.frontmatter.title}</Typography>

          {tags.map(t => (
            <Chip label={t} className={classes.chip} clickable component="a" href={`/tags/${t}`} />
          ))}

          <Typography align="center" Typography variant="h6" gutterBottom>{post.timeToRead} mins to read</Typography>
          <Paper className={classes.blogPaper} dangerouslySetInnerHTML={{ __html: post.html }} />
        </Grid>

        <Grid item xs={12}>

          <Grid container justify="space-around">
            {prev &&
                      <Link to={prev.frontmatter.path} className={classes.navLink}>
                        <ArrowBack/> <Typography variant="button">Prev Post</Typography>
                      </Link>
            }
            {next &&
                      <Link to={next.frontmatter.path} className={classes.navLink}>
                        <Typography variant="button">Next Post</Typography> <ArrowForward/>
                      </Link>
            }
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Grid container justify="space-around">
            {recommend && recommend.filter(rp => rp.frontmatter.title !== post.frontmatter.title)
              .map((post, index) => (
                <Grid item key={index}>
                  <BlogCard post={post} />
                </Grid>
              ))}
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Disqus config={disqusConfig} />
        </Grid>

      </Grid>
    </Layout>
  )
}

export const pageQuery = graphql`
  query BlogPostByPath($pathSlug: String!) {
    markdownRemark(frontmatter: { path: { eq: $pathSlug } }) {
      html
      timeToRead
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
      }
    }
  }
`
