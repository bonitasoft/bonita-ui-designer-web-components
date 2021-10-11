import {html} from 'lit';
import {expect, fixture} from '@open-wc/testing';
import '../src/uid-text.js';

let uidText:any;

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

  it('Should set the label position and size when attribute label-position/label-width are set', async () => {
    uidText = await fixture(html`
      <uid-text label-position="left" label-width="3"></uid-text>
    `);
    let label = uidText.shadowRoot.querySelector('label');
    let container = uidText.shadowRoot.querySelector('.container');
    // If position left, take the label-width
    expect(container.classList.value).to.include("container-row");
    expect(label.style.flexBasis).equals("25%");
    expect(label.style.flexShrink).equals("0");
    expect(label.classList.value).to.include("left");

    uidText = await fixture(html`
      <uid-text label-position="top" label-width="6"></uid-text>
    `);
    label = uidText.shadowRoot.querySelector('label');
    container = uidText.shadowRoot.querySelector('.container');

    expect(container.classList.value).to.include("container-col");
    expect(label.style.flexBasis).equals("");
    expect(label.style.flexShrink).equals("");
    expect(label.classList.value).not.to.include("left");

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
    expect(paragraph.style.textAlign).equal("center");
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

function removeComment(str: string) {
  // Remove comments, and leading and trailing whitespaces
  return str.replace(/<\!--.*?-->/g, "").trim();
}

