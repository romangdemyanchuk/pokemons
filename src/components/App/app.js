import React, {Component} from 'react';
import Pokemons from '../Main/main';
import EmptyFavoritePokemonsList from "../EmptyFavoritePokemonsList/emptyFavoritePokemonsList";
import PokemonDetails from "../PokemonDetails/pokemonDetails";

import {BrowserRouter as Router, Route} from 'react-router-dom';
import './app.css';

export default class App extends Component {
    render() {
        return (
            <Router>
                <Route exact path="/" component={Pokemons}/>
                <Route path="/:id" component={PokemonDetails}/>
                <Route path="/empty" component={EmptyFavoritePokemonsList}/>
            </Router>
        );
    }
};