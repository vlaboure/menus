// View la recherche
import { elements } from "./base";

// export const ID = 23;
export const getInput = ()=>elements.searchInput.value;//valeur de l'input de html
//effacer l'input
export const clearInput = ()=>elements.searchInput.value = '';

export const clearRes = ()=>{
    elements.searchResList.innerHTML='';
    elements.searchResPages.innerHTML='';
}

// limite la taille du texte en scindant à la fin d'un mot
const limitRecipeTitle = (title, len = 12)=>{
    const newTitle=[];
    if(title.length > len){
        //split transforme string en array de mots
        title.split(' ').reduce((acc,cur)=>{//reduce assemble chq mot en bouclant 
        if(acc+cur.length<=len)
            newTitle.push(cur);
        return acc + cur.length;// return de reduce
        },0)
        return `${newTitle.join(' ')}...`;
    } 
    return title;
}

//recipe est un élement !! recette
const renderRecipe = recipe=>{
    const markUp = `
    <li>
        <a class="results__link results__link--active" href=${recipe.recipe_id}>
            <figure class="results__fig">
                <img src=${recipe.image_url} alt="Test">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${limitRecipeTitle(recipe.title)} ...</h4>
                <p class="results__author">${limitRecipeTitle(recipe.publisher,20)}</p>
            </div>
        </a>
    </li>
    `
    //ajouter les éléments dans la liste .results__list 
    elements.searchResList.insertAdjacentHTML('beforeend',markUp);
}

//une fonction pour créer les btns
//'prev'ou 'next'
//data-goto -->??
        //AVEC DE {} LE CREATEBTN RETOURNE NULL
const createBtn = (page, type)=>`
    <button class="btn-inline results__btn--${type}" data-goto=${type==='prev' ? page - 1 : page + 1}>
    <svg class="search__icon">
        <use href="img/icons.svg#icon-triangle-${type==='prev' ? 'left':'right'}"></use>
    </svg>
    <span>Page ${type==='prev' ? page - 1 : page + 1}</span>
` 


//definir le nbr de boutons
const renderButtons = (page,numRes,resPerPage)=>{
    //Math.ciel --> arrondit au supperieur ex: 1.1 = 2
    const pages = Math.ceil(numRes/resPerPage);
    let button;
    if(page===1 && pages>1){
        //1ere page afficher next
        button = createBtn(page,'next');
    }else
    if(page < pages){
        //milieu toutes les pages 
        //bouton double ??
        button = `
            ${createBtn(page,'prev')}
            ${createBtn(page,'next')}
        `
    }
    if(page===pages && pages>1){
        //dernière page afficher pervious
        button = createBtn(page,'prev');
    }
    elements.searchResPages.insertAdjacentHTML('afterbegin',button);
};

/***        fonction pour afficher les résultat de la recherche */
//reciepes est un tableau !!
export const renderResults = (recipes,page=1,resPerPage=10)=>{
    //render result search donne 10 recipes car resPerPage=10
    const start = (page-1) * resPerPage;
    const end = page * resPerPage;
    recipes.slice(start,end).forEach(renderRecipe);
    //render button
    renderButtons(page,recipes.length,resPerPage);
}