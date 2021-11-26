import { html, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { LabeledElement } from '@bonitasoft/uid-common/dist/src/common/LabeledElement';

/**
 * Text area field, optionally with a label, where the user can enter information
 *
 * @element uid-textarea
 */
export class UidTextarea extends LabeledElement {
  private name = 'uidTextarea';

  @property({ attribute: 'id', type: String, reflect: true })
  id: string = '';

  @property({ attribute: 'max-length', type: Number, reflect: true })
  maxLength: number | undefined;
  /**
   * Specifies the minimum length of textual data (strings)
   */
  @property({ attribute: 'min-length', type: Number, reflect: true })
  minLength: number | undefined;

  @property({ attribute: 'readonly', type: Boolean, reflect: true })
  readOnly: boolean = false;

  @property({ attribute: 'required', type: Boolean, reflect: true })
  required: boolean = false;

  @property({ attribute: 'value', type: String, reflect: true })
  value: string = '';

  static styles = [
    LabeledElement.styles
  ];

  render(): TemplateResult {
    return html`
      <div id="${this.id}" class="container ${this.getContainerCssClass()}">
        ${super.getLabel(this.required, 'textarea')}
        <textarea
          part="textarea"
          id="textarea"
          name="${this.name}"
          .value="${this.value}"
          @input=${(e: any) => this.valueChanged(e)}
          minlength="${this.minLength}"
          maxlength="${this.maxLength}"
          ?required="${this.required}"
          ?readOnly=${this.readOnly}
        />

      </div>
    `;
  }

  private valueChanged(e: any) {
    const inputElem = super.shadowRoot!.querySelector('textarea') as HTMLTextAreaElement;
    inputElem.style.borderColor = !inputElem.checkValidity() ? 'red' :'';
    const {
      target: { value },
    } = e;
    super.dispatchEvent(new CustomEvent('valueChange', { detail: value }));
  }
}
