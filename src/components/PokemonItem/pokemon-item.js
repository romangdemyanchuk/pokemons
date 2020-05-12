import React, {Component} from "react";
import './pokemon-item.css'
import {Card, CardActionArea} from '@material-ui/core';
import Star from "../Star";
import {Link} from "react-router-dom";
import {checkIsFavorite} from "../helpers";

export default class PokemonItem extends Component {
    state = {
        isFavorite: false
    };
    componentDidMount() {
        checkIsFavorite(this.setFavorite, this.props.pokemon.id)
    }

    setFavorite = (isFavorite) => {
        this.setState({isFavorite: isFavorite});
    };

    getImage(id) {
        return `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
    }

   render() {
       const {pokemon} = this.props;
       const {isFavorite} = this.state;
       const cardInfo =  <div className="item-wrapper">
           <Star pokemonId={pokemon.id}
                 setFavorite={this.setFavorite}
                 isFavorite={isFavorite}
           />
           <img alt="pokemonImage" src={this.getImage(pokemon.id)}/>
           <div className="pokemon-items-name">
               {pokemon.name}
           </div>
       </div>;
       return (
           <Link to={`/item/${pokemon.id}`}>
               <Card className="card">
                   <CardActionArea className="pokemon-item">
                       {cardInfo}
                   </CardActionArea>
               </Card>
            </Link>
       )
   }
};