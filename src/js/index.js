// // // Global app controller

// import str from './models/Search';
// // import {add,mul,ID} from './views/searchView';
// import * as searchView from './views/searchView';
// // console.log(`addition import ${add(ID,2)} multiplication import ${mul(3,5)} et ${str} de views`)
// console.log(`addition import ${searchView.add(searchView.ID,2)} multiplication import ${searchView.mul(3,5)} et ${str} de views`)
import Search from './models/Search';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import {elements,renderLoader,clearLoader} from './views/base';// pourquoi {} ???
import Recipe from './models/Recipe';
import { renderRecipe } from './views/recipeView';

/**globalState obj
 * -search
 * -current recipe
 * -shoping list
 * -liked
 * 
 */
/// *******************index = controleur de tt l'app
///

/***
 *      search controller*************************************************
 *  */ 
const state = {}//objet mémorisant tout les obj
const controlSearch = async()=>{

    const query  = searchView.getInput();//récup après de searchView
    if(query){ 
         //chercher l'objet
        state.search = new Search(query);
        searchView.clearInput();
        searchView.clearRes();
        try{
            //recette
            await state.search.getResult();
            // prépa UI pour affichage
            clearLoader();
        
            //afficher-- appel de renderResult avec le result de l'objet search 
            searchView.renderResults(state.search.result);
        }catch(e){
            alert(`erreur ${e}`);
            clearLoader();
        }

            // appel du spiner géré dans base appliqué sur la liste de menus(parent)
   //     renderLoader(elements.searchRes);
     
    }
}

elements.searchForm.addEventListener('submit',e=>{
    e.preventDefault();
    controlSearch();
});

elements.searchRes.addEventListener('click',e=>{
    //closest pour executer le click sur le btn qu'on clique sur la flèche ou numéro ou btn
    const btn = e.target.closest('.btn-inline');
    //.btn-inline on clique sur le btn
    if(btn){
        // parseInt(x,10) de str à nombre base 10        
        const goToPage = parseInt(btn.dataset.goto,10);
        searchView.clearRes();
        searchView.renderResults(state.search.result,goToPage);
    }
})
/******************************************************************** */

/**
 *      recette controller
 */

const ControlRecipe = async()=>{
    const id = window.location.hash.replace('#','');
   
    //prepare UI
    if(id){
        renderLoader(elements.recipe);
        //create object Recipe
        state.recipe = new Recipe(id);

        try{
            //call function*
            await state.recipe.getRecipe();
            //call calcul et pars ingredients
            state.recipe.parseIngredients();
            state.recipe.calcTime();
            state.recipe.calcServing();
            //render obj
            clearLoader();
            renderRecipe(state.recipe);
            console.log(state.recipe);
        }catch(e){
            console.log(state.recipe);
            alert(e+' rederloader');// ici erreur
        }
    }
}

// window.addEventListener('hashchange',ControlRecipe);
// window.addEventListener('load',ControlRecipe);
    //-------------|
    //             |
 //  Equivalant utilisation d'un array
 //avec hashchange-->quand id change 
 //avec load --> au chargement
 ['hashchange','load'].forEach(e=>window.addEventListener(e,ControlRecipe));   