import axios from 'axios'
import {cookTime} from '../config'


export default class Recipe{
    constructor(id){
        this.id = id;
    }
    async getRecipe(){
        try{
            const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);                 
            this.title = res.data.recipe.title;
            this.author = res.data.recipe.publisher;
            this.image = res.data.recipe.image_url;
            this.url = res.data.recipe.source_url;
            this.ingredients = res.data.recipe.ingredients;
       
        }catch(e){
            alert(`Erreur à l'affichage de la page\nErreur : ${e}`);
        }
        
    }
    calcTime(){
        const nbIngr = this.ingredients.length;
        const period = Math.ceil(nbIngr/3);
        this.time = period * cookTime;
    }
    calcServing(){
        this.serving = 4;
    }
    parseIngredients(){
        const unitLong=['tabelspoons','tabelspoon','ounce','ounces','teaspoon','teaspoons','cups','pounds'];
        const unitShort=['tbsp','tbsps','oz','oz','tsp','tsps','cup','pound'];
        const units=[...unitShort,'kg','g','l','cl','ml'];//international
        // map --> parcourt du tableau this.ingredients et fait une copie dans newIngredients
        const newIngredients = this.ingredients.map(el=>{
            //mise en majuscule de chaque element du tableau
            let ingredient = el.toLowerCase();
            unitLong.forEach((unit,i)=>{                            
                ingredient = ingredient.replace(unit, unitShort[i]);               
            }); 
            //supprimer texte entre()--> regex
             ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

            //enfin extraire les nombres 
            //3 cas nombre+unité/nombre sans unité/pas de nombre*
            const arrIngredient = ingredient.split('');// tableau avec chk element de ingredient
            //récupère la pos où est le nombre
            let objIng; //objet qui stocke
                        //nombre/unité/ingrédient
                      
            const index = arrIngredient.findIndex(el2=>units.includes(el2));
            let count;        
            if(index >-1){
                 //taille des numbers
                const arrCount = arrIngredient.slice(0,index);
                if(arrCount.length === 1){
                    // comme dans le ficher les rosbeefs considèrent 1-1/4
                    // c'est du fait de leurs unités....
                    count = eval(arrIngredient[0].replace('-','+')); 
                    //eval remplace un string '2+2' en int 4 et  '4-2'en int 2
                }else 
                // exemple pour 1 1/4 -->donne 1+1/4
                    count = eval(arrIngredient.slice(0,index).join('+'));
                objIng = {
                    count,
                    unit : arrIngredient[index],
                    ingredient : arrIngredient.slice(index + 1).join(' ')
                };
                //parsint renvoie un bool
            }else if(parseInt(arrIngredient[0],10)){
                //on suppose le chiffre en 1ere position
                objIng = {
                    num : parseInt(arrIngredient[0],10),
                    unit : '',
                    ingredient : arrIngredient.slice(1).join(' ')
                }
            }
            else if(index ===-1){
                objIng = {
                    num : 1,
                    unit : '',
                    ingredient                     
                }
            }
             // return obligatoire avec array.map
            return objIng;
        });
        // this.ingredient point maintenant sur le nouveau tableau
        this.ingredients = newIngredients;
        console.log(newIngredients);
    }
}