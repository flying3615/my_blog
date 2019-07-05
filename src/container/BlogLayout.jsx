import React from "react"
import { Helmet } from "react-helmet"
import { graphql } from "gatsby"
import Layout from "./Layout";
import { Disqus, CommentCount } from 'gatsby-plugin-disqus'

// import '../css/blog-post.css';

export default function Template({ data }) {
    const { markdownRemark: post } = data
    const disqusConfig = {
        identifier: post.id,
        title: post.title,
    }

    return (
        <Layout className="blog-post-container" showFooter={false}>
            <Helmet title={`Yufei's Blog - ${post.frontmatter.title}`} />
            <CommentCount config={disqusConfig} placeholder={'placeholder'} />
            <div className="blog-post">
                <h1>{post.frontmatter.title}</h1>
                <div
                    className="blog-post-content"
                    dangerouslySetInnerHTML={{ __html: post.html }}
                />
            </div>
            <Disqus config={disqusConfig} />
        </Layout>
    )
}

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
      }
    }
  }
`