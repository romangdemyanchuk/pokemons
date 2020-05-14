import React, {Component} from 'react';
import Pokemons from '../Main/main';
import PokemonInfo from "../PokemonInfo/pokemon-info";

import {BrowserRouter as Router, Route} from 'react-router-dom';
import './app.css';

export default class App extends Component {
    render() {
        return (
            <Router>
                <Route exact path="/" component={Pokemons}/>
                <Route path="/:id" component={PokemonInfo} />
            </Router>
        );
    }
};