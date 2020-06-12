import React from 'react'
import Header from './Header'
import Order from './Order'
import Inventory from './Inventory'
import Fish from './Fish'
import sampleFishes from '../sample-fishes'
import base from '../base'

class App extends React.Component{
    constructor(){
        super()
        this.addFish = this.addFish.bind(this);
        this.loadSamples = this.loadSamples.bind(this)
        this.addToOrder = this.addToOrder.bind(this)

        //initial state IMPORTANT
        this.state = {
            fishes: {},
            order: {}
        };
    }

    componentWillMount(){
        this.ref = base.syncState(`${this.props.match.params.storeId}/fishes`, {context:this, state:'fishes'});
    }

    componentWillUnmount(){
        base.removeBinding(this.ref)
    }

    addFish(fish){
        //update state
        const fishes = {...this.state.fishes} //takes existing fishes objects from above and places them in new object fishes (names is same)
        //adding new fishes
        const timestamp = Date.now()
        fishes[`fish-${timestamp}`] = fish // this fish is refrencing fish from AddFishForm
        //set new state
        this.setState({fishes:fishes})
    }

    loadSamples(){
        this.setState({
            fishes:sampleFishes

        })
    }

    addToOrder(key){
        const order = {...this.state.order} //takes existing order objects from above 
        order[key] = order[key] + 1 || 1  // if exists- increment 1 else add it
        this.setState({order: order})
    }
    
    
    render(){
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    {/* tagline is a prop*/}
                    <Header tagline="Fresh Seafood Market"/>
                    <ul className="list-of-fishes">
                        {
                            // loop over object of fishes
                            // index = {key} passses the key to the desired component. in theis case its teh fish.js
                            Object
                                .keys(this.state.fishes)
                                .map(key => 
                                <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder}/>
                                )
                        }
                    </ul>
                </div>
                <Order fishes={this.state.fishes} order={this.state.order}/>
                <Inventory addFish={this.addFish} loadSamples={this.loadSamples}/> {/* passing addFish method as prop to inventory.js*/}


            </div>
        )
    }
}

export default App