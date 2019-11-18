import React from 'react'
import get from 'lodash/get'
import styles from './checkout.css'
import * as CLayer from 'commercelayer-react'
import Helmet from 'react-helmet'

class Checkout extends React.Component{

    constructor(){
        super()
    }
    
    render(){
        const siteTitle = get(this.props, 'data.site.siteMetadata.title')
       
        return(
            <div className={styles.mainDiv}>
                <Helmet title={`Checkout | Phonak`}/>
                <CLayer.ShoppingBagItems
                    itemTemplate={
                    <div style={{width: '100vh', height:'auto', display: 'table-cell', background: '#fff', float: 'left', marginBottom: '2vh', border: '1px solid #8FBC8F'}}>
                       <div style={{width: '10vh', height: '10vh', float: 'left'}}> <CLayer.ShoppingBagItemImage /> </div>
                        <div style={{ marginTop: '2vh',  float: 'left', width: '80vh', textAlign: 'center'}}>
                            <div style={{float:'left', marginLeft: '5vh', width: '80px'}}>Item: <CLayer.ShoppingBagItemName /></div>
                            <div style={{float:'left', marginLeft: '10vh'}}>Price pr: <CLayer.ShoppingBagItemUnitAmount /></div>
                            <div style={{float:'left', marginLeft: '10vh'}}>Quantity: <CLayer.ShoppingBagItemQtyContainer /></div>
                            <div style={{float:'left', marginLeft: '10vh'}}>Quantity price: <CLayer.ShoppingBagItemTotalAmount /></div>
                            <div style={{float:'left', marginLeft: '10vh', marginTop: '2vh'}}><CLayer.ShoppingBagItemRemove /></div>
                        </div>
                    </div>
                } />
                        
                <div style={{width: '100vh'}}>
                    <hr/>
                    <span style={{float: 'right', marginRight: '5vh'}}><CLayer.Checkout/></span>
                    <span style={{float: 'right', marginRight: '9vh'}}><CLayer.ShoppingBagTotal /></span>
                    <span style={{float: "right", marginRight: '2vh'}}>Total:</span>
                    <br/>
                    <hr/>
                </div>
            </div> 
        )
    }
}
export default Checkout