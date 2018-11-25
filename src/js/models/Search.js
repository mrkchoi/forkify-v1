import { apiKey } from '../config';
import axios from 'axios';

export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getResults(query) {
        
        
        try {
            const res = await axios(`https://www.food2fork.com/api/search?key=${apiKey}&q=${this.query}`);
            this.result = res.data.recipes;
            console.log(this.result);
        } catch(error) {
            console.log(error);
        }
        
    }
}


// API Key: eabea68c864b0ffc5d8474c5eaec6679

// https://www.food2fork.com/api/search?key=YOUR_API_KEY&q=chicken%20breast&page=2 



