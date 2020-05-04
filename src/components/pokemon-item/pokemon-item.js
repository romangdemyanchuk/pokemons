import React, {Component} from "react";
import './pokemon-item.css'
import {Card, CardActionArea} from '@material-ui/core';
import Spinner from "../Spinner";
import EachItemInfo from '../EachItemInfo/EachItemInfo'
import {Route, Link} from "react-router-dom";
import PokemonsList from "../Pokemons-list";

export default class PokemonItem extends Component {
   render() {
       const {pokemon} = this.props;
       let splitedUrl = pokemon.url.split('/');
       let id = splitedUrl[splitedUrl.length - 2];
       return (
           <Link to={`/item/${id}`}>
               <Card >
                   <CardActionArea className="pokemon-item">
                       <div className="item-wrapper">
                           <img src={`https://pokeres.bastionbot.org/images/pokemon/${id}.png`}/>
                           <div className="pokemon-items-name">
                               {pokemon.name}
                           </div>
                       </div>

                   </CardActionArea>
               </Card>
            </Link>
       )
   }
};