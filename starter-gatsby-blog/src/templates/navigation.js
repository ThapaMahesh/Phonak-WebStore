import React from 'react'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import get from 'lodash/get'
import Img from 'gatsby-image'

import styles from '../components/navigation.module.css'
import CategoryNav from '../components/category-nav'

class NavigationTemplate extends React.Component {
  render() {
    const posts = get(this, 'props.data.allContentfulCategory.edges')

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
}

export default NavigationTemplate

export const pageQuery = graphql`
  query CategoryQuery {
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
