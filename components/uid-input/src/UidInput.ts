import {html} from 'lit';
import {property} from 'lit/decorators.js';
import {UidElement} from "./uid-element";
import {msg, localized, configureLocalization} from '@lit/localize';
import {sourceLocale, targetLocales} from './locales/locale-codes.js';
const template_es = import('./locales/es-ES.js');
const template_fr = import('./locales/fr.js');
const template_ja = import('./locales/ja.js');
const template_pt = import('./locales/pt-BR.js');

export const {setLocale} = configureLocalization({
  sourceLocale,
  targetLocales,
  loadLocale: (locale) => {
    switch (locale) {
      case 'es-ES': {
        return template_es;
      }
      case 'fr': {
        return template_fr;
      }
      case 'ja': {
        return template_ja;
      }
      case 'pt-BR': {
        return template_pt;
      }
      default: {
        // should not happen
        return template_fr;
      }
  }}
});

/**
 * Input field, optionally with a label, where the user can enter information
 */
@localized()
export class UidInput extends UidElement {

  static readonly LABEL_DEFAULT = "Default label";

  private name = "uidInput";

  @property({ attribute: 'lang', type: String, reflect: true })
  lang: string = "en";

  // Common properties below are handled by the div above uid-input:

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

  @property({ attribute: 'required', type: Boolean, reflect: true })
  required: boolean = false;

  @property({ attribute: 'min-length', type: Number, reflect: true })
  minLength: number | undefined;

  @property({ attribute: 'max-length', type: Number, reflect: true })
  maxLength: number | undefined;

  @property({ attribute: 'readonly', type: Boolean, reflect: true })
  readOnly: boolean = false;

  @property({ attribute: 'label-hidden', type: Boolean, reflect: true })
  labelHidden: boolean = false;

  @property({ attribute: 'label', type: String, reflect: true })
  label: string = UidInput.LABEL_DEFAULT;

  /**
   * Position of the label
   */
  @property({ attribute: 'label-position', type: String, reflect: true })
  labelPosition: string = "top";

  @property({ attribute: 'label-width', type: Number, reflect: true })
  labelWidth: number = 4;

  @property({ attribute: 'placeholder', type: String, reflect: true })
  placeholder: string = "";

  @property({ attribute: 'value', type: String, reflect: true })
  value: string = "";

  @property({ attribute: 'type', type: String, reflect: true })
  type: string = "text";

  @property({ attribute: 'min', type: Number, reflect: true })
  min: number | undefined;

  @property({ attribute: 'max', type: Number, reflect: true })
  max: number | undefined;

  @property({ attribute: 'step', type: Number, reflect: true })
  step: number = 1;

  async attributeChangedCallback(name: string, old: string|null, value: string|null) {
    super.attributeChangedCallback(name, old, value);
    if (name === 'lang') {
      // @ts-ignore
      if (targetLocales.includes(this.lang)) {
        setLocale(this.lang).then(() => {
          if (this.label === UidInput.LABEL_DEFAULT) {
            this.label = msg("Default label"); // Need real string for lit-translate
          }
        }).catch((e) => {
          console.log('setLocale() error ! ', e);
        });
      }
    }
  }

  static get styles() {
    return super.styles;
  }

  render() {
    return html`
      <div id="${this.id}" class="container ${this.getContainerCssClass()}">
          ${this.getLabel()}
          <input
            id="input"
            name="${this.name}"
            type="${this.type}"
            min="${this.min}"
            max="${this.max}"
            step="${this.step}"
            value="${this.value}"
            @input=${(e: any) => this.valueChanged(e)}
            placeholder="${this.placeholder}"
            minlength="${this.minLength}"
            maxlength="${this.maxLength}"
            ?readonly="${this.readOnly}"
            ?required="${this.required}"
          />
      </div>
    `;
  }

  private getLabel() {
    if (this.labelHidden) {
      return html``;
    }
    return html`
      <label
        style="${this.getLabelCss()}"
        class="${this.getLabelCssClass()}"
        for="input"
      >${this.label}</label>
    `
  }

  private getContainerCssClass() : string {
    return !this.labelHidden && this.labelPosition === 'left' ? "container-row" : "container-col";
  }

  private getLabelCssClass() : string {
    return (this.required ? "required" : "")
      + (!this.labelHidden && this.labelPosition === 'left' ? " left" : "");
  }

  private getLabelCss() : string {
    return !this.labelHidden && this.labelPosition === 'left' ?
      " flex-basis: " + (this.labelWidth*100/12) + "%;" : "";
  }

  private valueChanged(e: any) {
    let inputElem = this.shadowRoot!.querySelector("input") as HTMLInputElement;
    if (!inputElem.checkValidity()) {
      inputElem.style.borderColor = "red";
    } else {
      inputElem.style.borderColor = "";
    }

    let value = e.target.value;
    this.dispatchEvent(new CustomEvent('valueChange', { detail: value }));
  }

}
