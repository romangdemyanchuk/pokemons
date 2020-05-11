import React, {Component} from "react";
import {Link} from "react-router-dom";
import PokeApiService from "../../Services/pokeapi-service";
import Spinner from "../Spinner";
import {Button} from '@material-ui/core';
import './pokemon-info.css'
import Star from "../Star";
import star1 from '../../images/star2.png';
import star2 from '../../images/star1.png';

const TYPE_COLORS = {
    bug: 'B1C12E',
    dark: '4F3A2D',
    dragon: '755EDF',
    electric: 'FCBC17',
    fairy: 'F4B1F4',
    fighting: '823551D',
    fire: 'E73B0C',
    flying: 'A3B3F7',
    ghost: '6060B2',
    grass: '74C236',
    ground: 'D3B357',
    ice: 'A3E7FD',
    normal: 'C8C4BC',
    poison: '934594',
    psychic: 'ED4882',
    rock: 'B9A156',
    steel: 'B5B5C3',
    water: '3295F6'
};

export default class PokemonInfo extends Component {
    pokeapiService = new PokeApiService();
    state= {
        loading: true,
        pokemon: {},
        isFavorite: false
    };
    constructor(props) {
        super(props);
        this.GetPokemonInfoById();
    }
    setlocalStorage = (data) => {
        localStorage.setItem("items", JSON.stringify(data));
    }
    GetPokemonInfoById() {
        this.pokeapiService.getPokemonCharacteristic(this.props.match.params.id)
            .then((pokemon) => {
                this.setState({
                    pokemon,
                    loading: false
                }, () => {
                    this.checkPokemonIsFavorite()
                });
            });
    }
    checkPokemonIsFavorite(){
        const localItems = localStorage.getItem("items");
        if(localItems) {
            const items = JSON.parse(localItems);
            const index = items.findIndex((el) => el === this.state.pokemon.id);
            if(index !== -1) {
                this.setState({
                    isFavorite: true
                });
            }
        }

    }
    getImage() {
        return (`https://pokeres.bastionbot.org/images/pokemon/${this.props.match.params.id}.png`);
    }
    starClick = (e) => {
        e.preventDefault();
        this.setState((state) => {
            return {
                isFavorite: !state.isFavorite
            }
        });
        const localItems = localStorage.getItem("items");
        if (!localItems) {
            this.setlocalStorage([this.state.pokemon.id]);
        } else {
            const items = JSON.parse(localItems);
            const index = items.findIndex((el) => el === this.state.pokemon.id);
            if(index !== -1) {
                    const newArr = [
                        ...items.slice(0, index),
                        ...items.slice(index +1)
                    ];
                this.setlocalStorage(newArr);
            }
            else {
                const newArr = [
                    ...items,this.state.pokemon.id
                ];
                this.setlocalStorage(newArr);
            }
        }
    };
    render() {

        const {loading, pokemon} = this.state;
        const {id} = this.props;
        let typesPokemon = null;
        if (pokemon.types) {
             typesPokemon = pokemon.types.map((item) => {
                return (
                    <div  key={item.id}>
                        <div className="typePokemon" >
                        <span
                            className="badge badge-pill mr-1"
                            style={{
                                backgroundColor: `#${TYPE_COLORS[item.type.name]}`,
                                color: 'white'
                            }}
                        >
                            {item.type.name}
                        </span>
                        </div>
                    </div>
                );
            });
        }
        let statsPokemon = null;
        if (pokemon.stats) {
             statsPokemon = pokemon.stats.map((item) => {
                return (
                    <div key={item.id}>
                        <div className="statPokemon">
                            <div className="stat-name">
                                {item.stat.name}
                            </div>
                            <div className="base_stat">
                                <div className="progress">
                                    <div  className="progress-bar" role="progressbar"
                                          style={{ width: `${item.base_stat}%`,
                                          }}
                                          aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"
                                    >
                                        <small>{item.base_stat}</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            });
        }
        const content = !loading ? <div className="each-item">
            <Link to={`/item/`}>
                <Button  className='item-button'>
                    <i className="fa fa-arrow-left"/>
                </Button>
            </Link>
            <div className="pokemon-title">
                Detailed information about selected pokemon
            </div>
            <div className="image-name-wrapper">
                <div className="pokemon-items-image">
                    <img src={this.getImage(id)}/>
                </div>
                <div className="pokemon-items-name pokemon-name">
                    {pokemon.name}
                </div>
                <div className="pokemon-items-type">
                    <div className="typesPokemon-wrapper">
                        {typesPokemon}
                    </div>
                </div>
                {/*<div className="star">*/}
                {/*    <img src={this.state.isFavorite ? star1 : star2} className="star-img"*/}
                {/*         onClick={this.StarClick}*/}
                {/*    />*/}
                {/*</div>*/}
                <Star isFavorite={this.state.isFavorite}
                      starClick={this.starClick}
                      checkPokemonIsFavorite={this.checkPokemonIsFavorite}/>
            </div>
            <div className="type-stat-wrapper">
                {statsPokemon}
            </div>
        </div> : null;
        const spinner = loading ? <Spinner/>  : null;
        return (
            <div className="each-pokemon">
                {spinner}
                {content}
            </div>
        )
    }
};