import { css, html } from 'lit';
import { property } from 'lit/decorators.js'; // eslint-disable-line
import { msg } from '@lit/localize';
import {allLocales} from './locales/locale-codes.js';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js'; // eslint-disable-line
import {LabelElement} from "./LabelElement";

/**
 * Text field, optionally with a label, where the user can display text
 */
export class UidText extends LabelElement {

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
  id: string = '';

  @property({ attribute: 'label-hidden', type: Boolean, reflect: true })
  labelHidden: boolean = false;

  @property({ attribute: 'label', type: String, reflect: true })
  label: string = UidText.LABEL_DEFAULT;

  @property({ attribute: 'label-position', type: String, reflect: true })
  labelPosition: string = 'top';

  @property({ attribute: 'label-width', type: String, reflect: true })
  labelWidth: number = 4;

  @property({ attribute: 'text', type: String, reflect: true })
  text: string = '';

  // User should take care to sanitize the 'text' content before using this.
  // See e.g. https://github.com/google/closure-library/blob/master/closure/goog/html/sanitizer/htmlsanitizer.js
  @property({ attribute: 'allow-html', type: Boolean, reflect: true })
  allowHTML: boolean = false;

  @property({ attribute: 'alignment', type: String, reflect: true })
  alignment: string = 'left';

  static get styles() {
    return [
      super.styles,
      css`
        .p {
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
          font-size: 14px;
          line-height: 1.42857143;
          color: #333;
          background-color: #fff;
          margin: 0;
          padding-left: 0;
        }
      `,
    ];
  }

  render() {
    return html`
      <div id="${this.id}" class="container ${this.getContainerCssClass()}">
        ${super.getLabel("", false)}
        <p style="${this.getParagraphCss()}">${this.getTextValue()}</p>
      </div>
    `;
  }

  private getTextValue() {
    if (this.allowHTML) {
      return html`${unsafeHTML(this.text)}`;
    }
    return html`${this.text}`;
  }

  private getParagraphCss(): string {
    return `text-align: ${this.alignment};`;
  }

}
