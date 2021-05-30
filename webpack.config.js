const currentTask = process.env.npm_lifecycle_event;
const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');//čišćenje starih bandlovanih fajlova za objavljivanje
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //  izdvajanje css iz bundled.js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fse = require('fs-extra');

const postCSSPlugins = [
  require("postcss-import"),
  require("postcss-mixins"),
  require('postcss-simple-vars'),
  require('postcss-nested'),
  require('postcss-hexrgba'),
  require('autoprefixer')
]
/**Donji kod je za kopiranje slika u dist */
class RunAfterCompile {
  apply(compiler) {
    compiler.hooks.done.tap('Copy images', function() {
      fse.copySync('./app/assets/images', './docs/assets/images')
    })
  }
}

let cssConfig = {
  test: /\.css$/i,
  use: ['css-loader?url=false', {loader: 'postcss-loader', options: {plugins: postCSSPlugins}}]
}
/**
 * Donji kod je za kreiranje html fajlova kad ih ima više
 */ 
pages = fse.readdirSync('./app').filter(function(file) {
  return file.endsWith('.html');
}).map(function(page) {
  return new HtmlWebpackPlugin({
    filename: page,
    template: `./app/${page}`
  })
});

let config = { // ovde ide ono što je zajedničko obema opcijama
  entry: './app/assets/scripts/App.js', // ovo je entry point
  plugins: pages,
  module: {
    rules: [
      cssConfig,
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env']
          }
        }
      }
    ]
  }
}

if(currentTask == "dev"){
  cssConfig.use.unshift('style-loader');
  config.output = {
    filename: 'bundled.js',
    path: path.resolve(__dirname, 'app') // u ovoj opciji banndlovanje ide u folder app
  },
  config.devServer = {
    before: function(app, server){
      server._watch('app/**/*.html')//kažemo serveru da prati svaki potfolder u folderu app i svaki fajl koji se završava sa .html
    },
    contentBase: path.join(__dirname, 'app'), //ovde ukazujemo gde se  nalazi indexni fajl koji će prozivati
    hot: true, //ovo je property koji kaže da se css/jss sadržaj pojavi u memoriji browsera bez refreša
    port: 4000,
    host: '0.0.0.0' //Ovo omogućava da svaki uređaj može da prati promene, ako je na istoj mreži, da bismo videli koja je ipv4 adresa ukucamo u CL ipconfig i na tu adresu dodamo 3000: 192.168.1.5:3000
  },
  config.mode = "development";
}

if(currentTask == "build"){
  
  cssConfig.use.unshift(MiniCssExtractPlugin.loader);
  postCSSPlugins.push(require('cssnano'));
  config.output = { // ovaj objekat izdvaja iz fajla bundled.js na .js i  .css fajl
    filename: '[name].[chunkhash].js', // ovde određujemo ime koje će se svaku put menjati kada se promeni verzija
    chunkFilename: '[name].[chunkhash].js', // chunkhash daje string brojeva
    path: path.resolve(__dirname, 'docs') // u ovoj opciji banndlovanje ide u folder dist
  },
  config.mode = "production";
  config.optimization = {
    splitChunks: {chunks: 'all'}//ovo je kod za generisanje css-a
  }
  config.plugins.push(
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({filename: 'styles.[chunkhash].css'}),
    new RunAfterCompile()  
  )}

//module.exports = { // ovaj kod odgovara naredbi dev = webpack-dev-server
  //entry: './app/assets/scripts/App.js',
  /*output: {
    filename: 'bundled.js',
    path: path.resolve(__dirname, 'app')
  },*/
  /*
  devServer: {
    before: function(app, server){
      server._watch('app .html');
      //kažemo serveru da prati svaki potfolder u folderu app i svaki fajl koji se završava sa .html
    },
    contentBase: path.join(__dirname, 'app'), //ovde ukazujemo gde se  nalazi indexni fajl koji će prozivati
    hot: true, //ovo je property koji kaže da se css/jss sadržaj pojavi u memoriji browsera bez refreša
    port: 3000,
    host: '0.0.0.0' //Ovo omogućava da svaki uređaj može da prati promene, ako je na istoj mreži, da bismo videli koja je ipv4 adresa ukucamo u CL ipconfig i na tu adresu dodamo 3000: 192.168.1.5:3000
  },
  */
  //mode: 'development',
  //watch: true, - ovo postaje nepotrebno kad se instalira devServer
  /*module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader?url=false', {loader: 'postcss-loader', options: {plugins: postCSSPlugins}}] // primenjuje plaginove na sve fajlove koji se završavaju ekstennzijomm .css
        /**
         * By default, the css-loader will attempt to handle any images we reference in our CSS (e.g. background images, etc...). While this is great in certain situations, for our usage in this course we want to disable this and we'll manage our image files manually. With this in mind, when you list 'css-loader' in your webpack.config.js file you'll want to add an option to the end of it like this 'css-loader?url=false' instead.
         //
      }
    ]
  }*/


module.exports = config; // objakat koji hoćemo da izvezemo iz ovog fajla 