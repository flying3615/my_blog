const path = require("path")

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  const blogPostTemplate = path.resolve(`src/container/BlogLayout.jsx`)

  return graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            excerpt(pruneLength: 50)
            frontmatter {
              title
              path
              tags
              img
            }
          }
        }
      }
    }
  `
  ).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }

    const posts = result.data.allMarkdownRemark.edges

    let postsByTag = {}

    posts.forEach(({ node }) => {
      if (node.frontmatter.tags) {
        node.frontmatter.tags.forEach(tag => {
          if (!postsByTag[tag]) {
            postsByTag[tag] = []
          }
          postsByTag[tag].push(node)
        })
      }
    })

    const tags = Object.keys(postsByTag)

    posts.forEach(({ node }, index) => {

      createPage({
        path: node.frontmatter.path,
        component: blogPostTemplate,
        context: {
          prev: index === 0 ? null : posts[index - 1].node,
          next: index === (posts.length - 1) ? null : posts[index + 1].node,
          tags: tags.sort(),
          recommend: postsByTag[node.frontmatter.tags[0]]
        },
      })
    })

    //create tags
    // tags.forEach(tagName => {

    //   const posts = postsByTag[tagName]

    //   createPage({
    //     path: `/tags/${tagName}`,
    //     component: singleTagIndexTemplate,
    //     context: {
    //       posts,
    //       tagName
    //     }
    //   })
    // })


  })
}