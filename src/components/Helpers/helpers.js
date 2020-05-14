export const checkIsFavorite = (setFavorite, pokemonId) => {
    const localItems = localStorage.getItem("items");
    if (!localItems) {
        setFavorite(false);
    } else {
        const items = JSON.parse(localItems);
        const index = items.findIndex((el) => el === parseInt(pokemonId));
        if(index !== -1) {
            setFavorite(true);
        }
        else {
            setFavorite(false);
        }
    }
};