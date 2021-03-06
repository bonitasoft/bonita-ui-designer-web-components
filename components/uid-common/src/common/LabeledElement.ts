import {property} from 'lit/decorators.js';
import {css, html} from 'lit';
import {UidElement} from './UidElement';
import {Position} from "./Position";

export abstract class LabeledElement extends UidElement {
  static readonly LABEL_DEFAULT = 'Default label';

  @property({ attribute: 'label-hidden', type: Boolean, reflect: true })
  labelHidden: boolean = false;

  @property({ attribute: 'label', type: String, reflect: true })
  label?: string = LabeledElement.LABEL_DEFAULT;

  /**
   * Position of the label
   */
  @property({ attribute: 'label-position', type: String, reflect: true })
  labelPosition: Position = Position.TOP;

  @property({ attribute: 'label-width', type: Number, reflect: true })
  labelWidth: number = 4;

  static styles = [
      UidElement.styles,
      css`
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
      `
    ];

  protected getLabel(required: boolean, forValue?: string) {
    if (this.labelHidden) {
      return html``;
    }
    return html`
      <label
        part="label"
        style="${this.getLabelCss()}"
        class="${this.getLabelCssClass(required)}"
        for="${forValue}"
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
            ${
              !this.labelHidden && this.labelPosition === 'left' ? ' left' : ''
            }`;
  }

  protected getLabelCss(): string {
    return !this.labelHidden && this.labelPosition === 'left'
      ? ` flex-basis: ${(this.labelWidth * 100) / 12}%;`
      : '';
  }
}
