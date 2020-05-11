import React from 'react'
import star1 from "../../images/star2.svg";
import star2 from "../../images/star1.svg";
import './star.css'

const Star  = ({isFavorite, starClick}) => {
    return (
        <div className="star">
            <img src={isFavorite ? star1 : star2} className="star-img"
                 onClick={starClick}
            />
        </div>
    )
};
export default Star