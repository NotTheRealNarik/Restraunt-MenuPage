import React from 'react'
import Header from './Header'
import Order from './Order'
import Inventory from './Inventory'


class App extends React.Component{
    constructor(){
        super()
        this.addFish = this.addFish.bind(this);
        //initial state
        this.state = {
            fishes: {},
            order: {}
        };

    }

    addFish(fish){
        //update state
        const fishes = {...this.state.fishes} //takes existing fishes objects and places them in new object fishes (names is same)
        //adding new fishes
        const timestamp = Date.now()
        fishes[`fish-${timestamp}`] = fish // this fish is refrencing fish from AddFishForm
        //set new state
        this.setState({fishes:fishes})
    }
    
    
    render(){
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    {/* tagline is a prop*/}
                    <Header tagline="Fresh Seafood Market"/>
                </div>
                <Order/>
                <Inventory addFish={this.addFish}/> {/* passing addFish method as prop to inventory.js*/}


            </div>
        )
    }
}

export default App