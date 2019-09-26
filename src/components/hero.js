import React from 'react'

import styles from './hero.module.css'

export default ({ data }) => (
  <div className={styles.hero}>
    <img className={styles.heroImage} alt={data.name} src="https://www.alsigl.org/wp-content/uploads/2018/05/Phonak.png" />
    <div className={styles.heroDetails}>
      <h3 className={styles.heroHeadline}>Nettbutikk</h3>
    </div>
  </div>
)
