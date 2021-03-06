import { css, html, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js'; // eslint-disable-line
import { unsafeHTML } from 'lit/directives/unsafe-html.js'; // eslint-disable-line
import { UidElement } from '@bonitasoft/uid-common/dist/src/common/UidElement'; // eslint-disable-line
import {Alignment} from "@bonitasoft/uid-common/dist/src/common/Alignment"; // eslint-disable-line
import {Level} from "./Level";

/**
 * @element uid-title
 * Input field, optionally with a label, where the user can enter information
 */
export class UidTitle extends UidElement {
  @property({ attribute: 'id', type: String, reflect: true })
  id: string = '';

  // User should take care to sanitize the 'text' content before using this.
  // See e.g. https://github.com/google/closure-library/blob/master/closure/goog/html/sanitizer/htmlsanitizer.js
  @property({ attribute: 'allow-html', type: Boolean, reflect: true })
  allowHTML: boolean = false;

  @property({ attribute: 'text', type: String, reflect: true })
  text: string = 'Title';

  @property({ attribute: 'alignment', type: String, reflect: true })
  alignment: Alignment = Alignment.LEFT;

  @property({ attribute: 'level', type: String, reflect: true })
  level: Level = Level.LEVEL1;

  static styles = [UidElement.styles, css``];

  render(): TemplateResult {
    switch (this.getLevelAsString()) {
      case Level.LEVEL1:
        return html`<h1 part="title" style="${this.getTextAlignCss()}">
          ${this.getTextValue()}
        </h1>`;
      case Level.LEVEL2:
        return html`<h2 part="title" style="${this.getTextAlignCss()}">
          ${this.getTextValue()}
        </h2>`;
      case Level.LEVEL3:
        return html`<h3 part="title" style="${this.getTextAlignCss()}">
          ${this.getTextValue()}
        </h3>`;
      case Level.LEVEL4:
        return html`<h4 part="title" style="${this.getTextAlignCss()}">
          ${this.getTextValue()}
        </h4>`;
      case Level.LEVEL5:
        return html`<h5 part="title" style="${this.getTextAlignCss()}">
          ${this.getTextValue()}
        </h5>`;
      case Level.LEVEL6:
        return html`<h6 part="title" style="${this.getTextAlignCss()}">
          ${this.getTextValue()}
        </h6>`;
      default:
        return html`<h1 part="title" style="${this.getTextAlignCss()}">
          ${this.getTextValue()}
        </h1>`;
    }
  }

  private getLevelAsString(): string {
    return this.level.toLowerCase().replace(/\s/g, '');
  }

  private getTextValue() {
    if (this.allowHTML) {
      return html`${unsafeHTML(this.text)}`;
    }
    return html`${this.text}`;
  }

  private getTextAlignCss(): string {
    return `text-align: ${this.alignment};`;
  }
}
