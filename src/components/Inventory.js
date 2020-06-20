import React from 'react'
import AddFishForm  from './AddFishForm';
import { object } from 'prop-types';
import PropTypes from 'prop-types';
import base from '../base'
import firebase, { auth } from 'firebase'

require('firebase/auth')

class Inventory extends React.Component{
    constructor(){
        super();
        this.renderInventory = this.renderInventory.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.renderLogin = this.renderLogin.bind(this)
        this.state = {
            uid : null,
            owner: null
        }
        this.authenticate = this.authenticate.bind(this)
        this.authHandler = this.authHandler.bind(this)
        this.logout = this.logout.bind(this)

    }

    componentDidMount(){
        const storeName =this.props.storeId
        firebase.auth().onAuthStateChanged((user) =>{
            if (user) {
                // User is signed in.
                this.setState({user})
                const storeRef = firebase.database().ref(storeName)

                storeRef.once('value',(snapshot)=>{
                    // if data is present else return empty objectt
                    const data = snapshot.val() || {}
                    if (data.owner == null){
                        storeRef.set({
                            owner: user.uid
                        })
                    }
                    this.setState({
                        uid: user.uid,
                        owner: data.owner || user.uid
                    })
                })
            } 
        })
    }

    renderLogin(){
        return (
            <nav className="login">
                <h2>Inventory</h2>
                <p>Sign in to manage your store's Inventory</p>
                <button className="github" onClick={()=>this.authenticate('github')}>Login with GitHub</button>
                <button className="twitter" onClick={()=>this.authenticate('twitter')}>Login with Twitter (doesnt work)</button>
                <button className="facebook" onClick={()=>this.authenticate('facebook')}>Login with FaceBook</button>
            </nav>
        )
    }

    authenticate(website){
        const storeName =this.props.storeId

        if(website == 'facebook'){
            var provider = new firebase.auth.FacebookAuthProvider();

        }
        else if(website =='github'){
            var provider = new firebase.auth.GithubAuthProvider();

        }
        else{
            var provider = new firebase.auth.TwitterAuthProvider();
        }

        firebase.auth().signInWithPopup(provider).then(function (authData) {
            console.log(authData);
            const storeRef = firebase.database().ref(storeName)
            storeRef.once('value',(snapshot)=>{
                // if data is present else return empty objectt
                const data = snapshot.val() || {}
                if (data.owner == null){
                    storeRef.set({
                        owner: authData.user.uid
                    })
                }
                this.setState({
                    uid: authData.user.uid,
                    owner: data.owner || authData.user.uid
                })
            })

        }.bind(this))
    }

    authHandler(authData){
        //was not able to make this work
    
    }

    logout(){
        firebase.auth().signOut();
        this.setState({
            uid:null
        })
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
            <div className="fish-edit" key={key}>
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
        const logout = <button onClick={this.logout}>Log Out</button>
        //check if tehy are not logged in?
        if (this.state.uid == null){
            return <div>{this.renderLogin()}</div>
        }

        //check if they are the owner of the store
        if (this.state.uid !== this.state.owner){
        return (
            <div>
                <p> Sorry, you are not the owner of this store</p>
                {logout}
            </div>)

        }

        return(
            <div>
            <h2>Inventory</h2>
            {logout}
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
    removeFish  : PropTypes.func.isRequired,
    storeId : PropTypes.string.isRequired
}

export default Inventory