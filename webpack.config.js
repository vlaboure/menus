const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//pour export via node js
module.exports = {
    //pt entree, sortie
    //loaders et plugins
    //  ./-->rep courant  ../-->rep parent
    entry : ['./src/js/index.js'],
    output : {
        path : path.resolve(__dirname,'dist'),
        filename : 'js/bundle.js'
    },
    devServer : {
        contentBase : './dist'
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename : 'index.html',
            template : './src/index.html'
        })
    ],
    module:{
        rules:[
            {
                //babel --> transforme du ES6 en ES5
                //regex pour tester tous les fichier .js
                test : /\.js$/,
                exclude : /node_modules/, // pour ne pas appliquer sur tous les fichiers modules
                use :{
                    loader : 'babel-loader'
                }
            }
            
        ]
    }
   
}