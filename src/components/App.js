import React from 'react'
import Header from './Header'
import Order from './Order'
import Inventory from './Inventory'


class App extends React.Component{
    render(){
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    {/* tagline is a prop*/}
                    <Header tagline="Fresh Seafood Market"/>
                </div>
                <Order/>
                <Inventory/>

            </div>
        )
    }
}

export default App