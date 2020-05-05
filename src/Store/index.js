import {action, decorate, observable} from "mobx";
import {observer} from "mobx-react";

class Store {
    pokemonsStore = [{
        name: null,
        photo: null,
        pokemons: [],
        loading: true,
        term:'',
        pageSize: 10,
        totalPokemonsCount: 0,
        pagesCount: null,
        currentPage: 1
    }];
    setHandle(payload) {
        this.pokemonsStore.currentPage = payload;
    }
    setItemsCountOnPage(pageSize) {
        this.pokemonsStore.pageSize = pageSize;
        // this.pokemonsStore.pagesCount = pagesCount;
    }
    handleChange(event, value) {
        // let pokemonsStore = this.pokemonsStore;
        this.pokemonsStore.currentPage=value;
        console.log('VAL', value);
        // let currentPage=value;
        // // currentPage: value
        // this.setHandle(currentPage);
    }
    ItemsCountOnPage(value) {
        console.log('this.pokemons.length', this.pokemonsStore.pokemons.length);
        let pageSize = value;
        let pagesCount = Math.ceil(this.pokemonsStore.length/this.pokemonsStore.pageSize);
        this.setItemsCountOnPage(pageSize);
    };

}
Store = decorate(Store, {
    pokemonsStore:observable,
    handleChange:action
});
export default new Store();