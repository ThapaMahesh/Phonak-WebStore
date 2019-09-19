import React from 'react'
import Helmet from 'react-helmet'
import get from 'lodash/get'
import Img from 'gatsby-image'

import heroStyles from '../components/hero.module.css'
import styles from '../components/article-preview.module.css'

class ProductTemplate extends React.Component {

  getVariant(product){
    let variantArray = []

    for (var i = 0; i < product.variant.length; i++) {
      variantArray.push({
        code: product.variant[i].code, 
        type: product.variant[i].type != null ? product.variant[i].type.name : "",
        size: product.variant[i].size != null ? product.variant[i].size.size : "",
        color: product.variant[i].productColour != null ? product.variant[i].productColour.colour : ""
      }) 
    }

    return variantArray
  }

  render() {
    const product = get(this.props, 'data.contentfulProductsList')
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')

    let types = new Set(product.variant.map(eachVariant => eachVariant.type != null ? eachVariant.type.name : ""))

    let sizes = new Set(product.variant.map(eachVariant => eachVariant.size != null ? eachVariant.size.size : ""))

    let color = new Set(product.variant.map(eachVariant => eachVariant.productColour != null ? eachVariant.productColour.colour : ""))

    let variants = this.getVariant(product)

    return (
      <div style={{ background: '#fff' }}>
        <Helmet title={`${product.name} | ${siteTitle}`} />

        <div className={styles.flexdiv}>
          <div className={styles.span6}>
            <img src={product.picture} />
          </div>
          <div className={styles.span4}>
            <h3>{product.name}</h3>
            <p>{product.price}Kr</p>
            {product.variant.map(trick => (
                  <div>
                    <p key={trick.slug}>{trick.code}</p>
                      {trick.type.name}
                  </div>
                  ))}
            <button type="button" className={styles.button}>Add to Cart</button>  
          </div>
        </div>
      </div>
    )
  }
}

export default ProductTemplate

export const pageQuery = graphql`
  query ProductBySlug($slug: String!) {
    contentfulProductsList(slug: { eq: $slug }) {
      name
      slug
      price
      picture
      variant {
        __typename
        ... on ContentfulVariant {
          code
          image
          size {
            __typename
            ... on ContentfulSize {
              size
            }
          }
          type {
            __typename
            ... on ContentfulTypes {
              name
            }
          }
          productColour {
            __typename
            ... on ContentfulProductColour {
              colour
            }
          }
        }
      }
    }
  }
`
