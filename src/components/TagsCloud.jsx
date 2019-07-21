import TagCloud from 'react-tag-cloud';
import randomColor from 'randomcolor';
import React from 'react'

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
				{tags.map(tag=>(<div>{tag}</div>))}
			</TagCloud>
		)
}