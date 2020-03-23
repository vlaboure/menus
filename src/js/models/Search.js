    // model de searchView
import axios from 'axios';



export default class Search{
    constructor(query){
        this.query = query;
    }
    async getResult(){
        const proxy='https://cors-anywhere.herokuapp.com/'
        const key = '462b1cc8d4f2730081462fbc65136320';
        // on peut utiliser fetch mais pour compatibilité on utlilse axios
        // ce qui permet une meilleur gestion d'erreur
        try{
            //la recherche est faite dans l'api
            const res = await axios(`https://forkify-api.herokuapp.com/api/search?&q=${this.query}`);
            this.result = res.data.recipes;
        }
        catch(e){
            alert(`Votre recherche ${this.query} n'a pas été trouvée\nErreur ${e}`);
        }
    }
}

