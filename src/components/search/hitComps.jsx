import React, {Fragment} from 'react'
import {Highlight, Snippet} from 'react-instantsearch-dom'
import {Link} from 'gatsby'
import {Calendar} from 'styled-icons/octicons/Calendar'
import {Tags} from 'styled-icons/fa-solid/Tags'
import {fade, makeStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
	record: {
		'&:hover': {
			backgroundColor: fade(theme.palette.primary.light, 0.25)
		},
	},
	hitLink: {
		textDecoration: 'none'
	}
}))

// clickHandler is setFocus(false) to close the result list and return a component
export const PostHit = clickHandler => ({hit}) => {
	const classes = useStyles()
	return (
		<div className={classes.record}>
			<Link to={hit.path} onClick={clickHandler} className={classes.hitLink}>
				<Typography variant="display" component="h4">
					<Highlight attribute="title" hit={hit} tagName="mark"/>
				</Typography>
				<div>
					<Calendar size="1em"/>
					&nbsp;
					<Highlight attribute="date" hit={hit} tagName="mark"/>
					&emsp;
					<Tags size="1em"/>
					&nbsp;
					{hit.tags.map((tag, index) => (
						<Fragment key={tag}>
							{index > 0 && `, `}
							{tag}
						</Fragment>
					))}
				</div>
				<Snippet attribute="excerpt" hit={hit} tagName="mark"/>
			</Link>
		</div>

	)
}

// can export more things here
// export const PageHit = clickHandler => ({ hit }) => ()
