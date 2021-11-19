import {html} from 'lit';
import { property } from 'lit/decorators.js'; // eslint-disable-line
import {unsafeHTML} from "lit-html/directives/unsafe-html.js";
import {LabeledElement} from "@bonitasoft/uid-common/dist/src/common/LabeledElement"; // eslint-disable-line

/**
 * Text field, optionally with a label, where the user can display text
 *
 * @element uid-text
 */
export class UidText extends LabeledElement {

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

  @property({ attribute: 'text', type: String, reflect: true })
  text: string = '';

  // User should take care to sanitize the 'text' content before using this.
  // See e.g. https://github.com/google/closure-library/blob/master/closure/goog/html/sanitizer/htmlsanitizer.js
  @property({ attribute: 'allow-html', type: Boolean, reflect: true })
  allowHTML: boolean = false;

  @property({ attribute: 'alignment', type: String, reflect: true })
  alignment: string = 'left';

  render() {
    return html`
      <div id="${this.id}" class="container ${this.getContainerCssClass()}">
        ${this.getLabel(false)}
        <p part="paragraph" style="${this.getParagraphCss()}">${this.getTextValue()}</p>
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
