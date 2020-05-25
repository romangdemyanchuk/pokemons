export default class PokeApiService {
    _apiBase = 'https://pokeapi.co/api';
    async getResource(url) {
        console.log(`${this._apiBase}${url}`)
        const  res = await fetch(`${this._apiBase}${url}`);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url} received ${res.status}`)
        }
        return await res.json();
    }

    getAll() {
        return this.getResource(`/v2/pokemon?limit=100/`);
    }
    async getPokemonCharacteristic(id) {
        return this.getResource(`/v2/pokemon/${id}`);
    }
}


