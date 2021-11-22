import {html} from 'lit';
import {expect, fixture} from '@open-wc/testing';
import '../src/uid-title.js';
// @ts-ignore
import {removeComment} from "@bonitasoft/uid-common/dist/src/test/test-common-utils";

let uidTitle:any;

beforeEach(async () => {
  uidTitle = await fixture(html`
      <uid-title></uid-title>
    `);
});

describe('UidTitle', () => {

  it('Should show initially a default title element', async () => {
    const title = uidTitle.shadowRoot.querySelector('h1');

    expect(title).not.to.equal(null);
    expect(removeComment(title.innerHTML)).equal('Title');
  });

  it('Should display a h2 title', async () => {
    uidTitle = await fixture(html` <uid-title text="A custom title" level="level 2"></uid-title> `);
    const title = uidTitle.shadowRoot.querySelector('h2');

    expect(title).not.to.equal(null);
    expect(removeComment(title.innerHTML)).equal('A custom title');
  });

  it('Should display a h3 title with text align to right when attribute is set', async () => {
    uidTitle = await fixture(html` <uid-title alignment="right" text="A title align to right" level="Level3"></uid-title>`);
    const title = uidTitle.shadowRoot.querySelector('h3');

    expect(title).not.to.equal(null);
    expect(removeComment(title.innerHTML)).equal('A title align to right');
    expect(title.style.textAlign).equal('right');
  });
});
