import React from 'react'
import Link from 'gatsby-link'
import Img from 'gatsby-image'

import styles from './article-preview.module.css'


class VariantTypesComponent extends React.Component {


  onSelectChange = e => {
    this.props.onSelectChange(e.target.value, e.target.getAttribute('type'))
  }

  render(){
    let variant = this.props.variant
    let title = this.props.title
    let type = this.props.type

    return (
        (variant.length > 0) ?
            <div id={`"select-${type}"`} className={styles.variationDiv}>
                              <p>{title}</p>
                              <select onChange={this.onSelectChange} type={type}>
                                  { variant.map(function(eachVariant, index){ 
                                      return <option key={index} defaultValue={eachVariant}>{eachVariant}</option>
                                    })
                                  }
                              </select>
                        </div>
        : null
      )
  }
}

export default VariantTypesComponent
