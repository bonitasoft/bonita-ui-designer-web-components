import {css, html, TemplateResult} from 'lit';
import {property} from 'lit/decorators.js';
import {unsafeHTML} from "lit-html/directives/unsafe-html.js";
import {UidElement} from "@bonitasoft/uid-common/dist/src/common/UidElement";
import {Alignment, Level} from "./UidTitleType";

/**
 * @element uid-title
 * Input field, optionally with a label, where the user can enter information
 */
export class UidTitle extends UidElement {

  @property({attribute: 'id', type: String, reflect: true})
  id: string = '';

  // User should take care to sanitize the 'text' content before using this.
  // See e.g. https://github.com/google/closure-library/blob/master/closure/goog/html/sanitizer/htmlsanitizer.js
  @property({attribute: 'allow-html', type: Boolean, reflect: true})
  allowHTML: boolean = false;

  @property({attribute: 'text', type: String, reflect: true})
  text: string = 'Title';

  @property({attribute: 'alignment', type: String, reflect: true})
  alignment: Alignment = Alignment.LEFT;

  @property({attribute: 'level', type: String, reflect: true})
  level: Level = Level.LEVEL1;

  static styles = [
    UidElement.styles,
    css``
  ];

  render(): TemplateResult {
    switch (this.adaptLevel(this.level)) {
      case Level.LEVEL1:
        return html`<h1 style="${this.getTextAlignCss()}">${this.getTextValue()}</h1>`;
      case Level.LEVEL2:
        return html`<h2 style="${this.getTextAlignCss()}">${this.getTextValue()}</h2>`;
      case Level.LEVEL3:
        return html`<h3 style="${this.getTextAlignCss()}">${this.getTextValue()}</h3>`;
      case Level.LEVEL4:
        return html`<h4 style="${this.getTextAlignCss()}">${this.getTextValue()}</h4>`;
      case Level.LEVEL5:
        return html`<h5 style="${this.getTextAlignCss()}">${this.getTextValue()}</h5>`;
      case Level.LEVEL6:
        return html`<h6 style="${this.getTextAlignCss()}">${this.getTextValue()}</h6>`;
      default:
        return html`<h1 style="${this.getTextAlignCss()}">${this.getTextValue()}</h1>`;
    }
  }

  private adaptLevel(level:string) : string{
    return level.toLowerCase().replace(/\s/g, "")
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
