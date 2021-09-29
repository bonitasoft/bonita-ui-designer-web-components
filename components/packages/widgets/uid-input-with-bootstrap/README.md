# `uid-input-with-bootstrap`

![npmVersion](https://img.shields.io/npm/v/uid-input-with-bootstrap?color=blue&style=plastic)

Simple input web component

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

## Usage

Run:

    npm install uid-input-with-bootstrap

Then import `node_modules/uid-input-with-bootstrap/lib/uid-input-with-bootstrap.es5.min.js`

And you can use new html tag `<uid-input-with-bootstrap placeholder="Type a value"></uid-input-with-bootstrap>`
