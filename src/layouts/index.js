import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import Media from 'react-media'
import Tags from '../components/tags'

import './index.scss'
import '../styles/layout-overide.scss'

const Header = () => (
  <div
    style={{
      background: '#759F75',
      marginBottom: '1rem',
    }}
  >
   <h1 style={{
     margin: '0 auto',
     textAlign: 'center',
     background: '#759F75',
     maxWidth: 980,
     padding: '4rem 1.0875rem',
   }}>
      <Link to="/"
        style={{
          color: 'white',
          fontSize: '1.5em',
          letterSpacing: '2px'
        }}
      >
        Sewing Adventures
      </Link>
    </h1>
  </div>
);

const Sidebar = (props) => (
  <div
    style={{
      border: '2px solid #e6e6e6',
      maxWidth: 960,
      padding: '0.5rem',
      marginBottom: '25px'
    }}
    >
      <h2 className="sidebar-title">{props.title}</h2>
      {props.description}
    </div>
);

const TemplateWrapper = ({ children, data }) => {
  const posts = data.allMarkdownRemark.edges;
  const tags = [];
  posts.forEach(({node}) => {
    if (node.frontmatter.tags) {
      node.frontmatter.tags.forEach(tag => {
        if (tags.indexOf(tag) === -1) {
          tags.push(tag);
        }
      });
    }
  });

  return (
  <div>
    <Helmet
      title="Sewing Adventures | Tiffany Lam"
      meta={[
        { name: 'description', content: 'Sample' },
        { name: 'keywords', content: 'sample, something' },
      ]}
    />
    <Header />
    <div
      style={{
        margin: '0 auto',
        maxWidth: 980,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: '100%'
      }}
    >
      <Media query={{ maxWidth: 848 }}>
        {matches =>
          matches ? (
            <div
              style={{
                margin: '0 auto',
                maxWidth: 980,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%',
                padding: '25px'
                }}
              >
                <div style={{ flex: 1 }}>
                  <Sidebar
                    title="About Me"
                    description="I'm Tiffany, and I'm learning to sew."
                  />
                </div>
                <div style={{ flex: 1 }}>{children()}</div>
                <Sidebar
                  title="Tags"
                  description={<Tags list={tags} className="sidebar-tags" />}
                />
            </div>
          ) : (
            <div
              style={{
                margin: '0 auto',
                maxWidth: 980,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                height: '100%',
                padding: '25px'
              }}
            >
              <div style={{ flex: 2.5, paddingRight: '30px' }}>
                {children()}
              </div>
              <div style={{ flex: 1 }}>
                <Sidebar
                  title="About Me"
                  description="I'm Tiffany, and I'm learning to sew."
                />
                <Sidebar
                  title="Tags"
                  description={<Tags list={tags} className="sidebar-tags" />}
                />
              </div>
            </div>
          )
        }
      </Media>
    </div>
  </div>
  );
};

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export const query = graphql`
  query TagsQuery {
    allMarkdownRemark {
      edges {
        node {
          frontmatter {
            tags
          }
        }
      }
    }
  }
`;

export default TemplateWrapper
