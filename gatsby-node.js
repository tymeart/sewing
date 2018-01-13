/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

 // You can delete this file if you're not using it

 const path = require('path');

 const createTagPages = (createPage, edges) => {
   const tagTemplate = path.resolve(`src/templates/tags.js`);
   const posts = {};

   // go through each markdown post and add the tags to the posts object
   edges.forEach(({node}) => {
     if (node.frontmatter.tags) {
       node.frontmatter.tags.forEach(tag => {
         if (!posts[tag]) {
           posts[tag] = [];
         }
         posts[tag].push(node);
       });
     }
   });

   // create page with list of tags
   createPage({
     path: '/tags',
     component: tagTemplate,
     context: {
       posts
     }
   });

   // create a page for each tag in the post object
   Object.keys(posts).forEach(tagName => {
     const post = posts[tagName];
     createPage({
       path: `/tags/${tagName}`,
       component: tagTemplate,
       context: {
         posts,
         post,
         tag: tagName
       }
     });
   });
 }

 exports.createPages = ({boundActionCreators, graphql}) => {
   const { createPage } = boundActionCreators;

   const postTemplate = path.resolve('src/templates/post.js');

   return graphql(`{
     allMarkdownRemark(
       sort: { order: DESC, fields: [frontmatter___date] }
       limit: 1000
     ) {
       edges {
         node {
           excerpt(pruneLength: 250)
           html
           id
           frontmatter {
             date
             path
             title
             tags
           }
         }
       }
     }
   }`)
   .then(res => {
     if (res.errors) {
       return Promise.reject(res.errors);
     }
     const posts = res.data.allMarkdownRemark.edges;
     createTagPages(createPage, posts);

     // create pages from markdown posts
     posts.forEach(({node}) => {
       createPage({
         path: node.frontmatter.path,
         component: postTemplate
       });
     });
   });
 }
