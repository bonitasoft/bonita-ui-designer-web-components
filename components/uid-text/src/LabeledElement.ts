import {html} from "lit";
import {setLocale, UidElement} from "./UidElement";
import {property} from "lit/decorators.js";
import {allLocales} from "./locales/locale-codes";
import {msg} from "@lit/localize";

export abstract class LabeledElement extends UidElement {

  static readonly LABEL_DEFAULT = "Default label";

  private labelDefault: boolean = true;
  private internalLabelUpdate: boolean = false;

  @property({ attribute: 'label-hidden', type: Boolean, reflect: true })
  labelHidden: boolean = false;

  @property({ attribute: 'label', type: String, reflect: true })
  label: string = LabeledElement.LABEL_DEFAULT;

  /**
   * Position of the label
   */
  @property({ attribute: 'label-position', type: String, reflect: true })
  labelPosition: string = "top";

  @property({ attribute: 'label-width', type: Number, reflect: true })
  labelWidth: number = 4;


  protected constructor(labelHidden: boolean) {
    super();
    this.labelHidden = labelHidden;
  }

  async attributeChangedCallback(name: string, old: string|null, value: string|null): Promise<void> {
    super.attributeChangedCallback(name, old, value);
    if (name === 'lang') {
      if (allLocales.includes(super.lang)) {
        setLocale(super.lang).then(() => {
          if (this.labelDefault) {
            this.label = msg("Default label"); // Need real string for lit-translate
            this.internalLabelUpdate = true;
          }
        })
      }
    }
    if ((name === 'label') && old) {
      if (this.internalLabelUpdate) {
        this.labelDefault = true;
        this.internalLabelUpdate = false;
      } else {
        this.labelDefault = false;
      }
    }
  }

  protected getLabel(forStr: string, required: boolean) {
    if (this.labelHidden) {
      return html``;
    }
    return html`
      <label
        style="${this.getLabelCss()}"
        class="${this.getLabelCssClass(required)}"
        ${LabeledElement.getFor(forStr)}
      >${this.label}</label>
    `
  }

  protected getContainerCssClass() : string {
    return !this.labelHidden && this.labelPosition === 'left' ? "container-row" : "container-col";
  }

  protected getLabelCssClass(required: boolean) : string {
    return `${required ? "required" : ""}
            ${!this.labelHidden && this.labelPosition === 'left' ? " left" : ""}`;
  }

  protected getLabelCss() : string {
    return !this.labelHidden && this.labelPosition === 'left' ? ` flex-basis: ${this.labelWidth*100/12}%;` : "";
  }

  private static getFor(forStr: string) {
    if (forStr) {
      return html`for="${forStr}"`;
    }
    return html``;
  }

}
