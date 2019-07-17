/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import Layout from '../container/Layout'
import { useStaticQuery, graphql } from 'gatsby'
import BlogList from '../components/BlogList'
import * as JsSearch from 'js-search'

export default function BlogSearch () {
  const [data, setData] = useState({
    searchResults: [],
    searchQuery: ''
  })

  // Should be moved to gatsby-node to get all data ???
  const result = useStaticQuery(
    graphql`
      query BlogSearch {
          allMarkdownRemark {
              edges {
                  node {
                      id
                      frontmatter {
                        title
                        path
                        date(formatString: "DD MMMM, YYYY")
                        img
                      }
                      partExcept: excerpt(format: PLAIN, pruneLength: 250)
                      fullText: rawMarkdownBody
                  }
              }
          }
      }
  `
  )

  const blogList = result.allMarkdownRemark.edges.map(({ node }) =>
    ({
      title: node.frontmatter.title,
      path: node.frontmatter.path,
      img: node.frontmatter.img,
      id: node.id,
      fullText: node.fullText,
      excerpt: node.partExcept,
      date: node.frontmatter.date
    })
  )

  const dataToSearch = new JsSearch.Search('id')

  dataToSearch.indexStrategy = new JsSearch.PrefixIndexStrategy()
  dataToSearch.sanitizer = new JsSearch.LowerCaseSanitizer()
  dataToSearch.searchIndex = new JsSearch.TfIdfSearchIndex('id')

  dataToSearch.addIndex('title') // can search by title
  dataToSearch.addIndex('fullText') // can search by full text

  dataToSearch.addDocuments(blogList) // adds the data to be searched

  useEffect(() => {
    // do search here...
    const urlParams = new URLSearchParams(window.location.search)
    const query = urlParams.get('q')
    const queryResult = dataToSearch.search(query)
    console.log('use %s effect queryResult %o', query, queryResult)
    setData({ ...data, searchQuery: query, searchResults: queryResult })
  }, []) // do anything only one time if you pass empty array []

  return (
    <Layout className="blog-posts">
      <BlogList posts={data.searchResults}/>
    </Layout>
  )
}
