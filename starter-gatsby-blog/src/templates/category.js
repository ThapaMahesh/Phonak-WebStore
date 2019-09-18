import React from 'react'
import Helmet from 'react-helmet'
import get from 'lodash/get'
import Img from 'gatsby-image'

import heroStyles from '../components/hero.module.css'

import ProductPreview from '../components/product-preview'

class CategoryTemplate extends React.Component {
  render() {
    const post = get(this.props, 'data.contentfulCategory')
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')

    return (
      <div style={{ background: '#fff' }}>
        <Helmet title={`${post.title} | ${siteTitle}`} />
        {post.productsList.map(trick => (
              <ProductPreview product={trick} />
              ))}
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
        }
      }
    }
  }
`
