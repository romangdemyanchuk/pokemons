import React, {Component} from 'react';
import Pokemons from '../Main/main';
import PokemonDetails from "../PokemonDetails/pokemonDetails";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './app.css';

export default class App extends Component {
    render() {
        return (
            <Router>
                <Route exact path="/pokemons" component={Pokemons}/>
                <Route path="/pokemons/:id" component={PokemonDetails}/>
            </Router>
        );
    }
};