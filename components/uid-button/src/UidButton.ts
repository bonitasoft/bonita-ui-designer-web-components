import {html} from 'lit';
import {property} from 'lit/decorators.js'; // eslint-disable-line
import {UidElement} from "@bonitasoft/uid-common/dist/src/common/UidElement";
import {Alignment} from "./Alignment";
import {Action} from "./Action";
import {CollectionPosition, RemoveCollectionPosition} from "./CollectionPosition";

/**
 * Text field, optionally with a label, where the user can display text
 */
export class UidButton extends UidElement {

  @property({ attribute: 'id', type: String, reflect: true })
  id: string = '';

  @property({ attribute: 'alignment', type: String, reflect: true })
  alignment: Alignment = Alignment.Left;

  @property({ attribute: 'label', type: String, reflect: true })
  label: string = 'Submit';

  @property({ attribute: 'style', type: String, reflect: true })
  btnStyle: string = 'default';

  @property({ attribute: 'action', type: String, reflect: true })
  action?: string;

  @property({ attribute: 'add-collection-position', type: String, reflect: true })
  addCollectionPosition: CollectionPosition = CollectionPosition.LAST;

  @property({ attribute: 'collection', type: Array, reflect: true })
  collection: Array<string> = [];

  @property({ attribute: 'value-to-add', type: String, reflect: true })
  valueToAdd?: string;

  @property({ attribute: 'remove-collection-position', type: String, reflect: true })
  removeCollectionPosition: RemoveCollectionPosition = RemoveCollectionPosition.LAST;

  @property({ attribute: 'remove-item', type: String, reflect: true })
  removeItem?: string;


  render() {
    return html`
      <div id="${this.id}" class="container" style="${this.getAlignmentCss()}">
        <button
          part="button"
          class="${this.getButtonClass()}"
          @click="${this.getAction}"
        >
          ${this.label}
        </button>
      </div>
    `;
  }

  private getAlignmentCss(): string {
    return `text-align: ${this.alignment};`;
  }

  private getButtonClass(): string {
    return `btn-${this.btnStyle}`;
  }

  private getAction() {
    switch (this.action) {
      case Action.ADD_TO_COLLECTION:
        this.addCollection();
        break;
      case Action.REMOVE_FROM_COLLECTION:
        this.removeCollection();
        break;
      default:
        console.log('Error: unknown action', this.action);
    }
  }


  private httpRequest(url: string) {
    // fetch();
  }

  private addCollection() {
    // For binding to work, always create a new array!
    if (!this.valueToAdd) {
      return;
    }
    if (this.addCollectionPosition === 'First') {
      this.collection = [this.valueToAdd, ...this.collection];
    } else {
      this.collection = [...this.collection, this.valueToAdd];
    }
    console.log("collection=", this.collection);
    console.log("collection attribute = ", this.getAttribute("collection"));
  }

  private removeCollection() {
    // For binding to work, always create a new array!
    if (this.collection.length === 0) {
      return;
    }
    let index = -1;
    if (this.removeCollectionPosition === RemoveCollectionPosition.FIRST) {
      index = 0;
    } else if (this.removeCollectionPosition === RemoveCollectionPosition.LAST) {
      index = this.collection.length - 1;
    } else if (this.removeCollectionPosition === RemoveCollectionPosition.ITEM) {
      if (this.removeItem) {
        index = this.collection.indexOf(this.removeItem);
      }
    }
    // Only remove element for valid index
    if (index !== -1) {
      this.collection.splice(index, 1);
      this.collection = this.collection.slice();
    }
    console.log("collection=", this.collection);
  }
}
