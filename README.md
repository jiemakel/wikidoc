# App

## Building

### Prequisites

 1. Make sure you have [Node.js](https://nodejs.org/en/) installed (for example using [nvm](https://github.com/creationix/nvm)).
 1. Make sure you have [Typings](https://github.com/typings/typings) installed (`npm install -g typings`)
 1. Make sure you have [Bower](http://bower.io/) installed (`npm install -g bower`)
 1. Make sure you have [Gulp](http://gulpjs.com/) installed (`npm install -g gulp`)

### Setting up the build environment

Run `npm install`. This should also automatically run `typings install` and `bower install`, but if it doesn't, run those yourself.

### Building

To simply build the project, run `gulp`. However, when actually working, you probably want to use `gulp serve`, which spawns the app in a browser, and stays to watch for changes in the project files, automatically recompiling them and reloading them into the browser.

To build a distribution version of the project (with e.g. combined and minified js and css files), use `gulp dist`. This will create the directory `dist`, which you can then copy to your production server.
