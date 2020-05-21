import React, {Component} from 'react';
import PokeApiService from "../../Services/pokeapi-service";
import Preloader from '../Preloader';
import PokemonsList from '../PokemonsList';
import Pagination from '@material-ui/lab/Pagination';
import SearchByName from '../SearchByName/SearchByName';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import EmptyFavoritePokemonsList from '../EmptyFavoritePokemonsList/emptyFavoritePokemonsList'
import spliteUrl from "../Helpers/spliteUrl";
import Checkbox from "@material-ui/core/Checkbox";
import {observer} from "mobx-react";
import ErrorIndicator from "../ErrorIndicator/errorIndicator";
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
        pageSize: 10,
        totalPokemonsCount: 0,
        pagesCount: null,
        currentPage: 1,
        types:[],
        showFavorite: false,
        error: false
    };
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
                     pagesCount: Math.ceil(pokemons.results.length/this.state.pageSize)
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
             let id = spliteUrl(item.url);
            localitems.includes(id) && favoriteItems.push(item);
        });
        this.setState({
            favouritePokemons: favoriteItems,
            pagesCount: Math.ceil( (this.state.showFavorite ? favoriteItems.length : pokemons.length)/this.state.pageSize)
        });
    };
    handleChange = (event, value) => {
        this.setState({
            currentPage: value,
            pagesCount: Math.ceil(this.state.pokemons.length/this.state.pageSize)
        });
    };
    itemsCountOnPage = (value) => {
        this.setState({
            pageSize: value,
            pagesCount: Math.ceil(this.state.pokemons.length/value),
        });
        let a = document.getElementById('dropdown');
            a.style.display = 'none';
    };
    dropDown = () => {
        let a = document.getElementById('dropdown');
        (a.style.display === 'none') ? ( a.style.display = 'block') : a.style.display = 'none';
    };
    changeCheckBox = e => {
        this.setState({
            [e.target.name]: e.target.checked,
            currentPage: 1
        }, () => {
            this.searchFavorite()
        })
    };
    changeCurrentPage = () => {
        this.setState(prevState => ({
            currentPage: prevState.currentPage-1
        }));
    };
    slicePokemonsPages = (value) => {
        const {currentPage, pageSize} = this.state;
        const currPage = (currentPage ? currentPage - 1 : 0);
        return value.slice(currPage*pageSize, currPage*pageSize + pageSize)
    };
    filterButtons = [10, 20, 50];
    render() {
        const {loading, term, pokemons, pageSize, currentPage, showFavorite, favouritePokemons, error} = this.state;
        let pokemonItems = showFavorite ? favouritePokemons : pokemons;
        pokemonItems = this.search(pokemonItems, term);
        const pokemonsList = pokemonItems.length === 0 ? [] : this.slicePokemonsPages(pokemonItems);
        let dropDownItems = this.filterButtons.map((item) => {
            return (
                <li key={item}>
                    <button
                        onClick={() => this.itemsCountOnPage(item)}
                        className={pageSize === item ? "paginate active" : "paginate"}
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
            {
                pokemonItems.length > pageSize && <div>
                    <ul id="dropdown"  style={{display:'none'}}>
                        {dropDownItems}
                    </ul>
                    <div className="wrapper">
                        <div className="paginate-wrapper" onClick={this.dropDown}>
                            <i className="fa fa-caret-down"></i>
                            <span>{pageSize}</span>
                        </div>
                    </div>
                    <Pagination count={this.state.pagesCount} page={currentPage} onChange={this.handleChange} />
                </div>
            }
            <div className="check-box">
                <FormControlLabel
                    control={
                        <Checkbox checked={showFavorite} onChange={this.changeCheckBox} name="showFavorite" />
                    }
                    label="Show only favorite"
                />
            </div>
            <div>
                {(pokemonsList.length === 0 && currentPage > 1) && this.changeCurrentPage()}
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