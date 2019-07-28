/* eslint-disable no-unused-vars */
import React from 'react'
import {Link, graphql} from 'gatsby'
import Layout from '../container/Layout'
import TagsCloud from '../components/TagsCloud'
import BlogList from '../components/BlogList'
import Grid from '@material-ui/core/Grid'

export default function Blog({pageContext}) {
	const {posts, tags} = pageContext

	const blogList = posts.map(({node}) =>
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
			<Grid container spacing={6}>
				<Grid item xs={9}>
					<BlogList posts={blogList}/>
				</Grid>

				<Grid item xs={3}>
					<TagsCloud tags={tags}/>
				</Grid>
			</Grid>
		</Layout>
	)
}

