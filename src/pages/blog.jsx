import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../container/Layout';
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import { Container, Avatar } from '@material-ui/core';

import BlogList from '../components/BlogList'

const CV_ID = 'aeaf945b-5920-56c1-aeed-b159fee72e18'

export default function Blog ({ data }) {
  const blogList = data.allMarkdownRemark.edges.map(({ node }) =>
    ({
      title: node.frontmatter.title,
      path: node.frontmatter.path,
      img: node.frontmatter.img,
      id: node.id,
      excerpt: node.excerpt,
      date: node.frontmatter.date
    })
  )

  return (
    <Layout className="blog-posts">
      <BlogList posts={blogList}/>
    </Layout>
  )
}

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }, filter: {id: {ne: ${CV_ID}}}) {
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
