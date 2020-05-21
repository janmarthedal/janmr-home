import React from "react"
import { graphql, Link } from "gatsby"

import BlogPage from "../components/blog-page"

export default function Template({
  data, // this prop will be injected by the GraphQL query below
  pageContext
}) {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark
  const { prev, next } = pageContext

  return (
    <BlogPage>
      <h2>
        { frontmatter.title }<br/>
        <small><time dateTime={ frontmatter.isoDate }>{ frontmatter.date }</time></small>
      </h2>
      <div className="post-tags">
        { frontmatter.tags.map(tag => <Link key={ tag } className="label" to={ `/blog/tags/${tag}` }>{ tag }</Link>) }
      </div>
      <div className="post-body" dangerouslySetInnerHTML={{ __html: html }} />
      <div className="post-note">
        A comment system is not enabled for this site, but feel free to leave
        a question, correction or any comment by using the <Link to="/blog/contact">contact page</Link>.
      </div>
      <div className="page-navigation">
        <div className="prev-post">
          { prev && <Link to={ prev.frontmatter.path } title={ "Previous post: " + prev.frontmatter.title }>&laquo; { prev.frontmatter.title }</Link> }
        </div>
        <div className="next-post">
          { next && <Link to={ next.frontmatter.path } title={ "Next post: " + next.frontmatter.title }>{ next.frontmatter.title } &raquo;</Link> }
        </div>
      </div>
    </BlogPage>
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        isoDate: date(formatString: "YYYY-MM-DD")
        path
        title
        tags
      }
    }
  }
`