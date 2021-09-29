# Architecture

[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

Use Lerna to get a mono repo with multiple node package

## Mandatory dependencies

You need to have **lerna**, **rollup**, and **nodejs > 10** to build this repository

Run `npm install -g lerna` to install lerna globally
Run `npm install -g rollup` to install rollup globally
    
## Duplicate a web component

If you want to duplicate a web component to create a similar one, you can use the custom widget builder (cwb) CLI.  
First install the CLI:
```bash
$ npm install -g @bonitasoft/custom-widget-builder
```
Then go to widgets folder and run the cwb command, for instance to duplicate the `uid-input` web component to the new `my-input`:
```bash
$ cwb duplicate-widget --srcDir uid-input --destDir my-input
```

## Build all packages

You need to run `npm run init` first when you cloning this repository.

Then you can run `npm run bundle`. It will be compile and bundle all components.
    
## Run tests
Once the components are compiled, you can run the tests:

    npm run test
    
### Run a single test
To run a single test:

    npm run test:single -- --grep packages/search-box/test/search-box.test.js
    
- To run/debug from IntelliJ, you may create a Karma configuration

    
## Run lerna command on only one package

    lerna run --scope [packages] [options]
    
For example: `lerna run --scope bo-element-typescript start --stream` to start dev bo-element-typescript environment
    
    
## Run prettier on all packages

    npm run start lint
    
    
## Breakpoint in IntellJ

Run your `npm run start` like always.

On your `index.html`, Right click and select `Debug index.html` entry. After this, you can put breakpoint in your Ts or Js code.


## To bump all dependencies to latest versions
`npm i -g npm-check-updates`

`ncu -u`

`npm install`

## Publish a new release on npm registry

Check the web components are ready:  
`npm run bundle`  
`npm run test`

Install custom-widget-builder package globally (if not already done):
`npm install -g @bonitasoft/custom-widget-builder`

Go to each web component directory to publish, and run:  
`npm run gen-widget-assets`  
`npm version <new version>`  
`npm run publish`  

Then tag the repo with the new version.

Note: this should be automatized when the repo rework will be done

   
