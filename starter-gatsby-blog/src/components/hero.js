import React from 'react'
import Helmet from 'react-helmet'
import styles from './hero.module.css'

export default ({ data }) => (
  <div className={styles.hero}>
    <Helmet title={`Hjem | Phonak`} />
    <img className={styles.heroImage} alt={data.name} src="https://www.alsigl.org/wp-content/uploads/2018/05/Phonak.png" />
    <div className={styles.heroDetails}>
      <h3 className={styles.heroHeadline}>Nettbutikk</h3>
    </div>
  </div>
)
