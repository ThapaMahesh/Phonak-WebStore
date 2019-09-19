import React from 'react'
import Helmet from 'react-helmet'
import get from 'lodash/get'
import Img from 'gatsby-image'
import * as CLayer from 'commercelayer-react'

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

  distinct(value, index, self){
    return self.indexOf(value) === index
  }

  render() {
    const product = get(this.props, 'data.contentfulProductsList')
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')

    let types = product.variant.map(eachVariant => eachVariant.type != null ? eachVariant.type.name : "").filter(this.distinct)

    let sizes = product.variant.map(eachVariant => eachVariant.size != null ? eachVariant.size.size : "").filter(this.distinct)

    let color = product.variant.map(eachVariant => eachVariant.productColour != null ? eachVariant.productColour.colour : "").filter(this.distinct)

    let variants = this.getVariant(product)

    console.log(color)
    window.onload = function(){
      if(sizes.length === 1 && sizes[0] === ""){
        document.getElementById("select-size").style.display = "none"
      }

      if(types.length === 1 && types[0] === ""){
        document.getElementById("select-type").style.display = "none"
      }

      if(color.length === 1 && color[0] === ""){
        document.getElementById("select-color").style.display = "none"
      }
    }

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
                <CLayer.Price skuCode="Hook HE 7"/>
              </div>
                  <div id="select-color" className={styles.variationDiv}>
                        <p>Velg farge:</p>
                        <select>
                            { color.map(function(eachColor, index){ 
                                return <option key={index}>{eachColor}</option>
                              })
                            }
                        </select>
                  </div>
                  <div id="select-type" className={styles.variationDiv}>
                      <p>Velg type:</p>
                      <select>
                          { types.map(function(eachType, index){ 
                                return <option key={index}>{eachType}</option>
                              })
                            }
                      </select>
                  </div>
                  <div id="select-size" className={styles.variationDiv}>
                      <p>Velg størrelse:</p>
                      <select>
                          { sizes.map(function(eachSize, index){ 
                                return <option key={index}>{eachSize}</option>
                              })
                            }
                      </select>
                  </div>
            <div className={styles.checkoutDiv}>
              <button type="button" className={styles.button}>Add to Cart</button> 
              <p>{product.price} Kr</p> 
              <input className={styles.quantity}
                id="add-to-bag-quantity"
                type="number"
                value="1"
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
