import React from 'react'
class StorePicker extends React.Component{
    render(){
        // can only return one element so we collapse everythin in one element
        // in this case we use <form>
        return (
            <form className = "store-selector">
                {/* comments are written like this*/}

                <h2> pealse enter a store</h2>
                <input type="text" required placeholder="store name"></input>
                <button type="submit">Visit Store</button>
            </form>
        )
    }
}

export default StorePicker