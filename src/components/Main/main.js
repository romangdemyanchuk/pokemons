import React, {Component} from 'react';
import PokeApiService from "../../Services/pokeapi-service";
import Spinner from '../Spinner';
import PokemonsList from '../PokemonsList';
import Pagination from '@material-ui/lab/Pagination';
import { Button } from '@material-ui/core';
import SearchByName from '../SearchByName/SearchByName';
import store from '../../Store'
import {observer} from "mobx-react";
import './main.css';

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
        filter:'',
        types:[]
    };
    componentDidMount() {
        this.allPokemons();
        // this.allTypes();
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
    // allTypes() {
    //     this.pokeapiService.getAllTypes(this.props.match.params.id)
    //         .then((pokemons) => {
    //             this.setState({
    //                 t
    //             });
    //             console.log('pokemons.types', pokemons.types);
    //         });
    // }
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
    filter(pageSize, value) {
        console.log('pageSize', pageSize);
        console.log('value', value);
        // if (this.state.pageSize===value)
        // switch (filter) {
        //     case '10':
        //         return console.log('10');
        //     case '20':
        //         return console.log('20');
        //     case '50':
        //         return console.log('50');
        // }
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
        let a = document.getElementById('dropdown');
            a.style.display = 'none';
        this.filter(this.state.pageSize, value);
    };
    DropDown = () => {
        let a = document.getElementById('dropdown');
        if ( a.style.display === 'none' )
            a.style.display = 'block';
        else
        if ( a.style.display === 'block' )
            a.style.display = 'none';
    };
    render() {
        const {loading, term, pokemons, pageSize, currentPage, pagesCount} = this.state;
        const visibleItems=this.search(pokemons, term);
        const pkms = visibleItems ? visibleItems : pokemons;
        const currPage = (currentPage ? currentPage - 1 : 0);
        const spinner = loading ? <Spinner/> : null;
        const content = !loading && <div>
            <div className="wrapper">
                <a onClick={this.DropDown}><i className="fa fa-caret-down"/></a>
                <span>{pageSize}</span>
                <ul id="dropdown"  style={{display:'none'}}>
                    <li><Button onClick={()=> this.ItemsCountOnPage(10)} className="paginate">10</Button></li>
                    <li><Button onClick={()=> this.ItemsCountOnPage(20)} className="paginate">20</Button></li>
                    <li><Button onClick={()=> this.ItemsCountOnPage(50)} className="paginate">50</Button></li>
                </ul>
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
export default observer(Main)