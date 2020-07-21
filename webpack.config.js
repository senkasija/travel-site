const path = require('path')

const postCSSPlugins = [
  require("postcss-import"),
  require("postcss-mixins"),
  require('postcss-simple-vars'),
  require('postcss-nested'),
  require('autoprefixer')
]

module.exports = {
  entry: './app/assets/scripts/App.js',
  output: {
    filename: 'bundled.js',
    path: path.resolve(__dirname, 'app')
  },
  devServer: {
    before: function(app, server){
      server._watch('app/**/*.html')//kažemo serveru da prati svaki potfolder u folderu app i svaki fajl koji se završava sa .html
    },
    contentBase: path.join(__dirname, 'app'), //ovde ukazujemo gde se  nalazi indexni fajl koji će prozivati
    hot: true, //ovo je property koji kaže da se css/jss sadržaj pojavi u memoriji browsera bez refreša
    port: 3000,
    host: '0.0.0.0' //Ovo omogućava da svaki uređaj može da prati promene, ako je na istoj mreži, da bismo videli koja je ipv4 adresa ukucamo u CL ipconfig i na tu adresu dodamo 3000: 192.168.1.5:3000
  },
  mode: 'development',
  //watch: true, - ovo postaje nepotrebno kad se instalira devServer
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader?url=false', {loader: 'postcss-loader', options: {plugins: postCSSPlugins}}]
        /**
         * By default, the css-loader will attempt to handle any images we reference in our CSS (e.g. background images, etc...). While this is great in certain situations, for our usage in this course we want to disable this and we'll manage our image files manually. With this in mind, when you list 'css-loader' in your webpack.config.js file you'll want to add an option to the end of it like this 'css-loader?url=false' instead.
         */
      }
    ]
  }
}