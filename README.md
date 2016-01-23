# Graph Algorithms
Demonstration of graphs and graph algorithms in CoffeeScript using JS framework jsnetworkx.

## Usage
Simply open `dist/index.html` file in your favorite browser.

## Development
If you want to contribute or use for your purposes, simply modify source files in `src`. Remember you have to download bower and npm packages with
```
npm install && bower update
```

If you don't have gulp installed locally, you have to install it first (you might need to run it with `sudo`)
```
npm install gulp -g
```

Then gulp will do the rest.
```{bash}
gulp
```

Server will now run on [http://localhost:8080](http://localhost:8080) with support of livereload.

## Troubleshooting
When any error occurs, you can try to delete folders `dest`, `bower_components` and `node_modules` and run
```
bower update && npm install
```

## Tools & langs
* gulp
* less
* CoffeeScript
* imagemin
* d3.js
* jsnetworkx


## License

The content of this project is licensed under the [Creative Commons Attribution 3.0 license](http://creativecommons.org/licenses/by/3.0/us/deed.en_US).
