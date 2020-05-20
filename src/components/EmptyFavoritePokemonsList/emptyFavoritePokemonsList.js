import React from 'react'
import './emptyFavoritePokemonsList.css'
import emptyBox from '../../images/empty-box.png';
const EmptyFavoritePokemonsList  = () => {
    return (
        <div>
            <div className="infoAboutList">
                <h1 >The list of favorite pokemons is empty</h1>
                <img  alt="EmptyBox" src={emptyBox}/>

            </div>
        </div>
    )
};
export default EmptyFavoritePokemonsList