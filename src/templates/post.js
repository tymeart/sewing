import React from 'react';
import Helmet from 'react-helmet';

import '../styles/post.scss';

export default function Template({data}) {
  const { markdownRemark: post } = data;
  // const post = data.markdownRemark;
  return (
    <div className="blog-post-container">
      <Helmet title={`${post.frontmatter.title} | Tiffany Lam`} />
      <div className="blog-post">
        <h1>{post.frontmatter.title}</h1>
        <h2>{post.frontmatter.date}</h2>
        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{__html: post.html}}
        />
        <p className="blog-post-tags">
          {post.frontmatter.tags && post.frontmatter.tags.join(', ')}
        </p>
      </div>
    </div>
  );
}

export const postQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
        tags
      }
    }
  }
`;
