import React, { useState } from 'react'
import * as JsSearch from 'js-search'
import { useStaticQuery, graphql } from 'gatsby'

const BlogSearcher = () => {
  const [data, setData] = useState({
    blogList: [],
    search: undefined,
    searchResults: [],
    isLoading: true,
    isError: false,
    searchQuery: ''
  })

  if (!data.search) {
    // Should be moved to gatsby-node to get all data ???
    const result = useStaticQuery(
      graphql`
            query BlogTitle {
                allMarkdownRemark {
                    edges {
                        node {
                            id
                            frontmatter {
                                title
                            }
                            partExcept: excerpt(format: PLAIN, pruneLength: 250)
                            fullText: excerpt(format: PLAIN, pruneLength: 10000)
                        }
                    }
                }
            }
        `
    )

    const blogList = result.allMarkdownRemark.edges.map(({ node }) =>
      ({ title: node.frontmatter.title, path: node.frontmatter.path, img: node.frontmatter.img, id: node.id, fullText: node.fullText, excerpt: node.partExcept })
    )

    const dataToSearch = new JsSearch.Search('id')

    dataToSearch.indexStrategy = new JsSearch.PrefixIndexStrategy()

    dataToSearch.sanitizer = new JsSearch.LowerCaseSanitizer()

    dataToSearch.searchIndex = new JsSearch.TfIdfSearchIndex('id')

    dataToSearch.addIndex('title') // can search by title
    dataToSearch.addIndex('fullText') // can search by full text

    dataToSearch.addDocuments(blogList) // adds the data to be searched

    setData({ ...data, search: dataToSearch, isLoading: false, blogList })
  }

  const searchData = e => {
    const { search } = data
    const queryResult = search.search(e.target.value) // do search here...
    setData({ ...data, searchQuery: e.target.value, searchResults: queryResult })
  }

  const handleSubmit = e => {
    e.preventDefault()
  }

  const queryResults = !data.searchQuery ? data.blogList : data.searchResults

  return (
    <div>
      <div style={{ margin: '0 auto' }}>
        <form onSubmit={handleSubmit}>
          <div style={{ margin: '0 auto' }}>
            <label htmlFor="Search" style={{ paddingRight: '10px' }}>
                Enter your search here
            </label>
            <input
              id="Search"
              value={data.searchQuery}
              onChange={searchData}
              placeholder="Enter your search here"
              style={{ margin: '0 auto', width: '400px' }}
            />
          </div>
        </form>
        <div>
            Number of items:
          {queryResults.length}
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              borderRadius: '4px',
              border: '1px solid #d3d3d3'
            }}
          >
            <thead style={{ border: '1px solid #808080' }}>
              <tr>
                <th
                  style={{
                    textAlign: 'left',
                    padding: '5px',
                    fontSize: '14px',
                    fontWeight: 600,
                    borderBottom: '2px solid #d3d3d3',
                    cursor: 'pointer'
                  }}
                >
                Blog ID
                </th>
                <th
                  style={{
                    textAlign: 'left',
                    padding: '5px',
                    fontSize: '14px',
                    fontWeight: 600,
                    borderBottom: '2px solid #d3d3d3',
                    cursor: 'pointer'
                  }}
                >
                Blog Title
                </th>

              </tr>
            </thead>
            <tbody>
              {queryResults.map(item => {
                return (
                  <tr key={`row_${item.id}`}>
                    <td
                      style={{
                        fontSize: '14px',
                        border: '1px solid #d3d3d3'
                      }}
                    >
                      {item.id}
                    </td>
                    <td
                      style={{
                        fontSize: '14px',
                        border: '1px solid #d3d3d3'
                      }}
                    >
                      {item.title}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default BlogSearcher
