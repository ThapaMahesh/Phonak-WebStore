import React from 'react'
import Helmet from 'react-helmet'
import get from 'lodash/get'
import Img from 'gatsby-image'
import * as CLayer from 'commercelayer-react'

import heroStyles from '../components/hero.module.css'
import styles from '../components/article-preview.module.css'
import { Link } from 'react-router-dom'
import {basket} from '../pages/basket'

import VariantTypes from '../components/variant-types'

class ProductTemplate extends React.Component {
  
  constructor(props){
    super(props)


    this.product = get(props, 'data.contentfulProductsList')
    this.siteTitle = get(props, 'data.site.siteMetadata.title')

    this.types = this.product.variant.map(eachVariant => eachVariant.type != null ? eachVariant.type.name : null).filter(this.distinct).filter(Boolean)

    this.sizes = this.product.variant.map(eachVariant => eachVariant.size != null ? eachVariant.size.size : null).filter(this.distinct).filter(Boolean)

    this.color = this.product.variant.map(eachVariant => eachVariant.productColour != null ? eachVariant.productColour.colour : null).filter(this.distinct).filter(Boolean)

    this.variants = this.getVariant(this.product)

    this.currentVariant = this.getCode(this.variants, this.types[0], this.sizes[0], this.color[0])

    this.state = {
      code: this.currentVariant.code
    }
  }

  getVariant(product){
    let variantArray = []

    for (var i = 0; i < product.variant.length; i++) {
      variantArray.push({
        code: product.variant[i].code, 
        type: product.variant[i].type != null ? product.variant[i].type.name : null,
        size: product.variant[i].size != null ? product.variant[i].size.size : null,
        color: product.variant[i].productColour != null ? product.variant[i].productColour.colour : null
      }) 
    }

    return variantArray
  }

  distinct(value, index, self){
    return self.indexOf(value) === index
  }

  getCode(allVariants, type, size, color){
    type = (type == null || type == undefined || type == "") ? null : type
    color = (color == null || color == undefined || color == "") ? null : color
    size = (size == null || size == undefined || size == "") ? null : size

    let result = {code: null, type: type, color: color, size: size}
    for (var i = 0; i < allVariants.length; i++) {
      if(allVariants[i].type === type && allVariants[i].size === size && allVariants[i].color === color){
        result = {
          code: allVariants[i].code,
          type: type,
          color: color,
          size: size
        }
      }
    }

    console.log(result)
    return result
  }
  
 

  onSelectChange = (value, type) => {
    // update currentvariant type value to the changed one before getting code
    this.currentVariant[type] = value

    this.currentVariant = this.getCode(this.variants, this.currentVariant.type, this.currentVariant.size, this.currentVariant.color)
    
    console.log(this.currentVariant)
    this.setState({code: this.currentVariant.code})
  }

  render() {
    

    return (
      <div style={{ background: '#fff' }}>
        <Helmet title={`${this.product.name} | ${this.siteTitle}`} />

        <div className={styles.flexdiv}>
            <div className={styles.span6}>
              <img src={this.product.picture} />
            </div>
          <div className={styles.span4}>
              <div className={styles.sProdContainer}>
                <h3>{this.product.name}</h3>
              </div>
              
              <VariantTypes variant={this.color} title={'Velg Farge:'} type={'color'} onSelectChange={this.onSelectChange}/>
              <VariantTypes variant={this.types} title={'Velg Types: '} type={'type'} onSelectChange={this.onSelectChange}/>
              <VariantTypes variant={this.sizes} title={'Velg størelse: '} type={'size'} onSelectChange={this.onSelectChange}/>
              
            <div className={styles.checkoutDiv}>
              <div>
                <button onClick={() => {
                      basket.push(this.product)
                      console.log("BASKET: ", basket)

                }} className={styles.button}>Add to Cart</button> 

                <p><CLayer.Price skuCode="Hook HE 7"/></p> 
              </div>

              <p>
                Antall:<input className={styles.quantity}
                id="add-to-bag-quantity"
                type="number"
                defaultValue="1" />
              </p>
              <br/>
              <br/>
              <hr/>
                <p style={{float: 'right', marginRight: '10%'}}><Link to="/checkout/"><CLayer.Checkout/></Link></p>
              <br/>
              <br/>
              <hr/>

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
