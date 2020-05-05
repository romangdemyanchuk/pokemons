import React, {Component} from 'react';
import Pokemons from '../Pokemons/pokemons';
import EachItemInfo from "../EachItemInfo/EachItemInfo";

import {BrowserRouter as Router, Route} from 'react-router-dom';
import './app.css';

export default class App extends Component {
    render() {
        return (
            <Router>
                <Route exact path="/item" component={Pokemons}/>
                <Route path="/item/:id" component={EachItemInfo} />

            </Router>
        );
    }
};