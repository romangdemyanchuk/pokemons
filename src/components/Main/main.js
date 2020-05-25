import React, {Component} from 'react';
import PokeApiService from "../../Services/pokeapi-service";
import Preloader from '../Preloader';
import PokemonsList from '../PokemonsList';
import Pagination from '@material-ui/lab/Pagination';
import SearchByName from '../SearchByName/SearchByName';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import EmptyFavoritePokemonsList from '../EmptyFavoritePokemonsList/emptyFavoritePokemonsList'
import Checkbox from "@material-ui/core/Checkbox";
import Store from '../../Store/index'
import {observer} from "mobx-react";
import ErrorIndicator from "../ErrorIndicator/errorIndicator";
import logo from '../../images/logo.png'
import './main.css';

class Main extends Component {
    pokeapiService = new PokeApiService();
    state= {
        name: null,
        photo: null,
        pokemons: [],
        favouritePokemons: [],
        activePaginateButton: null,
        loading: true,
        term:'',
        pagesCount: null,
        currentPage: 1,
        error: false
    };
    filterButtons = [10, 20, 50];
    componentDidMount() {
        this.allPokemons();
    }
    componentDidCatch() {
        this.setState({error:true})
    }
    onError = () => {
        this.setState({error: true, loading: false})
    };
     allPokemons() {
         this.pokeapiService.getAll()
             .then((pokemons) => {
                 this.setState({
                     pokemons: pokemons.results,
                     loading: false,
                     pagesCount: Math.ceil(pokemons.results.length/Store.pokemonsStore.pageSize)
                }, () => {
                     this.searchFavorite()
                 })
             })
            .catch(this.onError)
     }
    onSearchChange = (term) => {
        this.setState({term});
    };
    search(items, term) {
        if(term.length === 0) {
            return items;
        }
        return items.filter((item) =>{
            return item.name.toLowerCase().indexOf(term.toLowerCase()) > -1;
        });
    }
    searchFavorite = () => {
        const pokemons = this.state ? this.state.pokemons : [];
        let favoriteItems = [];
        const localItems = localStorage.getItem("items");
        !localItems && localStorage.setItem("items", JSON.stringify([]));
        const localitems = JSON.parse(localItems);
        if(localitems === []) {
            return pokemons;
        }
        pokemons.map ((item) => {
            let splitedUrl = item.url.split('/');
            let id = parseInt(splitedUrl[splitedUrl.length - 2]);
            return localitems.includes(id) && favoriteItems.push(item);
        });
        this.setState({
            favouritePokemons: favoriteItems,
            pagesCount: Math.ceil( (Store.pokemonsStore.showFavorite ?
                favoriteItems.length : pokemons.length)/Store.pokemonsStore.pageSize)
        });
    };
    handleChange = (event, value) => {
        this.setState({
            pagesCount: Math.ceil(this.state.pokemons.length/Store.pokemonsStore.pageSize)
        });
        Store.ChangeCurrentPage(value);
    };
    itemsCountOnPage = (value) => {
        this.setState({
            pagesCount: Math.ceil(this.state.pokemons.length/value),
        }, () => {
            this.dropDown();
        });
        Store.ChangePageSize(value);

    };
    dropDown = () => {
        let a = document.getElementById('dropdown');
        (a.style.display === 'none') ? ( a.style.display = 'flex') : a.style.display = 'none';
    };
    changeCheckBox = e => {
        this.setState({
            [e.target.name]: e.target.checked
        }, () => {
            this.searchFavorite()
        });
        Store.ChangeShowFavorite();
        Store.ChangeCurrentPage(1);
    };
    changeCurrentPage = () => {
        console.log('this.state.currentPage',this.state.currentPage);
        (this.state.currentPage <= 1) ?
        this.setState({
            currentPage: 1
        }, () => {
            Store.ChangeCurrentPage(this.state.currentPage)
        }): this.setState(prevState => ({
            currentPage: prevState.currentPage-1
        }), () => {
            Store.ChangeCurrentPage(this.state.currentPage)
        })
    };
    slicePokemonsPages = (value) => {
        const {pokemonsStore} = Store;
        const currPage = (pokemonsStore.currentPage ? pokemonsStore.currentPage - 1 : 0);
        return value.slice(currPage*pokemonsStore.pageSize, currPage*pokemonsStore.pageSize + pokemonsStore.pageSize)
    };
    render() {
        const {loading, term, pokemons, favouritePokemons, error} = this.state;
        const {pokemonsStore} = Store;
        let pokemonItems = pokemonsStore.showFavorite ? favouritePokemons : pokemons;
        pokemonItems = this.search(pokemonItems, term);
        const pokemonsList = pokemonItems.length === 0 ? [] : this.slicePokemonsPages(pokemonItems);
        let dropDownItems = this.filterButtons.map((item) => {
            return (
                <li key={item}>
                    <button
                        onClick={() => this.itemsCountOnPage(item)}
                        className={pokemonsStore.pageSize === item ? "dropdown active" : "dropdown"}
                    >
                        {item}
                    </button>
                </li>
            );
        });
        const hasData = !(loading || error);
        const errorMessage = error ? <ErrorIndicator/> : null;
        const spinner = loading ? <Preloader/> : null;
        const content = hasData && <div>
            <div className="mainTitle">
                <img src={logo} alt="logo"/>

                {/*<span>Pokemons</span>*/}
            </div>
            {
                pokemonItems.length > pokemonsStore.pageSize && <div>
                    <div className="wrapper">
                        <div className="dropdown-wrapper">
                            <ul id="dropdown"  style={{display:'none'}}>
                                {dropDownItems}
                            </ul>
                            <span onClick={this.dropDown}>
                                <i className="fa fa-caret-down"/>
                                <span>{pokemonsStore.pageSize}</span>
                            </span>
                        </div>
                        <Pagination count={this.state.pagesCount} page={Store.pokemonsStore.currentPage}
                                    onChange={this.handleChange} />
                    </div>
                </div>
            }
            <div className="check-box">
                <FormControlLabel
                    control={
                        <Checkbox checked={Store.pokemonsStore.showFavorite}
                                  onChange={this.changeCheckBox} name="showFavorite" />
                    }
                    label="Show only favorite"
                />
            </div>
            <div>
                {(pokemonsList.length === 0 && Store.pokemonsStore.currentPage > 1) && this.changeCurrentPage()}
                { pokemonsList.length === 0 && this.state.pagesCount === 0 ?
                    <EmptyFavoritePokemonsList/> :
                    <PokemonsList
                        searchFavorite = {this.searchFavorite}
                         pokemonsList = {pokemonsList}
                    />
                }
            </div>
        </div>;
        return (
            <div className ="pokemons jumbotron rounded">
                {errorMessage}
                {spinner }
                {!(spinner || errorMessage) && <SearchByName onSearchChange = {this.onSearchChange}/>}
                {content}
            </div>
        );
    }
}
export default observer(Main)