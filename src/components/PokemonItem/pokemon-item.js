import React, {Component} from "react";
import './pokemon-item.css'
import {Card, CardActionArea} from '@material-ui/core';
import star1 from '../../images/star2.png';
import star2 from '../../images/star1.png';
import {Link} from "react-router-dom";
import Spinner from "../Spinner";

export default class PokemonItem extends Component {
    state = {
        image: {star1},
        loading: false
    };
    onStarClick = (e) => {
        e.preventDefault();
        this.setState({
            image: {star2}
        });
    };
    getImage(id) {
        const photoUrl = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;

        if (!photoUrl) {this.setState({loading:true}); }
        if (photoUrl) {return (photoUrl); }

    }

   render() {
       const {pokemon} = this.props;
       const {loading} = this.state;
       const cardInfo = !loading ? <div className="item-wrapper">
           <img src={this.getImage(pokemon.id)}/>
           <div className="pokemon-items-name">
               {pokemon.name}
           </div>
           {/*<div className="star">*/}
           {/*    <img src={star1} className="star-img"*/}
           {/*      onClick={this.onStarClick}*/}
           {/*         // style={{backgroundColor: this.state.image}}*/}
           {/*    />*/}
           {/*</div>*/}

       </div> : null;
       const spinner = loading ? <Spinner/>  : null;
       return (
           <Link to={`/item/${pokemon.id}`}>
               <Card className="card">
                   <CardActionArea className="pokemon-item">
                       {cardInfo}
                       {spinner}
                   </CardActionArea>
               </Card>
            </Link>
       )
   }
};