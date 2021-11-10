import {css, CSSResultGroup, LitElement} from 'lit';
import {property} from "lit/decorators.js";

export abstract class UidElement extends LitElement {

  @property({ attribute: 'translations', type: String, reflect: true })
  translations: string = '';

  private translationObj : any = {};

  async attributeChangedCallback(name: string, old: string | null, value: string | null): Promise<void> {
    super.attributeChangedCallback(name, old, value);
    if (name === 'translations' && value) {
      try {
        this.translationObj = JSON.parse(value);
      } catch (e) {
        console.log("Json parse error: ", e);
      }
    }
  }

  static styles = css`

      :host {
        display: block;
        font-family: sans-serif;
        text-align: left;
      }

      .container {
        display: flex;
        align-items: center;
        padding: 5px 0;
      }

      .container-row {
        flex-direction: row;
      }

      .container-col {
        flex-direction: column;
        align-items: stretch;
      }
    ` as CSSResultGroup;

  protected translation(str: string): string | null {
    if (str in this.translationObj) {
      return this.translationObj[str];
    }
    return str;
  }
}
