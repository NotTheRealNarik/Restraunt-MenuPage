// let's go!
import React from 'react'
// to render to html
import {render} from 'react-dom'
import {BrowserRouter, Route} from 'react-router-dom'
import {Switch} from 'react-router'


import './css/style.css'

import StorePicker from './components/StorePicker'
import NotFound from './components/NotFound'

import App from './components/App'

const Root = () => {
    return (
        <BrowserRouter>
        <div>
        <Switch>
            <Route exact path="/" component = {StorePicker}/>
            <Route path="/store/:storeId" component = {App}/>
            <Route component = {NotFound}/>
            </Switch>
        </div>
        </BrowserRouter>
    )
}
render(<Root/>, document.getElementById("main"))