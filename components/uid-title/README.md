# \<uid-title>
![npmVersion](https://img.shields.io/npm/v/uid-title?color=blue&style=plastic)

Simple title web component.

(This webcomponent follows the [open-wc](https://github.com/open-wc/open-wc) recommendation)

# ➤ Using the component

## Installation

```bash
npm i @bonitasoft/uid-title
```

## Usage

```html
<script type="module">
  import '@bonitasoft/uid-title/dist/uid-title.bundle.min.js';
</script>

<uid-title></uid-title>
```

## Attributes

| Attribute        | Type      | Default | Possible values    |
|------------------|-----------|---------|--------------------|
| `id`             | `string`  | ""      |                    |
| `level    `      | `string`  | "text"  |level1, level2, level3, level4, level5, level6|
| `alignment`      | `string`  | "left"  |left, center, right |
| `text`           | `string`  | "Title" |                    |
| `allow-html`     | `boolean` | "false" |                    |

# ➤ Developing the component

## Linting and formatting

To scan the project for linting and formatting errors, run

```bash
npm run lint
```

To automatically fix linting and formatting errors, run

```bash
npm run format
```

## Testing with Web Test Runner

To execute a single test run:

```bash
npm run test
```

To run the tests in interactive watch mode run:

```bash
npm run test:watch
```

## Demoing with Storybook

To run a local instance of Storybook for your component, run

```bash
npm run storybook
```

To build a production version of Storybook, run

```bash
npm run storybook:build
```


## Tooling configs

For most of the tools, the configuration is in the `package.json` to reduce the amount of files in your project.

If you customize the configuration a lot, you can consider moving them to individual files.

## Local Demo with `web-dev-server`

```bash
npm start
```

To run a local development server that serves the basic demo located in `demo/index.html`


## Publish npm package

To generate & test the web component bundle, and publish it:
```bash
npm run publish
```
