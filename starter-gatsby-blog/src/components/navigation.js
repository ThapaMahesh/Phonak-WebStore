import React from 'react'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import get from 'lodash/get'
import Img from 'gatsby-image'

import styles from './navigation.module.css'
import CategoryNav from './category-nav'


export default ({category}) => {

  return (
      <nav role="navigation">
        <ul className={styles.navigation}>
          <li className={styles.navigationItem}>
            <Link to="/">Hjem</Link>
          </li>
          {category.map(({ node }) => {
              return (
                  <CategoryNav key={node.slug} category={node} />
              )
            })}
          <li className={styles.navigationItem}>
          <img className={styles.checkoutLogo} alt="" src="https://icons-for-free.com/iconfiles/png/512/buy+cart+checkout+ecommerce+retail+shopping+icon-1320086032792426891.png" />
            <Link to="/blog/">kr_00.00</Link> 
          </li>
        </ul>
      </nav>
  )
}

