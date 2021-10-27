import { LitElement, css, CSSResultGroup } from 'lit';
import {property} from 'lit/decorators.js';// eslint-disable-line
import {configureLocalization} from '@lit/localize';
import {sourceLocale, targetLocales} from './locales/locale-codes.js';

const templateEs = import('./locales/es-ES.js');
const templateFr = import('./locales/fr.js');
const templateJa = import('./locales/ja.js');
const templatePt = import('./locales/pt-BR.js');

export type supportedLang = "es-ES" | "fr" | "ja" | "pt-BR";

export const {setLocale} = configureLocalization({
  sourceLocale,
  targetLocales,
  loadLocale: (locale) => {
    switch (locale) {
      case 'es-ES': {
        return templateEs;
      }
      case 'fr': {
        return templateFr;
      }
      case 'ja': {
        return templateJa;
      }
      case 'pt-BR': {
        return templatePt;
      }
      default: {
        // should not happen
        return templateFr;
      }
  }}
});

export abstract class UidElement extends LitElement {

  @property({ attribute: 'lang', type: String, reflect: true })
  lang: supportedLang = "en" as supportedLang;

  static get styles() {
    return css`
      :host {
        display: block;
        font-family: sans-serif;
        text-align: left;
      }
      input {
        font-size: 14px;
        height: 20px;
        flex-grow: 1;
      }

      label {
        font-size: 14px;
        font-weight: 700;
        padding: 5px 0;
      }

      label.left {
        text-align: right;
        padding-right: 15px;
      }

      /* Add a red star after required inputs */
      label.required:after {
        content: " *";
        color: #C00;
      }
      .container {
        display: flex;
        align-items: center;
        padding: 5px 0;
      }
      .container-row {
        flex-direction: row;
      }

      .container-col {
        flex-direction: column;
        align-items: stretch;
      }
    ` as CSSResultGroup;
  }
}
