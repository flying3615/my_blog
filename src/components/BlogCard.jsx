import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({

  cardAction: {
    '&:hover': {
      transform: 'translateY(-0.25rem);',
      boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
      backgroundColor: 'white'
    }
  },
  card: {
    maxWidth: 350,
    display: 'flex',
    backgroundColor: theme.palette.background.blog
  },
  cardDetails: {
    flex: 1
  },
  cardMedia: {
    width: 100
  }
}))

export default function BlogCard ({ post }) {
  const classes = useStyles()

  return (
    <CardActionArea href={post.frontmatter.path} className={classes.cardAction}>
      <Card className={classes.card}>
        <CardMedia
          className={classes.cardMedia}
          image={post.frontmatter.img}
          title={post.frontmatter.title}
        />
        <CardContent className={classes.cardDetails}>
          <Typography gutterBottom variant="h5" component="h2">
            {post.frontmatter.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {post.excerpt}
          </Typography>
          <Typography variant="subtitle1" color="primary">
                        Continue reading...
          </Typography>
        </CardContent>
      </Card>
    </CardActionArea>

  )
}
