# \<uid-input>
![npmVersion](https://img.shields.io/npm/v/@bonitasoft/uid-input?color=blue&style=plastic)

Simple input (with label) web component.

(This webcomponent follows the [open-wc](https://github.com/open-wc/open-wc) recommendation)

# Using the component

## Installation

```bash
npm i @bonitasoft/uid-input
```

## Usage

```html
<script type="module">
  import '@bonitasoft/uid-input/dist/uid-input.bundle.min.js';
</script>

<uid-input></uid-input>
```

## Attributes

| Attribute        | Type      | Default | Possible values    |
|------------------|-----------|---------|--------------------|
| `id`             | `string`  | ""      |                    |
| `label`          | `string`  | ""      |                    |
| `label-hidden`   | `boolean` | false   |                    |
| `label-position` | `string`  | "top"   | left top           |
| `label-width`    | `string`  | "4"     |                    |
| `lang`           | `string`  | "en"    |en es-ES fr ja pt-BR|
| `max`            | `string`  | ""      |                    |
| `max-length`     | `string`  | ""      |                    |
| `min`            | `string`  | ""      |                    |
| `min-length`     | `string`  | ""      |                    |
| `placeholder`    | `string`  | ""      |                    |
| `readonly`       | `boolean` | false   |                    |
| `required`       | `boolean` | false   |                    |
| `step`           | `string`  | "1"     |                    |
| `type`           | `string`  | "text"  |                    |
| `value`          | `string`  | ""      |                    |


## Events

| Event         | Type                  |
|---------------|-----------------------|
| `valueChange` | `CustomEvent<string>` |


# Developing the component

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
