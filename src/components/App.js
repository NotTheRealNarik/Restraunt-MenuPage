import React from 'react'
import Header from './Header'
import Order from './Order'
import Inventory from './Inventory'
import Fish from './Fish'
import sampleFishes from '../sample-fishes'
import base from '../base'
import PropTypes from 'prop-types';

class App extends React.Component{
    constructor(){
        super()
        this.addFish = this.addFish.bind(this);
        this.loadSamples = this.loadSamples.bind(this)
        this.addToOrder = this.addToOrder.bind(this)
        this.removeFish = this.removeFish.bind(this);
        this.removeOrder = this.removeOrder.bind(this)
        this.updateFish = this.updateFish.bind(this)
        //initial state IMPORTANT
        this.state = {
            fishes: {},
            order: {}
        };
    }

    componentWillMount(){
        //this runs right before the app renders
        this.ref = base.syncState(`${this.props.match.params.storeId}/fishes`, {context:this, state:'fishes'});
    
        //this checkes if there is any order in localstorage
        const localStorageRef = localStorage.getItem(`order-${this.props.match.params.storeId}`)
        if (localStorageRef){
            //update our app compoenent's order state
            this.setState({
                order: JSON.parse(localStorageRef)
            })
        }
    
    }

    componentWillUnmount(){
        base.removeBinding(this.ref)
    }

    componentWillUpdate(nextProps,nextState){
        localStorage.setItem(`order-${this.props.match.params.storeId}`,JSON.stringify(nextState.order))
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

    updateFish(key, updatedFish){
        const fishes = {...this.state.fish}
        fishes[key] = updatedFish;
        this.setState({fishes})
    }

    removeFish(key){
        const fishes = {...this.state.fish}
        fishes[key] = null
        this.setState({fishes})
    }

    removeOrder(key){
        const order = {...this.state.order}
        if (order[key] >= 2){
            order[key] = order[key] -1
        }
        else{
            delete order[key]
        } 
        this.setState({order})
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
                <Order 
                fishes={this.state.fishes} 
                order={this.state.order} 
                params={this.props.match.params}
                removeOrder = {this.removeOrder}/>

                <Inventory addFish={this.addFish} 
                           loadSamples={this.loadSamples}
                           fishes = {this.state.fishes}
                           updateFish = {this.updateFish}
                           removeFish = {this.removeFish}/> {/* passing addFish method as prop to inventory.js*/}


            </div>
        )
    }
}

App.propTypes= {
    params: PropTypes.object.isRequired
    
}


export default App