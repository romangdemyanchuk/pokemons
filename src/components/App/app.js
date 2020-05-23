import React, {Component} from 'react';
import Pokemons from '../Main/main';
import PokemonDetails from "../PokemonDetails/pokemonDetails";
import {Route} from 'react-router-dom';
import './app.css';
import Switch from "@material-ui/core/Switch";

export default class App extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={Pokemons}/>
                <Route path="/:id" component={PokemonDetails}/>
            </Switch>
        );
    }
};