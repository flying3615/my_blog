const path = require('path')

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  const aboutTemplate = path.resolve(`src/template/about.jsx`)
  // create about page
  createPage({
    path: '/about',
    component: aboutTemplate,
    context: {
      title: 'resume' // will be used as a graphql query variable in the component page
    }
  })

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

    const postsByTag = {}

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
    const blogPostTemplate = path.resolve(`src/container/BlogLayout.jsx`)

    posts.filter(({ node }) => node.frontmatter.path)
      .forEach(({ node }, index) => {
        createPage({
          path: node.frontmatter.path,
          component: blogPostTemplate,
          context: {
            pathSlug: node.frontmatter.path,
            prev: index === 0 ? null : posts[index - 1].node,
            next: index === (posts.length - 1) ? null : posts[index + 1].node,
            tags: tags.sort(),
            recommend: postsByTag[node.frontmatter.tags[0]]
          }
        })
      })

    // create tags
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
