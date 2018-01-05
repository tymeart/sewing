import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import Media from 'react-media'

import './index.scss'
import '../styles/layout-overide.scss'

const Header = () => (
  <div
    style={{
      background: '#f5f5f5',
      marginBottom: '1rem',
      borderBottom: '2px solid #e6e6e6',
    }}
  >
    <div
      style={{
        margin: '0 auto',
        maxWidth: 980,
        padding: '1.45rem 1.0875rem',
      }}
   >
     <h1 style={{margin: 0, textAlign: 'center'}}>
        <Link to="/"
          style={{
            color: 'black'
          }}
        >
          Sewing Adventures
        </Link>
      </h1>
    </div>
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
      <p>{props.description}</p>
    </div>
);

const TemplateWrapper = ({ children }) => (
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
              </div>
            </div>
          )
        }
      </Media>
    </div>
  </div>
);

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper
