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
              <div className={styles.sProdContainer}>
                <h3>{product.name}</h3>
              </div>
                  <div className={styles.variationDiv}>
                        <p>Velg farge:</p>
                        <select>
                                  <option value="">Hvit</option>
                                  <option value="Orange">Oransje</option>
                                  <option value="Blue">Blå</option>
                                  <option value="Green">Grønn</option>
                                  <option value="Pink">Rosa</option>
                                  <option value="Purple">Lilla</option>
                                  <option value="Yellow">Gul</option>
                        </select>
                  </div>
                  <div className={styles.variationDiv}>
                      <p>Velg type:</p>
                      <select>
                                <option value="HE 7">HE 7</option>
                                <option value="HE 7 680">HE 7 680</option>
                      </select>
                  </div>
                  <div className={styles.variationDiv}>
                      <p>Velg størrelse:</p>
                      <select>
                                <option value="Small">Small</option>
                                <option value="Medium">Medium</option>
                                <option value="Large">Large</option>
                      </select>
                  </div>
                {product.variant.map(trick => (
                      <div>
                        {/*  <p key={trick.slug}>{trick.code}</p>
                          {trick.type.name} */}
                      </div>
                      ))}
            <div className={styles.checkoutDiv}>
              <button type="button" className={styles.button}>Add to Cart</button> 
              <p>{product.price} Kr</p> 
              <input className={styles.quantity}
                id="add-to-bag-quantity"
                type="number"
                value="1"
                class="clayer-add-to-bag-quantity"
              />
            </div>
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
