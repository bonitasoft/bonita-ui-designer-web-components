import {css, CSSResultGroup, LitElement} from 'lit';

export abstract class UidElement extends LitElement {

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
}
