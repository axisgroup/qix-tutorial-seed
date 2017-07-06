# qix-tutorial-seed
A seed project for creating a simple dashboard with QIX and Enigma

## Usage
This project takes JavaScript written in the `src/index.js` file and bundles it into the file `dist/bundle.js`. This file is loaded by the `dist/index.html` file, where our dashboard will be created.

To use the seed, first:

1) Install all dependencies via `npm install`
2) Build a bundle using the script `npm run bundle`
3) Host the dashboard locally using the script `npm run serve`

You can also use the script `npm run watch` if you want webpack to listen for your JS changes and build new bundles on the fly.