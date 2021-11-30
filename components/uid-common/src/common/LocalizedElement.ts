import {property} from 'lit/decorators.js';
import {UidElement} from "./UidElement";

/**
 * Not used for now
 */
export abstract class LocalizedElement extends UidElement {
  @property({attribute: 'localization', type: String, reflect: true})
  localization: string = '';

  private translationObj: any = {};

  async attributeChangedCallback(name: string, old: string | null, value: string | null): Promise<void> {
    super.attributeChangedCallback(name, old, value);
    if (name === 'localization' && value) {
      try {
        this.translationObj = JSON.parse(value);
      } catch (e) {
        console.log("Json parse error: ", e);
      }
    }
  }

  protected localize(str: string): string | null {
    if (str in this.translationObj) {
      let local = this.translationObj[str];
      if (local) {
        return local;
      }
    }
    return str;
  }
}
