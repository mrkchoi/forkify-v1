import Search from './models/Search';
import * as searchView from './views/searchView';
import { elements, renderLoader, clearLoader } from "./views/base";

/*****************
 * Global state of app
// - Search object
// - Current recipe object
// - Shopping list object
// - Liked recipes
*****************/
const state = {}

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

        // Search for recipes
        await state.search.getResults();

        // Render results in UI
        clearLoader();
        searchView.renderResults(state.search.result);
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
