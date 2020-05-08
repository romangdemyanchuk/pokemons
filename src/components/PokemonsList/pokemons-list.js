import React from 'react'
import './pokemons-list.css'
import PokemonItem from "../PokemonItem/pokemon-item";

const PokemonsList = ({pokemonsList}) => {
     const list = pokemonsList.map((pokemon) => {

         let splitedUrl = pokemon.url.split('/');
         let id = splitedUrl[splitedUrl.length - 2];
         pokemon = {
             id,
             ...pokemon
         };
        return (
            <div key={pokemon.id}>
                <PokemonItem pokemon={pokemon}/>
            </div>
        )
    });
         return (
                 <div className="pokemon-list-items"> {list}</div>
         )
    };
export default PokemonsList;