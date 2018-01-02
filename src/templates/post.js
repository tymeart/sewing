import React from 'react';
import Helmet from 'react-helmet';

export default function Template({data}) {
  const { markdownRemark: post } = data;
  // const post = data.markdownRemark;
  return (
    <div className="blog-post-container">
      <Helmet title={`${post.frontmatter.title} | Tiffany Lam`} />
      <div className="blog-post">
        <h1>{post.frontmatter.title}</h1>
        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{__html: post.html}}
        />
      </div>
    </div>
  );
}

export const postQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        title
      }
    }
  }
`
