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
            clientId="7e8b6f0aff8c4514cc7b293b535920fc884a687a899122844eaf32f4502e9833"
            marketId="1333"
            countryCode="NO"
            languageCode="en"
            cartUrl="http://localhost:8000/checkout"
            returnUrl="http://localhost:8000"
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