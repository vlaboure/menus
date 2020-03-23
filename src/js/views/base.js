// pour clarifier les modules
export const elements = {//pourquoi et const et pas default
    searchForm : document.querySelector('.search'),
    searchInput : document.querySelector('.search__field'),
    searchResList : document.querySelector('.results__list'),
    searchRes : document.querySelector('.results'),
    searchResPages : document.querySelector('.results__pages'),
    recipe : document.querySelector('.recipe')
}

export const elementStr = {
    loader : 'loader'
}


//renderLoader dans base pour être accessible de partout
/***                                           SPINER
 * Argument parent pour avoir accès à l'enfant
 * on attache le loader comme enfant du parent
 */
export const renderLoader = parent=>{
    //la methode de spiner :
    //1-la classe loader du css 
    const loader =`
        <div class=${elementStr.loader}>
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;
    //placé juste après <div class"result">
    parent.insertAdjacentHTML('afterbegin',loader);
}//svg-->icone du loader
//#icon-cw--> id de l'icone choisie


//on efface le spiner PAS D'ARGUMENT !!! VINCENT
export const clearLoader = ()=>{
    const loader = document.querySelector(`.${elementStr.loader}`);
    if(loader)
        loader.parentElement.removeChild(loader);
}