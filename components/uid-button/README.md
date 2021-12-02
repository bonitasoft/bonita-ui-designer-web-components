# \<uid-button>
![npmVersion](https://img.shields.io/npm/v/@bonitasoft/@bonitasoft/uid-button?color=blue&style=plastic)

Simple button web component.

(This webcomponent follows the [open-wc](https://github.com/open-wc/open-wc) recommendation)

# ➤ Using the component

## Installation

```bash
npm i @bonitasoft/uid-button
```

## Usage

```html
<script type="module">
  import '@bonitasoft/uid-button/dist/uid-button.bundle.min.js';
</script>

<uid-button></uid-button>
```

## Attributes

| Attribute        | Type      | Default | Possible values    |
|------------------|-----------|---------|--------------------|
| `alignment`      | `string`  | "left"  | left center right  |
| `disabled`       | `string`  | false   |                    |
| `id`             | `string`  | ""      |                    |
| `label`          | `string`  | "Submit"|                    |
| `action`         | `string`  |         |                    |

<br>

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
npm run release
```

