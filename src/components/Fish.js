import React from 'react'
import {formatPrice} from '../helpers'
class Fish extends React.Component{
    render(){
        const details = this.props.details
        const index = this.props.index
        const isAvailable = details.status ==='available';
        const buttonText = isAvailable ? 'Add to Order' : 'Sold out' // if isAvailable == true then 'add to order' else 'sold out'
        return(
            <li className="menu-fish">
                <img src={details.image}></img>
                {/*<p>Fishes go here</p> */} 
                <h3>
                    {details.name}
                    <span className="price">{formatPrice(details.price)}</span>
                </h3>
                <p>{details.desc}</p>
                <button onClick={() => this.props.addToOrder(index)} disabled={!isAvailable}>{ buttonText}</button>                
            </li>
        )
    }
}

export default Fish