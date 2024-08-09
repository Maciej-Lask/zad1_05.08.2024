const path = require('path');

module.exports = {
  mode: 'development', // tryb developerski
  entry: './utils/convert.js', // plik wejściowy
  output: {
    filename: 'bundle.js', // nazwa wyjściowego pliku
    path: path.resolve(__dirname, 'dist'), // ścieżka do katalogu wyjściowego
    library: 'MyLibrary', 
    libraryTarget: 'var',
  },
};
