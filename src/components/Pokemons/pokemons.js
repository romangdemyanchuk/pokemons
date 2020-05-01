import React, {Component} from 'react';
import PokeApiService from "../../Services/pokeapi-service";
import Spinner from '../Spinner';
import PokemonsList from '../Pokemons-list';
import Pagination from '@material-ui/lab/Pagination';
import { MemoryRouter, Route } from 'react-router';
import { Link } from 'react-router-dom';
import PaginationItem from '@material-ui/lab/PaginationItem';
import SearchByName from '../SearchByName/SearchByName';
import './pokemons.css';

export default class Pokemons extends Component {
    pokeapiService = new PokeApiService();
    state= {
        name: null,
        photo: null,
        pokemons: [],
        loading: true,
        term:'',
        pageSize:20,
        totalPokemonsCount:0,
        currentPage:1
        // avatar:null,
        // type: null,
        // stats: null
    };
    constructor() {
        super();
        this.allPokemons();
    }
     allPokemons() {

         this.pokeapiService.getAll(this.state.pageSize, this.state.currentPage)
             .then((pokemons) => {
                 this.setState({
                     pokemons: pokemons.results,
                     totalPokemonsCount:pokemons.count,
                     loading: false
                 });
                 console.log('pokemons.count',pokemons.count);
        });
     }
    onSearchChange = (term) => {
        this.setState({term});
    };
    search(items, term) {
        if(term.length===0) {
            return items;
        }
        return items.filter((item) =>{
            return item.name.toLowerCase().indexOf(term.toLowerCase()) > -1;
        });
    }
    onPageChanged = (pageNumber) => {
        this.SetCurrentPage(pageNumber);
        this.pokeapiService.getAll(this.state.pageSize, this.state.currentPage)
            .then((pokemons) => {
                this.setState({
                    pokemons: pokemons.results,
                    totalPokemonsCount:pokemons.count,
                    loading: false
                });
            });
    }
    SetCurrentPage = (id) => {
        // console.log('id', id);
        this.setState({
            currentPage:id
        });
    };
    render() {
        const {loading, term, pokemons,
            pageSize, totalPokemonsCount, currentPage} = this.state;
        const visibleItems=this.search(this.state.pokemons, term);
        let pagesCount = Math.ceil(totalPokemonsCount/pageSize);
        let pages = [];
        for (let i = 1;i <= pagesCount;i++) {
            pages.push(i);
        }

        const spinner = loading ? <Spinner/> : null;
        const content = !loading && <div>
            {/*<PaginationItem>*/}
            {/*    {pages.map(p => {*/}
            {/*        return <span className={(currentPage===p && "selectedPage")}*/}
            {/*        onClick={(e) => this.onPageChanged(p)}>{p}</span>*/}
            {/*    })*/}
            {/*    }*/}
            {/*</PaginationItem>*/}
            <MemoryRouter initialEntries={['/inbox']} initialIndex={0}>
                <Route>
                    {({ location }) => {
                        const query = new URLSearchParams(location.search);
                        const page = parseInt(query.get('page') || '1', 10);
                        return (
                            <Pagination
                                page={page}
                                count={pagesCount}
                                renderItem={(item) => (
                                    <PaginationItem
                                        onClick={(e) => this.onPageChanged(item)}
                                        component={Link}
                                        to={`/inbox${item.page === 1 ? '' : `?page=${item.page}`}`}
                                        {...item}
                                    />
                                )}
                            />
                        );
                    }}
                </Route>
            </MemoryRouter>
            <div className="progress">

            </div>
            <div>
                <PokemonsList pokemonsList={visibleItems ? visibleItems : pokemons}/>
            </div>
        </div>

        return (
            <div className="pokemons jumbotron rounded">
                {spinner }
                {!spinner && <SearchByName onSearchChange={this.onSearchChange}/>}
                {content}
            </div>
        );
    }
};