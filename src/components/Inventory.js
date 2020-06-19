import React from 'react'
import AddFishForm  from './AddFishForm';
import { object } from 'prop-types';
import PropTypes from 'prop-types';



class Inventory extends React.Component{
    constructor(){
        super();
        this.renderInventory = this.renderInventory.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e, key){
        const fish = this.props.fishes[key]
        const updatedFish = {...fish, 
            [e.target.name] : e.target.value
            
        }  
        this.props.updateFish(key,updatedFish) // call the updateFish() function from App.js to update state
        // copy of object is also made using =  Object.assign({}, fish) // we take an empty object {} and put fish object in it
    }

    renderInventory(key){
        const fish = this.props.fishes[key]
        return(
            <div class="fish-edit" key={key}>
                <input type="text" name="name"  value={fish.name} placeholder="Fish Name" onChange={(e) => this.handleChange(e,key)}></input>                        
                <input type="text" name="price" value={fish.price} placeholder="Fish Price" onChange={(e) => this.handleChange(e,key)}></input>                
                <select type="text" name="status" value={fish.status} placeholder="Fist Status" onChange={(e) => this.handleChange(e,key)}>
                    <option value="available">Fresh!</option>
                    <option value="unavailable">Sold Out!</option>
                </select>                
                <textarea type="text" name="desc" value={fish.desc} placeholder="Fish Desc" onChange={(e) => this.handleChange(e,key)}>
                </textarea>                
                <input type="text" name="image" value={fish.image} placeholder="Fish Image" onChange={(e) => this.handleChange(e,key)}></input>                
                <button onClick={()=> this.props.removeFish(key)}>Remove Fish</button>                 
            </div>
        )
    }    
    
    render(){
        return(
            <div>
            <h2>Inventory</h2>
            {Object.keys(this.props.fishes).map(this.renderInventory)}
            <AddFishForm addFish={this.props.addFish}></AddFishForm> {/*{this.props.addFish} calls the addFish method from App.js */}
            <button onClick={this.props.loadSamples}> Load Sample Fishes</button>
            </div>
        )
    }s
}

Inventory.propTypes = {
    fishes      : PropTypes.object.isRequired,    
    addFish     : PropTypes.func.isRequired,
    loadSamples : PropTypes.func.isRequired,
    updateFish  : PropTypes.func.isRequired,
    removeFish  : PropTypes.func.isRequired
}

export default Inventory