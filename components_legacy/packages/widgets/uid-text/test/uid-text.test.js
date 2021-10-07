import { html, fixture, expect } from '@open-wc/testing';

import '../lib/uid-text.es5.min.js';

let uidText;

beforeEach(async () => {
  uidText = await fixture(html`
      <uid-text></uid-text>
    `);
});


describe('uid-text', () => {
  it('Should show an empty text element', async () => {
    const paragraph = uidText.shadowRoot.querySelector('p');

    expect(paragraph).not.to.equal(null);
    expect(removeComment(paragraph.innerHTML)).equal("");
  });

  it('Should set the label when attribute label is set', async () => {
    uidText = await fixture(html`
      <uid-text label="My label"></uid-text>
    `);
    const label = uidText.shadowRoot.querySelector('label');
    expect(label.textContent).equals("My label");
  });


  it('Should hide the label when attribute label-hidden is set', async () => {
    uidText = await fixture(html`
      <uid-text label-hidden></uid-text>
    `);
    const label = uidText.shadowRoot.querySelector('label');
    expect(label).equals(null);
  });

  it('Should set the css classes col-xxx and text-right when attribute label-position/label-width are set', async () => {
    uidText = await fixture(html`
      <uid-text label-position="left" label-width="5"></uid-text>
    `);
    let label = uidText.shadowRoot.querySelector('label');
    // If position left, take the label-width
    expect(label.classList.value).to.include("col-5");
    expect(label.classList.value).to.include("text-right");
    let paragraph = uidText.shadowRoot.querySelector('p');
    // If position left, take (12 - label-width)
    expect(paragraph.classList.value).to.include("col");

    uidText = await fixture(html`
      <uid-text label-position="top" label-width="5"></uid-text>
    `);
    label = uidText.shadowRoot.querySelector('label');
    // If position is not left, take 12
    expect(label.classList.value).to.include("col-12");
    expect(label.classList.value).not.to.include("text-right");
    paragraph = uidText.shadowRoot.querySelector('p');
    // If position is not left, take 12
    expect(paragraph.classList.value).to.include("col");
  });

  it('Should set the text when attribute text is set', async () => {
    uidText = await fixture(html`
      <uid-text text="10"></uid-text>
    `);
    const paragraph = uidText.shadowRoot.querySelector('p');
    expect(removeComment(paragraph.innerHTML)).equals("10");
  });


  it('Should set the css class text-<alignment> the when attribute alignment is set', async () => {
    uidText = await fixture(html`
      <uid-text label-hidden alignment="center"></uid-text>
    `);
    let paragraph = uidText.shadowRoot.querySelector('p');
    expect(paragraph.classList.value).to.include("text-center");
  });

  it('Should display label in correct language when lang attribute is set', async () => {
    uidText = await fixture(html`
      <uid-text></uid-text>
    `);
    let label = uidText.shadowRoot.querySelector('label');
    // Default is "en"
    expect(label.textContent).equal("Default label");

    uidText = await fixture(html`
      <uid-text lang="fr"></uid-text>
    `);
    label = uidText.shadowRoot.querySelector('label');
    expect(label.textContent).equal("Label par défaut");
  });

});

function removeComment(str) {
  return str.replace(/<\!--.*?-->/g, "");
}

