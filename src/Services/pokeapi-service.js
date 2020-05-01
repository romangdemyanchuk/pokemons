import React from 'react';
import axios from 'axios'

export default class PokeApiService {
    _apiBase = 'https://pokeapi.co/api';
    async getResource(url) {
        const  res = await fetch(`${this._apiBase}${url}`)
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}` + `, received ${res.status}`)
        }
        return await res.json();
    }
    async getAllName() {
        const res = await this.getResource(`/v2/ability/`);
        return res.results;
    }
    getName(id) {
        return this.getResource(`/v2/pokemon/${id}`);
    }
    getAll(pageSize, currentPage) {
        console.log('currentPage', currentPage);
        return this.getResource(`/v2/pokemon?limit=${pageSize}&offset=21`);
    }

    async getPokemonCharacteristic(id) {
        return this.getResource(`/v2/pokemon/${id}`);

    }
    getImagePokemon(id) {

        return (`https://pokeres.bastionbot.org/images/pokemon/${id}.png`);
    }
    async getAllStat() {
        const res = await this.getResource(`/v2/stat/`);
        return res.results;
    }
    getStat(id) {
        return this.getResource(`/v2/stat/${id}`);
    }
}
const pokeapi = new PokeApiService();
// pokeapi.getAll().then((body) => {
//     console.log(body);
// });


