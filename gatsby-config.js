module.exports = {
  siteMetadata: {
    title: `Sewing Adventures | Tiffany Lam`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages'
      }
    },
    `gatsby-transformer-remark`
  ],
  pathPrefix: `/sewing`
}
