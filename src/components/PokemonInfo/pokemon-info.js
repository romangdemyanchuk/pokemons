import React, {Component} from "react";
import {Link} from "react-router-dom";
import PokeApiService from "../../Services/pokeapi-service";
import Spinner from "../Spinner";
import {Button} from '@material-ui/core';
import './pokemon-info.css'
import Star from "../Star";
import {checkIsFavorite} from "../helpers";

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
    componentDidMount() {
        checkIsFavorite(this.setFavorite, this.state.pokemon.id)
    }

    setFavorite = (isFavorite) => {
        this.setState({isFavorite: isFavorite});
    };
    GetPokemonInfoById() {
        this.pokeapiService.getPokemonCharacteristic(this.props.match.params.id)
            .then((pokemon) => {
                this.setState({
                    pokemon,
                    loading: false
                }, () => {
                    this.checkPokemonIsFavorite();
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
    render() {
        const {loading, pokemon} = this.state;
        const {id} = this.props;
        let typesPokemon = null;
        if (pokemon.types) {
             typesPokemon = pokemon.types.map((item) => {
                return (
                    <div  key={item}>
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
                    <div key={item}>
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
            <div className="name-wrapper">
                <div className="pokemon-name">
                    {pokemon.name}
                </div>
                <Star
                    pokemonId={this.state.pokemon.id}
                    setFavorite={this.setFavorite}
                    isFavorite={this.state.isFavorite}/>
            </div>
            <div className="pokemon-items-type">
                <div className="typesPokemon-wrapper">
                    {typesPokemon}
                </div>
            </div>
            <div className="image-wrapper">
                <div className="pokemon-items-image">
                    <img alt="pokemonImage" src={this.getImage(id)}/>
                </div>
                <div className="type-stat-wrapper">
                    {statsPokemon}
                </div>
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