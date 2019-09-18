import React from 'react'
import Helmet from 'react-helmet'
import get from 'lodash/get'
import ProductPreview from '../components/product-preview'
import styles from '../components/article-preview.module.css'

class CategoryTemplate extends React.Component {
  render() {
    const post = get(this.props, 'data.contentfulCategory')
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')

    return (
      <div style={{ background: '#fff' }}>
        <Helmet title={`${post.title} | ${siteTitle}`} />
        <div className={styles.hero}>
          {post.title}
        </div>
        <div className={styles.productDiv}>
            {post.productsList.map(trick => (
                  <ProductPreview key={trick.slug} product={trick} />
                  ))}
        </div>
      </div>
    )
  }
}

export default CategoryTemplate

export const pageQuery = graphql`
  query CategoryBySlug($slug: String!) {
    contentfulCategory(slug: { eq: $slug }) {
      title
      productsList {
        __typename
        ... on ContentfulProductsList {
          name
          slug
          price
          picture
        }
      }
    }
  }
`
