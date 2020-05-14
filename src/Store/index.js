// import {action, computed, decorate, observable} from "mobx";
// import PokeApiService from "../Services/pokeapi-service";
// import {observer} from "mobx-react";
//
// class Store {
//     pokemonsStore = {
//         name: null,
//         photo: null,
//         pokemons: [],
//         loading: true,
//         term:'',
//         pageSize: 10,
//         totalPokemonsCount: 0,
//         pagesCount: null,
//         currentPage: 1,
//         types:[],
//         gilad: false
//     };
//     set(payload) {
//         this.pokemonsStore=payload;
//     }
//     pokeapiService = new PokeApiService();
//     allPokemons() {
//         let pokemonsStore = this.pokemonsStore;
//         this.pokeapiService.getAll()
//             .then((pokemons) => {
//                 pokemonsStore.push({
//                     pokemons: pokemons.results,
//                     loading: false,
//                     pagesCount: Math.ceil(pokemons.results.length/this.state.pageSize)
//                 });
//             });
//         this.set(pokemonsStore);
//     }
//     onSearchChange = (term) => {
//         let pokemonsStore = this.pokemonsStore;
//         pokemonsStore.push({term});
//         this.set(pokemonsStore);
//     };
//     handleChange = (event, value) => {
//         let pokemonsStore = this.pokemonsStore;
//         pokemonsStore.push({
//             currentPage: value,
//         });
//         this.set(pokemonsStore);
//     };
//     ItemsCountOnPage = (value) => {
//         let pokemonsStore = this.pokemonsStore;
//         pokemonsStore.push({
//             pageSize: value,
//             pagesCount: Math.ceil(pokemonsStore.pokemons.length/pokemonsStore.pageSize)
//         });
//         this.set(pokemonsStore);
//         let a = document.getElementById('dropdown');
//         a.style.display = 'none';
//         // this.filter(this.state.pageSize, value);
//     };
//
//     // setHandle(payload) {
//     //     this.pokemonsStore.currentPage = payload;
//     // }
//     // setItemsCountOnPage(pageSize) {
//     //     this.pokemonsStore.pageSize = pageSize;
//     //     // this.pokemonsStore.pagesCount = pagesCount;
//     // }
//     // handleChange(event, value) {
//     //     // let pokemonsStore = this.pokemonsStore;
//     //     this.pokemonsStore.currentPage=value;
//     //     console.log('VAL', value);
//     //     // let currentPage=value;
//     //     // // currentPage: value
//     //     // this.setHandle(currentPage);
//     // }
//     // ItemsCountOnPage(value) {
//     //     console.log('this.pokemons.length', this.pokemonsStore.pokemons.length);
//     //     let pageSize = value;
//     //     let pagesCount = Math.ceil(this.pokemonsStore.length/this.pokemonsStore.pageSize);
//     //     this.setItemsCountOnPage(pageSize);
//     // };
//
// }
// Store = decorate(Store, {
//     pokemonsStore:observable,
//     allPokemons:observable,
//     onSearchChange:computed,
//     handleChange:computed,
//     ItemsCountOnPage:action
//
//
//     // handleChange:action
// });
// export default new Store();