import React from 'react';
import { Box, Paper } from '@material-ui/core';
import Layout from '../container/Layout'
import { graphql} from 'gatsby'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  blogPaper: {
    padding: theme.spacing(5),
    backgroundColor: theme.palette.background.blog
  }
}))

export default function About ({ data }) {
  const { markdownRemark } = data

  const classes = useStyles()

  return (
    <Layout>
      <Box my={4}>
        <Paper className={classes.blogPaper} dangerouslySetInnerHTML={{ __html: markdownRemark.html }} />
      </Box>
    </Layout>
  )
}

export const pageQuery = graphql`
   query BlogPostByTitle($title: String!) {
    markdownRemark(frontmatter: { title: { eq: $title } }) {
      html
      frontmatter {
        path
        title
      }
    }
  }
`
