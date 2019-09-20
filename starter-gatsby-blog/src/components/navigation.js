import React from 'react'
import Link from 'gatsby-link'
import styles from './navigation.module.css'
import CategoryNav from './category-nav'
import { sum } from '../pages/basket'


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
            <Link to="/checkout/">kr <span>{sum}</span></Link> 
          </li>
        </ul>
      </nav>
  )
}

