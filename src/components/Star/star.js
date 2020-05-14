import React from 'react'
import star1 from "../../images/star2.svg";
import star2 from "../../images/star1.svg";
import './star.css'

const setlocalStorage = (data) => {
    localStorage.setItem("items", JSON.stringify(data));
};

const starClick = (e, pokemonId, setFavorite) => {
    e.preventDefault();
    pokemonId = parseInt(pokemonId);
    const localItems = localStorage.getItem("items");
    if (!localItems) {
        setlocalStorage([pokemonId]);
        setFavorite(false)
    } else {
        const items = JSON.parse(localItems);
        const index = items.findIndex((el) => el === pokemonId);
        if(index !== -1) {
            const newArr = [
                ...items.slice(0, index),
                ...items.slice(index +1)
            ];
            setlocalStorage(newArr);
            setFavorite(false)
        }
        else {
            const newArr = [
                ...items,pokemonId
            ];
            setlocalStorage(newArr);
            setFavorite(true)
        }
    }
};
const Star  = ({pokemonId, setFavorite, isFavorite}) => {
    return (
        <div className="star">
            <img alt="star-img" src={isFavorite ? star1 : star2} className="star-img"
                 onClick={(e) => starClick(e, pokemonId, setFavorite)}
            />
        </div>
    )
};
export default Star