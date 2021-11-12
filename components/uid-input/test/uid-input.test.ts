import {html} from 'lit';
import {expect, fixture} from '@open-wc/testing';
import '../src/uid-input.js';

let uidInput:any;

beforeEach(async () => {
  uidInput = await fixture(html`
      <uid-input></uid-input>
    `);
});


describe('UidInput', () => {

  it('Should show initially an empty input element', async () => {
    const input = uidInput.shadowRoot.querySelector('input');

    expect(input).not.to.equal(null);
    expect(input.value).equal("");
  });

  it('Should set the id when attribute id is set', async () => {
    uidInput = await fixture(html`
      <uid-input id="MyUidInput"></uid-input>
    `);
    const rootDiv = uidInput.shadowRoot.querySelector('div');
    expect(rootDiv.id).equals("MyUidInput");
  });

  it('Should set the label when attribute label is set', async () => {
    uidInput = await fixture(html`
      <uid-input label="My label"></uid-input>
    `);
    const label = uidInput.shadowRoot.querySelector('label');
    expect(label.textContent).equals("My label");
  });

  it('Should hide the label when attribute label-hidden is set', async () => {
    uidInput = await fixture(html`
      <uid-input label-hidden></uid-input>
    `);
    const label = uidInput.shadowRoot.querySelector('label');
    expect(label).equals(null);
  });

  it('Should add a red star on label when attribute required is set', async () => {
    uidInput = await fixture(html`
      <uid-input required></uid-input>
    `);
    const label = uidInput.shadowRoot.querySelector('label');
    expect(label.classList.value).to.include("required");
  });

  it('Should set the label position and size when attribute label-position/label-width are set', async () => {
    uidInput = await fixture(html`
      <uid-input label-position="left" label-width="3"></uid-input>
    `);
    let container = uidInput.shadowRoot.querySelector('.container');
    let label = uidInput.shadowRoot.querySelector('label');

    expect(container.classList.value).to.include("container-row");
    expect(label.style.flexBasis).equals("25%");
    expect(label.classList.value).to.include("left");

    uidInput = await fixture(html`
      <uid-input label-position="top" label-width="5"></uid-input>
    `);
    label = uidInput.shadowRoot.querySelector('label');
    container = uidInput.shadowRoot.querySelector('.container');

    expect(container.classList.value).to.include("container-col");
    expect(label.style.flexBasis).equals('');
    expect(label.classList.value).not.to.include("left");

  });

  it('Should set the placeholder when attribute placeholder is set', async () => {
    uidInput = await fixture(html`
      <uid-input placeholder="Enter a string"></uid-input>
    `);
    const input = uidInput.shadowRoot.querySelector('input');
    expect(input.placeholder).equals("Enter a string");
  });

  it('Should set the value when attribute value is set', async () => {
    uidInput = await fixture(html`
      <uid-input value="10"></uid-input>
    `);
    const input = uidInput.shadowRoot.querySelector('input');
    expect(input.value).equals("10");
  });

  it('Should set the type when attribute type is set', async () => {
    uidInput = await fixture(html`
      <uid-input type="checkbox"></uid-input>
    `);
    const input = uidInput.shadowRoot.querySelector('input');
    expect(input.type).equals("checkbox");
  });

  it('Should set the min/max/step when attributes min/max/step are set', async () => {
    uidInput = await fixture(html`
      <uid-input min="10" max="100" step="2"></uid-input>
    `);
    const input = uidInput.shadowRoot.querySelector('input');
    expect(input.min).equals("10");
    expect(input.max).equals("100");
    expect(input.step).equals("2");
  });

  it('Should set the minlength/maxlength when attributes min-length/max-length are set', async () => {
    uidInput = await fixture(html`
      <uid-input min-length="3" max-length="10"></uid-input>
    `);
    const input = uidInput.shadowRoot.querySelector('input');
    expect(input.minLength).equals(3);
    expect(input.maxLength).equals(10);
  });

  it('Should input be readonly when attribute readonly is set', async () => {
    uidInput = await fixture(html`
      <uid-input readonly></uid-input>
    `);
    const input = uidInput.shadowRoot.querySelector('input');
    expect(input.readOnly).equals(true);
  });

  it('Should send en event when an input value is entered', async () => {
    let eventReceived = false;
    let value = "";
    uidInput.addEventListener(
      'valueChange',
        (e: { detail: string; }) => {
        eventReceived = true;
        value = e.detail;
      }
    );
    const input = uidInput.shadowRoot.querySelector('input');

    input.value = "at";
    // Value changed from js does not send the 'input' event: simulate it
    input.dispatchEvent(new Event("input"));

    expect(eventReceived).to.equal(true);
    expect(value).to.equal("at");
  });

  it('Should translate the default label when attribute localization is set', async () => {
    uidInput = await fixture(html`
      <uid-input localization='{"Default label": "Label par défaut"}'></uid-input>
    `);
    const label = uidInput.shadowRoot.querySelector('label');
    expect(label.textContent).equals("Label par défaut");
  });

  it('Should keep the default label when attribute localization is invalid', async () => {
    uidInput = await fixture(html`
      <uid-input localization='{"Default label" "Label par défaut"}'></uid-input>
    `);
    const label = uidInput.shadowRoot.querySelector('label');
    expect(label.textContent).equals("Default label");
  });

  it('Should keep the default label when attribute localization does not contain the correct key', async () => {
    uidInput = await fixture(html`
      <uid-input localization='{"DefaultLabel": "Label par défaut"}'></uid-input>
    `);
    const label = uidInput.shadowRoot.querySelector('label');
    expect(label.textContent).equals("Default label");
  });

  it('Should keep the default label when attribute localization contain an empty translation', async () => {
    uidInput = await fixture(html`
      <uid-input localization='{"Default label": ""}'></uid-input>
    `);
    const label = uidInput.shadowRoot.querySelector('label');
    expect(label.textContent).equals("Default label");
  });


});
