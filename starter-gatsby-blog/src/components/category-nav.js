import React from 'react'
import Link from 'gatsby-link'
import styles from './navigation.module.css'

export default ({category}) => (
      <li className={styles.navigationItem}>
        <Link to="/{category.slug}/">{category.title}</Link>
      </li>
)
