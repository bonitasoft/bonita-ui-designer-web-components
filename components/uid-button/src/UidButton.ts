import { html } from 'lit';
import { property } from 'lit/decorators.js'; // eslint-disable-line
import { UidElement } from '@bonitasoft/uid-common/dist/src/common/UidElement'; // eslint-disable-line
import { Alignment } from '@bonitasoft/uid-common/dist/src/common/Alignment'; // eslint-disable-line

/**
 * Simple button, that trigger an action
 */
export class UidButton extends UidElement {
  @property({ attribute: 'id', type: String, reflect: true })
  id: string = '';

  @property({ attribute: 'disabled', type: Boolean, reflect: true })
  disabled: boolean = false;

  @property({ attribute: 'alignment', type: String, reflect: true })
  alignment: Alignment = Alignment.LEFT;

  @property({ attribute: 'label', type: String, reflect: true })
  label: string = 'Submit';

  @property({ attribute: 'action', type: String, reflect: true })
  action?: string;

  render() {
    return html`
      <div style="${this.getAlignmentCss()}">
        <button
          id="${this.id}"
          part="button"
          @click="${this.submitAction}"
          ?disabled="${this.disabled}"
        >
          ${this.label}
        </button>
      </div>
    `;
  }

  private getAlignmentCss(): string {
    return `text-align: ${this.alignment};`;
  }

  private submitAction() {
    if (this.action) {
      super.dispatchEvent(new CustomEvent('UidAction', { detail: this.action, bubbles: true}));
    }
  }
}
