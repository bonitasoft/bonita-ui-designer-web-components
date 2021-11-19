# bonita-ui-designer-web-components

This single repository contains all the web components of the Bonita UI Designer widgets.  
Each web component is packaged separately in a npm package.

You can create a new web component by duplicating one, or create a web component from scratch.

For the first option, you can use the [custom widget builder (cwb) CLI](https://github.com/bonitasoft/bonita-ui-designer-sdk/blob/main/custom-widget-builder/README.md).
For the second option, you can use the [open-wc CLI](https://open-wc.org/guides/developing-components/getting-started/).

---

## ➤ Create a web component from an existing one

To avoid to start from scratch, we recommend to start from an existing web component of this repository.
Choose the one you want to extend, or which has similarities with the component you want to create. Then, duplicate it as explained below.

---
### Install the cwb CLI
See [here](https://github.com/bonitasoft/bonita-ui-designer-sdk/blob/main/custom-widget-builder/README.md#-installation) for details.

---
### Duplicate the web component  

For instance if you want to extend the `uid-input` web component and create `my-input`:  

  ```bash
  $ cd components
  $ cwb duplicate-widget --srcDir uid-input --destDir my-input
  ````

---
### Install its dependencies:
  ```bash
  $ cd my-input
  $ npm run init
  ```

Then, you can open the repository in your favorite IDE, and modify your new web component as needed.  
For instance, you may want to add a new property to the component.  
Do not forget to update the Storybook story if needed (index.stories.ts file).

---
### Start the component  
  From a simple HTML page:
  ```bash
  $ npm run start
  ```
  or from [Storybook](https://storybook.js.org), to set its properties:
  ```bash
  $ npm run storybook
  ```

---
### Test your component  
Add the necessary unit tests (in the `test` folder), and run:
  ```bash
  $ npm run test
  ```

---
### Update the properties json file
> **Note**: The properties files is an UI Designer specific json file, which defines all the information required to handle the web component in the UI Designer editor (properties, templates, icon, ...).  

For instance, add a json object for the new property in `myInput.json`.
For details, see "Adding UI Designer specific information to the json properties file" section below.

If the new web component has many new properties, you can generate a new properties file.
See "Generating the UI Designer properties file" section below.

---
### Publish your component
> **Note**: this is optional for a custom widget.

This will generate a bundle for your web component, test it, generate the UI Designer assets, and publish on npm.
  ```bash
  $ npm run publish
  ```

---
###  Build a custom widget for the UI Designer 

From your web component, you can now build a custom widget for the Bonitasoft UI Designer :

  ```bash
  $ npm run gen-widget
  ```
 
Your new custom widget (zip file) is now ready to be imported in the UI Designer!

---
## ➤ Create a web component from scratch

### Overview

1. Create your new web component
2. Add JSDoc comments / tags to your web component if necessary
3. Generate the properties file (json)
4. Add UI Designer information to this properties file
5. Generate a web component bundle
6. Generate the Custom Widget

### Creating a new web component

You may use any web component environment to build your web component.

We suggest using [open-wc](https://open-wc.org) recommendations, which provides guides, tools and libraries
for developing web components.
You can use the [open-wc generator](https://open-wc.org/guides/developing-components/getting-started/),
which prompts you with questions to build your web component project.

### Adding JSDoc comments to provide information (optional)

The cwb CLI is using the [Web Component Analyzer tool](https://github.com/runem/web-component-analyzer).
Depending on how you wrote your web component, the library you used, etc... you may have to add JSDoc comments and tags
to provide information on your web component.

See the section "How to document your components using JSDoc" from the
[Web Component Analyzer documentation](https://github.com/runem/web-component-analyzer#-how-to-document-your-components-using-jsdoc)
for more details about adding information on the component (@element), on its properties (@prop) and events (@fires).

Here is an example:
```javascript
/**
 * @element bottom-button
 */
class BottomButton extends Polymer.Element {
  static get is() { return 'bottom-button'; }

  static get properties() {
    return {
      /**
       * Define the border of the button
       */
      border: {
        type: Boolean,
        reflectToAttribute: true,
        value: false
      }
    };
  }
  ...
}
```


### Generating the UI Designer properties file

> **Note**: The properties files is an UI Designer specific json file, which defines all the information required to handle the web component in the UI Designer editor (properties, templates, icon, ...).

Generate the properties file using the [cwb CLI](https://github.com/bonitasoft/bonita-ui-designer-sdk/blob/main/custom-widget-builder/README.md#main-usage).
If the generator cannot get any information to generate the properties file, please consider either adding information to
your components using JSDoc (see above), or generate a properties template file using the CLI.  
Tip: If you see `Cannot get any information from file` error message, verify if `@element` JSDoc tag is present

### Generating a web component bundle

The web component bundle includes the web component and all its dependencies in a single file.
For example, you may use the [esbuild](https://esbuild.github.io) tool to generate the bundle, with a command such as:
```bash
$ npm install esbuild
$ ./node_modules/.bin/esbuild dist/my-wc.js  --bundle --outfile=my-wc-bundle.js
```

### Generating the UI Designer Custom Widget

Once the properties file and the component bundle are available, you can generate the Custom Widget using the [cwb CLI](https://github.com/bonitasoft/bonita-ui-designer-sdk/blob/main/custom-widget-builder/README.md#main-usage).  
Your new custom widget is now ready to be imported in the UI Designer!

---
## ➤ Adding UI Designer specific information to the json properties file

Edit the <web component name>.json generated file, and add to properties objects the information required for the UI Designer.

- Binding

  Possible values:
  - ``variable`` (bidirectional bond)
  - ``expression`` (dynamic value)
  - ``interpolation``
  - ``constant``
    ```json
    "bond": "constant"
    ```

- Constraints

  Define a min and/or max value
    ```json
    "constraints": {
      "min": "1",
      "max": "12"
    }
    ```

- Choice values

  Define a set of string values for the 'choice' type
    ```json
    "choiceValues": [
      "left",
      "top"
    ]
    ```

- showFor

  Allows to display/hide a property on a condition
    ```json
    "showFor": "properties.labelHidden.value === false"
    ```

- label

  Property name displayed in editor's property panel
    ```json
    "label": "Min value"
    ```

- caption

  Text displayed below the property label
  ```json
  "caption": "Any variable: <i>myData</i> or <i>myData.attribute</i>"
  ```

Example:
```json
  {
    "id": "uidInput",
    "name": "Input",
    "type": "widget",
    "template": "@uidInput.tpl.html",
    "description": "Field where the user can enter information",
    "order": "1",
    "icon": "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 50 20'><g><path fill='#fff' d='M1,19V1h48v18H1z M0,0v20h50V0H0z M6,18v-1H5v1H6z M8,17H7v1h1V17z M7,2v1h1V2H7z M5,3h1V2H5V3z M6,3v14h1 V3H6z '/></g></svg>",
    "properties": [
      {
        "label": "Label position",
        "name": "labelPosition",
        "type": "choice",
        "choiceValues": [
          "left",
          "top"
        ],
        "defaultValue": "top",
        "bond": "constant",
        "showFor": "properties.labelHidden.value === false"
      },
      {
        "label": "Label width",
        "name": "labelWidth",
        "type": "integer",
        "defaultValue": 4,
        "showFor": "properties.labelHidden.value === false",
        "bond": "constant",
        "constraints": {
          "min": "1",
          "max": "12"
        }
      },
      {
        "label": "Value",
        "name": "value",
        "help": "Read-write binding, initialized or updated by users' input (bi-directional bond)",
        "caption": "Any variable: <i>myData</i> or <i>myData.attribute</i>",
        "type": "text",
        "bond": "variable"
      }
    ]
  }

```

