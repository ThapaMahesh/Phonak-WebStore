import React from 'react'
import Link from 'gatsby-link'
import styles from './article-preview.module.css'


export default ({ product }) => (

  <div className={styles.preview}>  
      <img className={styles.prodImg} src={product.picture}/>
      <Link to={`${product.slug}`}>{product.name}</Link>
      <p>{product.price}kr</p>   
  </div>
)


