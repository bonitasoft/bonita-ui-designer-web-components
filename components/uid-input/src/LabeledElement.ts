import {property} from "lit/decorators.js"; // eslint-disable-line
import {msg} from "@lit/localize";
import {html} from "lit";
import {targetLocales} from "./locales/locale-codes";
import {UidElement, setLocale} from "./UidElement";

export abstract class LabeledElement extends UidElement {

  static readonly LABEL_DEFAULT = 'Default label';

  @property({ attribute: 'label-hidden', type: Boolean, reflect: true })
  labelHidden: boolean = false;

  @property({ attribute: 'label', type: String, reflect: true })
  label: string = LabeledElement.LABEL_DEFAULT;

  /**
   * Position of the label
   */
  @property({ attribute: 'label-position', type: String, reflect: true })
  labelPosition: string = 'top';

  @property({ attribute: 'label-width', type: Number, reflect: true })
  labelWidth: number = 4;

  async attributeChangedCallback(name: string, old: string | null, value: string | null): Promise<void> {
    super.attributeChangedCallback(name, old, value);
    if (name === 'lang') {
      if (targetLocales.includes(super.lang)) {
        setLocale(super.lang).then(() => {
          if (this.label === LabeledElement.LABEL_DEFAULT) {
            this.label = msg('Default label'); // Need real string for lit-translate
          }
        });
      }
    }
  }

  protected getLabel(forValue: string|null, required: boolean) {
    if (this.labelHidden) {
      return html``;
    }
    return html`
      <label
        part="label"
        style="${this.getLabelCss()}"
        class="${this.getLabelCssClass(required)}"
        ${LabeledElement.getFor(forValue)}
        >${this.label}</label
      >
    `;
  }

  protected getContainerCssClass(): string {
    return !this.labelHidden && this.labelPosition === 'left'
      ? 'container-row'
      : 'container-col';
  }

  protected getLabelCssClass(required: boolean): string {
    return `${required ? 'required' : ''}
            ${!this.labelHidden && this.labelPosition === 'left' ? ' left' : ''}`;
  }

  protected getLabelCss(): string {
    return !this.labelHidden && this.labelPosition === 'left'
      ? ` flex-basis: ${(this.labelWidth * 100) / 12}%; flex-shrink: 0;`
      : '';
  }

  private static getFor(forValue: string|null) {
    if (forValue) {
      return html`for="${forValue}"`;
    }
    return html``;
  }
}
