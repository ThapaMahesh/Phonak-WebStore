import React from 'react'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import styles from './checkout.css'
import * as CLayer from 'commercelayer-react'
import {basket} from './basket'
import {sum} from './basket'
import { increment } from './basket'

class Checkout extends React.Component{

    constructor(){
        super() 
    }

    checkBasket(){
        if(basket.length === 0){
            return (            
            <div>
                <h4 style={{marginLeft: '8%'}}>Du har ikke lagt til noen produkter enda.</h4>
            </div>
            )
        }

    }
    
    render(){
        const siteTitle = get(this.props, 'data.site.siteMetadata.title')
        const checkMethod = this.checkBasket()
        return(
            <div className={styles.mainDiv}>
                <Helmet title={"Checkout"} />
                <h1>Checkout</h1>
                <br/>
                <div className={styles.summaryDiv}>
                <h4 style={{marginLeft: '5%'}}>Products:</h4>
                {checkMethod}
                    <ul style={{marginLeft: '6%'}}>

                        {basket.map((eachItem, index) =>{ 
                                increment(Number(eachItem.product.price));                           
                                return <li key={index} style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'left', marginTop: '3%'}}><img style={{width: '10vh', height: '10vh'}} src={eachItem.product.picture} /> <p>{eachItem.product.name}</p><p>, kr {eachItem.product.price}</p></li>
                              })
                        }
                    </ul>
                </div>
                <hr/>
                <div style={{height: 'auto', width: '100vh', display: 'table-cell'}}>
                    <button type="button" style={{ float: 'right', marginRight: '5%', marginTop: '2%',  top: '50%', transform: 'translateY(-50%)'}}>Order now</button>
                    <p style={{float: 'right', marginRight: '5%', top: '50%', transform: 'translateY(-50%)'}}>SUM: kr <span>{sum}</span></p>
                    <br/>
                </div>
                <hr/>
            </div>
        )
    }
}
export default Checkout