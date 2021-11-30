import { html } from 'lit';
import { expect, fixture } from '@open-wc/testing';
import '../src/uid-button.js';
import {removeComment} from "@bonitasoft/uid-common/dist/src/test/test-common-utils";

let uidButton: any;

beforeEach(async () => {
  uidButton = await fixture(html` <uid-button></uid-button> `);
});

describe('uid-button', () => {
  it('Should set the label when attribute label is set', async () => {
    uidButton = await fixture(html` <uid-button label="My label"></uid-button> `);
    const button = uidButton.shadowRoot.querySelector('button');
    expect(removeComment(button.textContent)).equals('My label');
  });

  it('Should send en event when the button is clicked', async () => {
    let eventReceived = false;
    let value = "";
    uidButton = await fixture(html`
      <uid-button action="myAction"></uid-button>
    `);
    uidButton.addEventListener(
      'action',
      (e: { detail: string; }) => {
        eventReceived = true;
        value = e.detail;
      }
    );
    const button = uidButton.shadowRoot.querySelector('button');
    button.click();

    expect(eventReceived).to.equal(true);
    expect(value).to.equal("myAction");
  });
});
