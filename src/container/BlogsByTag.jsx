import React from 'react'
import { Link } from 'gatsby'
import Layout from '../container/Layout'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import { Container, Avatar } from '@material-ui/core'
import Chip from '@material-ui/core/Chip'
import BlogList from '../components/BlogList'

const useStyles = makeStyles(theme => ({

	cardAction: {
		padding: 20,
		'&:hover': {
			transform: 'translateY(-0.25rem);',
			boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
			backgroundColor: 'white'
		}
	},

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

export default function BlogsByTag ({ pageContext }) {

	const classes = useStyles()

	const {posts, tagName} = pageContext

	return (
		<Layout className="blog-post-container">
			<Chip label={tagName} className={classes.chip} component="a"  />
			<BlogList posts={posts}/>
		</Layout>
	)
}
