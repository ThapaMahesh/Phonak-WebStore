import React from 'react'
import Link from 'gatsby-link'
import base from './base.css'
import Container from '../components/container'
import Navigation from '../components/navigation'
import get from 'lodash/get'
import * as CLayer from 'commercelayer-react'

class Template extends React.Component {
  render() {
    const { location, children } = this.props
    const navs = get(this, 'props.data.allContentfulCategory.edges')

    let header

    let rootPath = `/`
    if (typeof __PREFIX_PATHS__ !== `undefined` && __PREFIX_PATHS__) {
      rootPath = __PATH_PREFIX__ + `/`
    }

    return (
      <Container>
        <Navigation category = {navs} />
        {children()}
        <CLayer.Config
            baseUrl="https://phonakbutikk.commercelayer.io"
            clientId="1348723fa5de41b9dc1c1525a4bd3bb859312c3cc59a7734bd15400041b161c5"
            marketId="1333"
            countryCode="NO"
            languageCode="en"
            cartUrl="https://example.com/cart"
            returnUrl="https://example.com/return"
            privacyUrl="https://example.com/privacy"
            termsUrl="https://example.com/terms" />
      </Container>
    )
  }
}

export default Template


export const pageQuery = graphql`
  query NavigationQuery {
    allContentfulCategory {
      edges {
        node {
          title
          slug
        }
      }
    }
  }
`