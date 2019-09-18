import React from 'react'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import get from 'lodash/get'
import Img from 'gatsby-image'

import styles from './navigation.module.css'
import CategoryNav from './category-nav'


export default ({data}) => {
  return (
      <nav role="navigation">
        <ul className={styles.navigation}>
          <li className={styles.navigationItem}>
            <Link to="/">Home</Link>
          </li>
          
          <li className={styles.navigationItem}>
            <Link to="/blog/">Blog</Link>
          </li>
        </ul>
      </nav>
  )
}


export const pageQuery = graphql`
  query NavigationQuery {
    allContentfulCategory {
      edges {
        node {
          title
          slug
        }
      }
    }
  }
`
