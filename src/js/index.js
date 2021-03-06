import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import { elements, renderLoader, clearLoader } from "./views/base";
import { Fraction } from 'fractional';

/*****************
 * Global state of app
// - Search object
// - Current recipe object
// - Shopping list object
// - Liked recipes
*****************/
const state = {}

/******************** 
 * Search Controller
*********************/
const controlSearch = async () => {
    // 1. get query from view
    const query = searchView.getInput(); // TODO
    console.log(query);
    // 2. 
    if(query) {
        // New search object and add to state
        state.search = new Search(query);

        // Prepare UI to show data
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);

        try {
            // Search for recipes
            await state.search.getResults();

            // Render results in UI
            clearLoader();
            searchView.renderResults(state.search.result);
        } catch {
            alert('Something went wrong with the search...');
            clearLoader();
        }

        
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if(btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
    }
});


/******************** 
 * Recipe Controller
*********************/
const controlRecipe = async () => {
    // Get ID from url
    const id = window.location.hash.replace('#', '');

    if(id) {
        // Prepare UI for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        // Highlight selected search item
        if(state.search) {
            searchView.highlightSelected(id);
        }
        
        // Create new recipe object
        state.recipe = new Recipe(id);

        // // TESTING
        // window.r = state.recipe;

        // Get recipe data and parse ingredients
        try {
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();

            // Calculate servings and time
            state.recipe.calcTime();
            state.recipe.calcServings();

            // Render recipe to UI
            clearLoader();
            recipeView.renderRecipe(state.recipe);
            
        } catch {
            alert('Error processing recipe!');
        }
        


    }
}

// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));
