import React, {Component} from 'react';
import PokeApiService from "../../Services/pokeapi-service";
import Spinner from '../Spinner';
import PokemonsList from '../PokemonsList';
import Pagination from '@material-ui/lab/Pagination';
import SearchByName from '../SearchByName/SearchByName';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from "@material-ui/core/Checkbox";
import {observer} from "mobx-react";
import './main.css';
import {withMobileDialog} from "@material-ui/core";

class Main extends Component {
    pokeapiService = new PokeApiService();
    state= {
        name: null,
        photo: null,
        pokemons: [],
        loading: true,
        term:'',
        pageSize: 10,
        totalPokemonsCount: 0,
        pagesCount: null,
        currentPage: 1,
        types:[],
        gilad: false
    };
    componentDidMount() {
        this.allPokemons();
    }
     allPokemons() {
         this.pokeapiService.getAll()
             .then((pokemons) => {
                 this.setState({
                     pokemons: pokemons.results,
                     loading: false,
                     pagesCount: Math.ceil(pokemons.results.length/this.state.pageSize)
             });
        });
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
    searchFavorite(items) {

        const localItems = localStorage.getItem("items");
        console.log('localItems', localItems);
        if(localItems.length === 0) {
            return items;
        }
        // return items.filter((item) =>{
        //     return item.id.findIndex(localItems) > -1;
        // });
    }

    handleChange = (event, value) => {
        this.setState({
            currentPage: value,
            pagesCount: Math.ceil(this.state.pokemons.length/this.state.pageSize)
        });
    };
    ItemsCountOnPage = (value) => {
        this.setState({
            pageSize: value,
            pagesCount: Math.ceil(this.state.pokemons.length/value),
        });
        let a = document.getElementById('dropdown');
            a.style.display = 'none';
    };
    DropDown = () => {
        let a = document.getElementById('dropdown');
        if ( a.style.display === 'none' )
            a.style.display = 'block';
        else
        if ( a.style.display === 'block' )
            a.style.display = 'none';
    };
    ChangeCheckBox = event => {
        this.setState({
             [event.target.name]: event.target.checked
        })
    };
    filterButtons = [10, 20, 50];
    render() {
        const {loading, term, pokemons, pageSize, currentPage, gilad} = this.state;
        const visibleItems = this.search(pokemons, term);
        const favoritePokemons = this.searchFavorite(pokemons);
        const pkms = visibleItems ? visibleItems : pokemons;
        const currPage = (currentPage ? currentPage - 1 : 0);
        let dropDownItems = this.filterButtons.map((item) => {
            return (
                <li key={item}>
                    <button
                        onClick={() => this.ItemsCountOnPage(item)}
                        className={pageSize === item ? "paginate active" : "paginate"}
                    >
                        {item}
                    </button>
                </li>
            )
        });
        const spinner = loading ? <Spinner/> : null;
        const content = !loading && <div>
            <div className="wrapper">
                <div className="paginate-wrapper" onClick={this.DropDown}>
                    <a><i className="fa fa-caret-down"/></a>
                    <span>{pageSize}</span>
                </div>
                <ul id="dropdown"  style={{display:'none'}}>
                    {dropDownItems}
                </ul>
            </div>
            <Pagination count={this.state.pagesCount} page={currentPage} onChange={this.handleChange} />
            <div>
                <FormControlLabel
                    control={
                        <Checkbox checked={gilad} onChange={this.ChangeCheckBox} name="gilad" />
                    }
                    label="Show favorite pokemons"
                />
            </div>
            <div>
                <PokemonsList pokemonsList= {gilad ? pokemons : pkms.slice(currPage*pageSize, currPage*pageSize+pageSize)}/>
            </div>
        </div>;
        return (
            <div className="pokemons jumbotron rounded">
                {spinner }
                {!spinner && <SearchByName onSearchChange={this.onSearchChange}/>}
                {content}
            </div>
        );
    }
};
export default observer(Main)