import { decorate, observe, observable} from "mobx";

class Store {
    pokemonsStore = {
        pageSize: 10,
        currentPage: 1,
        showFavorite: false
    };
    set(payload) {
        this.pokemonsStore=payload;
    }
    ChangePageSize = (value) => {
            this.pokemonsStore.pageSize = value;
        };
    ChangeCurrentPage = (value) => {
        this.pokemonsStore.currentPage = value;
    };
    ChangeShowFavorite = () => {
        this.pokemonsStore.showFavorite = !this.pokemonsStore.showFavorite;
    };
    // changeCurrentPage = () => {
    //
    //         observe( (newValue, oldValue) => {
    //             console.log('oldValue', oldValue);
    //             this.pokemonsStore.currentPage = oldValue-1;
    //         });
    // };

}
Store = decorate(Store, {
    pokemonsStore:observable
});
export default new Store();