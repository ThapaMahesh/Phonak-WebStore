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
            clientId="3e8c6076d17fe300633e3eda52bbe7ec0e2895e73ef85483694060f580bec561"
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