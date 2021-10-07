import { LitElement, css } from 'lit-element';

export class UidElement extends LitElement {
    static get styles() {
        return css`
      :host {
        display: block;
        font-family: sans-serif;
        text-align: left;
      }

      input {
        font-size: 14px;
        height: 20px;
        flex-grow: 1;
      }
      
      .container div {
        flex-grow: 1;
      }
      
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

    `;
    }

}
