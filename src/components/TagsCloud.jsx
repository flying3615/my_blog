import TagCloud from 'react-tag-cloud';
import randomColor from 'randomcolor';
import React from 'react'
import { Link } from 'gatsby'

export default function BlogsByTag({tags}) {

		return (
			<TagCloud
				style={{
					fontFamily: 'sans-serif',
					fontSize: 30,
					fontWeight: 'bold',
					fontStyle: 'italic',
					color: () => randomColor(),
					padding: 5,
					width: '100%',
					height: '100%'
				}}>
				{tags.map(tag=>(<Link to={`/tags/${tag}`}>{tag}</Link>))}
			</TagCloud>
		)
}