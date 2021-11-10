import { css, html, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import {LabeledElement} from "@bonitasoft/uid-common/dist/src/common/LabeledElement";
import {UidElement} from "@bonitasoft/uid-common/dist/src/common/UidElement";

/**
 * Input field, optionally with a label, where the user can enter information
 */
export class UidInput extends LabeledElement {

  private name = 'uidInput';

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
  id: string = '';

  @property({ attribute: 'required', type: Boolean, reflect: true })
  required: boolean = false;

  /**
   * Specifies the minimum length of textual data (strings)
   */
  @property({ attribute: 'min-length', type: Number, reflect: true })
  minLength: number | undefined;

  /**
   * Specifies the maximum length of textual data (strings)
   */
  @property({ attribute: 'max-length', type: Number, reflect: true })
  maxLength: number | undefined;

  @property({ attribute: 'readonly', type: Boolean, reflect: true })
  readOnly: boolean = false;

  @property({ attribute: 'placeholder', type: String, reflect: true })
  placeholder: string = '';

  @property({ attribute: 'value', type: String, reflect: true })
  value: string = '';

  @property({ attribute: 'type', type: String, reflect: true })
  type: string = 'text';

  /**
   * Specifies the minimum value of numerical input type
   */
  @property({ attribute: 'min', type: Number, reflect: true })
  min: number | undefined;

  /**
   * Specifies the maximum value of numerical input type
   */
  @property({ attribute: 'max', type: Number, reflect: true })
  max: number | undefined;

  @property({ attribute: 'step', type: Number, reflect: true })
  step: number = 1;

  static styles = [
    LabeledElement.styles,
    css`
      input {
        font-size: 14px;
        height: 20px;
        flex-grow: 1;
      }
      `
    ];

  async attributeChangedCallback(name: string, old: string | null, value: string | null): Promise<void> {
    super.attributeChangedCallback(name, old, value);
  }

  render(): TemplateResult {
    return html`
      <div id="${this.id}" class="container ${this.getContainerCssClass()}">
        ${super.getLabel(this.required, "input")}
        <input
          part="input"
          id="input"
          name="${this.name}"
          type="${this.type}"
          min="${this.min}"
          max="${this.max}"
          step="${this.step}"
          .value="${this.value}"
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

  private valueChanged(e: any) {
    const inputElem = super.shadowRoot!.querySelector('input') as HTMLInputElement;
    if (!inputElem.checkValidity()) {
      inputElem.style.borderColor = 'red';
    } else {
      inputElem.style.borderColor = '';
    }

    const { target: {value} } = e;
    super.dispatchEvent(new CustomEvent('valueChange', { detail: value }));
  }
}
