// run `gatsby build` to rebuild the index in algolia
const postQuery = `{
  posts: allMarkdownRemark {
    edges {
      node {
        objectID: id
        frontmatter {
          title
          path
          date(formatString: "DD MMMM, YYYY")
          tags
        }
        excerpt(pruneLength: 5000)
      }
    }
  }
}`

const flatten = arr =>
  arr.map(({ node: { frontmatter, ...rest } }) => ({
    ...frontmatter,
    ...rest
  }))
const settings = { attributesToSnippet: [`excerpt:20`] }

const queries = [
  {
    query: postQuery,
    transformer: ({ data }) => flatten(data.posts.edges),
    indexName: `Posts`,
    settings
  }
]

module.exports = queries
