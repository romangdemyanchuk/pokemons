import React, {Component} from 'react';
import PokeApiService from "../../Services/pokeapi-service";
import Spinner from '../Spinner';
import PokemonsList from '../Pokemons-list';
import Pagination from '@material-ui/lab/Pagination';
import SearchByName from '../SearchByName/SearchByName';
import store from '../../Store'
import {observer} from "mobx-react";
import './pokemons.css';

class Pokemons extends Component {
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
        currentPage: 1
    };
    constructor() {
        super();
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
    handleChange = (event, value) => {
        this.setState({
            currentPage: value,
        });
    };
    ItemsCountOnPage = (value) => {
        this.setState({
            pageSize: value,
            pagesCount: Math.ceil(this.state.pokemons.length/this.state.pageSize)
        });
    };
    render() {
        const {loading, term, pokemons, pageSize, currentPage, pagesCount} = this.state;
        const visibleItems=this.search(this.state.pokemons, term);
        const pkms = visibleItems ? visibleItems : pokemons;
        const currPage = (currentPage ? currentPage - 1 : 0);
        const spinner = loading ? <Spinner/> : null;
        const content = !loading && <div>
            <div>
                <button onClick={()=> this.ItemsCountOnPage(10)}>10</button>
                <button onClick={()=> this.ItemsCountOnPage(20)}>20</button>
                <button onClick={()=> this.ItemsCountOnPage(50)}>50</button>

            </div>
            <Pagination count={pagesCount} page={currentPage} onChange={this.handleChange} />
            <div>
                <PokemonsList pokemonsList={pkms.slice(currPage*pageSize, currPage*pageSize+pageSize)}/>
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
export default observer(Pokemons)