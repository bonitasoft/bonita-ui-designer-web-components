import { html } from 'lit';
import { expect, fixture } from '@open-wc/testing';
import '../src/uid-button.js';

let uidButton: any;

beforeEach(async () => {
  uidButton = await fixture(html` <uid-button></uid-button> `);
});

describe('uid-button', () => {
  it('Should show an empty text element', async () => {
    const paragraph = uidButton.shadowRoot.querySelector('p');

    expect(paragraph).not.to.equal(null);
    expect(removeComment(paragraph.innerHTML)).equal('');
  });

  it('Should set the label when attribute label is set', async () => {
    uidButton = await fixture(html` <uid-button label="My label"></uid-button> `);
    const label = uidButton.shadowRoot.querySelector('label');
    expect(label.textContent).equals('My label');
  });

  it('Should hide the label when attribute label-hidden is set', async () => {
    uidButton = await fixture(html` <uid-button label-hidden></uid-button> `);
    const label = uidButton.shadowRoot.querySelector('label');
    expect(label).equals(null);
  });

  it('Should set the label position and size when attribute label-position/label-width are set', async () => {
    uidButton = await fixture(html`
      <uid-button label-position="left" label-width="3"></uid-button>
    `);
    let label = uidButton.shadowRoot.querySelector('label');
    let container = uidButton.shadowRoot.querySelector('.container');
    // If position left, take the label-width
    expect(container.classList.value).to.include('container-row');
    expect(label.style.flexBasis).equals('25%');
    expect(label.classList.value).to.include('left');

    uidButton = await fixture(html`
      <uid-button label-position="top" label-width="6"></uid-button>
    `);
    label = uidButton.shadowRoot.querySelector('label');
    container = uidButton.shadowRoot.querySelector('.container');

    expect(container.classList.value).to.include('container-col');
    expect(label.style.flexBasis).equals('');
    expect(label.classList.value).not.to.include('left');
  });

  it('Should set the text when attribute text is set', async () => {
    uidButton = await fixture(html` <uid-button text="10"></uid-button> `);
    const paragraph = uidButton.shadowRoot.querySelector('p');
    expect(removeComment(paragraph.innerHTML)).equals('10');
  });

  it('Should set the css class text-<alignment> the when attribute alignment is set', async () => {
    uidButton = await fixture(html`
      <uid-button label-hidden alignment="center"></uid-button>
    `);
    const paragraph = uidButton.shadowRoot.querySelector('p');
    expect(paragraph.style.textAlign).equal('center');
  });

  it('Should translate the default label when attribute localization is set', async () => {
    uidButton = await fixture(html`
      <uid-button localization='{"Default label": "Label par défaut"}'></uid-button>
    `);
    const label = uidButton.shadowRoot.querySelector('label');
    expect(label.textContent).equals("Label par défaut");
  });

  it('Should keep the default label when attribute localization is invalid', async () => {
    uidButton = await fixture(html`
      <uid-button localization='{"Default label" "Label par défaut"}'></uid-button>
    `);
    const label = uidButton.shadowRoot.querySelector('label');
    expect(label.textContent).equals("Default label");
  });

  it('Should keep the default label when attribute localization does not contain the correct key', async () => {
    uidButton = await fixture(html`
      <uid-button localization='{"DefaultLabel": "Label par défaut"}'></uid-button>
    `);
    const label = uidButton.shadowRoot.querySelector('label');
    expect(label.textContent).equals("Default label");
  });

  it('Should keep the default label when attribute localization contain an empty translation', async () => {
    uidButton = await fixture(html`
      <uid-button localization='{"Default label": ""}'></uid-button>
    `);
    const label = uidButton.shadowRoot.querySelector('label');
    expect(label.textContent).equals("Default label");
  });

});

function removeComment(str: string) {
  // Remove comments, and leading and trailing whitespaces
  return str.replace(/<!--.*?-->/g, '').trim();
}
