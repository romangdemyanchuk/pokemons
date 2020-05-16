import React from 'react'
import './emptyFavoritePokemonsList.css'
import emptyBox from '../../images/empty-box.png';
import {Button} from "@material-ui/core";
import {Link} from "react-router-dom";
const EmptyFavoritePokemonsList  = () => {
    console.log('yes');
    return (
        <Link to={'/empty'}>
            <Link to={`/`}>
                <Button  className='item-button'>
                    <i className="fa fa-arrow-left"/>
                </Button>
            </Link>
            <div className="infoAboutList">
                <h1 >The list of favorite pokemons is empty</h1>
                <img  alt="EmptyBox" src={emptyBox}/>

            </div>
        </Link>
    )
};
export default EmptyFavoritePokemonsList