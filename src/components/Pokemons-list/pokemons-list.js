import React from 'react'
import './pokemons-list.css'
import PokemonItem from "../pokemon-item/pokemon-item";

const PokemonsList = ({pokemonsList}) => {

     const list = pokemonsList.map((pokemon) => {
        return (
            <PokemonItem pokemon={pokemon}/>
        )
    });
         return (
             <React.Fragment>
                 <div className="pokemon-list-items"> {list}</div>
             </React.Fragment>
         )
    };
export default PokemonsList;