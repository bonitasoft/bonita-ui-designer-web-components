import {css, html} from 'lit';
import {property, customElement} from 'lit/decorators.js';

import {unsafeHTML} from "lit-html/directives/unsafe-html";
// @ts-ignore
import {get, listenForLangChanged, registerTranslateConfig, use} from "lit-translate";
import * as i18n_en from "./i18n/en.json";
import * as i18n_es from "./i18n/es-ES.json";
import * as i18n_fr from "./i18n/fr.json";
import * as i18n_ja from "./i18n/ja.json";
import * as i18n_pt from "./i18n/pt-BR.json";
import {UidElement} from "./uid-element";

// Registers i18n loader
registerTranslateConfig({
  loader: (lang) => Promise.resolve(UidText.getCatalog(lang))
});


@customElement('uid-text')
export class UidText extends UidElement {

  static readonly LABEL_DEFAULT = "defaultLabel";

  @property({ attribute: 'lang', type: String, reflect: true })
  lang: string = "en";

  // Common properties below are handled by the div above uid-text:

  // @property({ attribute: 'width', type: String, reflect: true })
  // private width: string = "12";
  //
  // @property({ attribute: 'css-classes', type: String, reflect: true })
  // private cssClasses: string = "";
  //
  // @property({ attribute: 'hidden', type: Boolean, reflect: true })
  // private hidden: boolean = false;

  @property({ attribute: 'id', type: String, reflect: true })
  id: string = "";

  @property({ attribute: 'label-hidden', type: Boolean, reflect: true })
  labelHidden: boolean = false;

  @property({ attribute: 'label', type: String, reflect: true })
  label: string = UidText.LABEL_DEFAULT;

  @property({ attribute: 'label-position', type: String, reflect: true })
  labelPosition: string = "top";

  @property({ attribute: 'label-width', type: String, reflect: true })
  labelWidth: number = 4;

  @property({ attribute: 'text', type: String, reflect: true })
  text: string = "";

  // User should take care to sanitize the 'text' content before using this.
  // See e.g. https://github.com/google/closure-library/blob/master/closure/goog/html/sanitizer/htmlsanitizer.js
  @property({ attribute: 'allow-html', type: Boolean, reflect: true })
  allowHTML: boolean = false;

  @property({ attribute: 'alignment', type: String, reflect: true })
  alignment: string = "left";

  constructor() {
    super();
    listenForLangChanged(() => {
      if (this.label === UidText.LABEL_DEFAULT) {
        this.label = get(this.label);
      }
    });
  }

  async attributeChangedCallback(name: string, old: string|null, value: string|null) {
    super.attributeChangedCallback(name, old, value);
    if (name === 'lang') {
      use(this.lang).then();
    }
  }

  static getCatalog(lang: string) {
    switch(lang) {
      case "es":
      case "es-ES":
        return i18n_es;
      case "fr":
        return i18n_fr;
      case "ja":
        return i18n_ja;
      case "pt":
      case "pt-BR":
        return i18n_pt;
      default:
        return i18n_en;
    }
  }

  static get styles() {
    return  [
      UidElement.styles,
      css`
        .p {
          font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
          font-size: 14px;
          line-height: 1.42857143;
          color: #333;
          background-color: #fff;
          margin: 0;
          padding-left: 0;
        }
      `];
  }

  render() {
    return html`
      <div id="${this.id}" class="container ${this.getContainerCssClass()}">
        ${this.getLabel()}
        <p  style="${this.getParagraphCss()}">
          ${this.getTextValue()}
        </p>
      </div>
    `;
  }

  private getTextValue() {
    if (this.allowHTML) {
      return html`${unsafeHTML(this.text)}`;
    }
    return html`${this.text}`
  }

  private getLabel() {
    if (this.labelHidden) {
      return html``;
    }
    return html`
        <label
            style="${this.getLabelCss()}"
            class="${this.getLabelCssClass()}"
        >${this.label}</label>
        `
  }

  private getContainerCssClass() : string {
    return !this.labelHidden && this.labelPosition === 'left' ? "container-row" : "container-col";
  }

  private getParagraphCss() : string {
    return "text-align: " + this.alignment + ";";
  }

  private getLabelCssClass() : string {
    return (!this.labelHidden && this.labelPosition === 'left') ? "left" : "";
  }

  private getLabelCss() : string {
    return (!this.labelHidden && this.labelPosition === 'left') ?
        " flex-basis: " + (this.labelWidth*100/12) + "%; flex-shrink: 0;" : "";
  }

}