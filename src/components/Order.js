import React from 'react'
import {formatPrice} from '../helpers'
import { TransitionGroup  } from 'react-transition-group'
import PropTypes from 'prop-types';



class Order extends React.Component{
    constructor(){
        super();
        this.renderOrder = this.renderOrder.bind(this)
    }
    
    renderOrder(key){
        const fish = this.props.fishes[key]
        const count = this.props.order[key]
        const removeButton = <button onClick={()=>this.props.removeOrder(key)}>-1bs</button>
        

        if (!fish ||fish.status === 'unavailable'){
        return <li key= {key} >Sorry, {fish ? fish.name: 'Fish'} is no longet available 
        <button onClick={()=>this.props.removeOrder(key)}>&times;</button>
        </li> 
        // if 'fish' name exists, we print fish name other wise it prints "Fish"
        }

        return (
                <TransitionGroup
                component="li" 
                key={key}> 
                       <span>
                           <TransitionGroup
                           component="span"
                           className="count"
                           transitionName="count">
                           <span key={count}>{count}</span> 
                           </TransitionGroup>
                           lbs {fish.name} 
                        </span>
                       <span className="price">{formatPrice(count * fish.price)}</span> 
                       {removeButton}
                   
                </TransitionGroup>
                
        )
    }
    
    
    
    render(){
        const orderIds = Object.keys(this.props.order)
        const total = orderIds.reduce((prevTotal, key)=> { // reduce() loops over an array. here we loop over order array
            const fish = this.props.fishes[key]
            const count = this.props.order[key]
            const isAvailable = fish && fish.status === 'available' // we check if fish exists and if the staus 'isAvailable'
            if (isAvailable){
                return prevTotal + (count + fish.price || 0) // ||0 is written for deleted orders
            }
            return prevTotal
        },0); // 0 here is the starting value
        return(
            <div className="order-wrap">
                <h2>Your Order</h2>
                <ul  
                className='order'
                >
                    {orderIds.map(this.renderOrder)}
                    <li className='total'>
                        <strong>Total:</strong>
                        {formatPrice(total)}
                    </li>                    
                </ul >
            </div>
        )
    }
}

//doing this will make the compoents more risilient 
Order.propTypes = {
    fishes      : PropTypes.object.isRequired,    
    order     : PropTypes.object.isRequired,
    removeOrder  : PropTypes.func.isRequired
    }


export default Order