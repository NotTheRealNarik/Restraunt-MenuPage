import React from 'react'
import {getFunName} from '../helpers'
import PropTypes from 'prop-types';
class StorePicker extends React.Component{
    // constructor(){
    //     super() //runs react component first
    //     this.goToStore = this.goToStore.bind(this) // letting 'this' to be used for function goToStore to reference the class StorePicker
    // }

    // USER DEFINED METHOD
    goToStore(event) {
        // "this" in created functions is not class StorePicker. SO we use constructor of the compoent
        event.preventDefault() //this line stops page from refreshing or submitting
        console.log(this.storeInput.value)
        const storeId = this.storeInput.value
        //grab text from box
        // put it in the following format '/store/:stoerId' by replacing '/'
        //this.context.router.transitionTo(`/store/${storeId}`) NOT WORKING
        this.context.router.history.push(`/store/${storeId}`);

        //this.props.history.push(`store/${storeId}`);

    }
    
    render(){
        // can only return one element so we collapse everythin in one element
        // in this case we use <form>
        return (
            // "this" in render is class StorePicker
            <form className = "store-selector" onSubmit={(e) => this.goToStore(e)}>  {/*  onSubmit={this.goToStore()}*/}
                {/* comments are written like this*/}

                <h2> pealse enter a store </h2>
                <input type="text" required placeholder="store name" defaultValue={getFunName()} ref={(input => {this.storeInput = input})}></input> 
                {/* ref={(input => {this.storeInput = input})} lines lets us select the input field, which can be then passed around */ }
                <button type="submit">Visit Store</button>
            </form>
        )
    }
}


StorePicker.contextTypes= {
    router: PropTypes.object
}
export default StorePicker