/* eslint-disable no-unused-vars */
import React from 'react'
import {Link, graphql} from 'gatsby'
import Layout from '../container/Layout'
import TagsCloud from '../components/TagsCloud'
import BlogList from '../components/BlogList'
import Grid from '@material-ui/core/Grid'

export default function Blog({data}) {
	const blogList = data.allMarkdownRemark.edges.map(({node}) =>
		({
			title: node.frontmatter.title,
			path: node.frontmatter.path,
			img: node.frontmatter.img,
			id: node.id,
			excerpt: node.excerpt,
			date: node.frontmatter.date
		})
	)

	//TODO pass tags in

	return (
		<Layout className="blog-posts">
			<Grid container spacing={6}>
				<Grid item xs={9}>
					<BlogList posts={blogList}/>
				</Grid>

				<Grid item xs={3}>
					<TagsCloud tags={['aaa','bbb','ccc','ddd']}/>
				</Grid>
			</Grid>
		</Layout>
	)
}

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }, filter: {id: {ne: "aeaf945b-5920-56c1-aeed-b159fee72e18"}}) {
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
