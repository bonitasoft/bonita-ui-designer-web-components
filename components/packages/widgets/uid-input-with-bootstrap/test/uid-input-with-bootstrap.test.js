import { html, fixture, expect } from '@open-wc/testing';

import '../lib/uid-input-with-bootstrap.es5.min.js';

let uidInputWithBootstrap;

beforeEach(async () => {
  uidInputWithBootstrap = await fixture(html`
      <uid-input-with-bootstrap></uid-input-with-bootstrap>
    `);
});


describe('uid-input-with-bootstrap', () => {
  it('Should show initially an empty input element', async () => {
    const input = uidInputWithBootstrap.shadowRoot.querySelector('input');

    expect(input).not.to.equal(null);
    expect(input.value).equal("");
  });

  it('Should set the id when attribute id is set', async () => {
    uidInputWithBootstrap = await fixture(html`
      <uid-input-with-bootstrap id="MyUidInputWithBootstrap"></uid-input-with-bootstrap>
    `);
    const rootDiv = uidInputWithBootstrap.shadowRoot.querySelector('div');
    expect(rootDiv.id).equals("MyUidInputWithBootstrap");
  });

  it('Should set the label when attribute label is set', async () => {
    uidInputWithBootstrap = await fixture(html`
      <uid-input-with-bootstrap label="My label"></uid-input-with-bootstrap>
    `);
    const label = uidInputWithBootstrap.shadowRoot.querySelector('label');
    expect(label.textContent).equals("My label");
  });

  it('Should hide the label when attribute label-hidden is set', async () => {
    uidInputWithBootstrap = await fixture(html`
      <uid-input-with-bootstrap label-hidden></uid-input-with-bootstrap>
    `);
    const label = uidInputWithBootstrap.shadowRoot.querySelector('label');
    expect(label).equals(null);
  });

  it('Should add a red star on label when attribute required is set', async () => {
    uidInputWithBootstrap = await fixture(html`
      <uid-input-with-bootstrap required></uid-input-with-bootstrap>
    `);
    const label = uidInputWithBootstrap.shadowRoot.querySelector('label');
    expect(label.classList.value).to.include("label-required");
  });

  it('Should set the css classes col-xxx and text-right the when attribute label-position/label-width are set', async () => {
    uidInputWithBootstrap = await fixture(html`
      <uid-input-with-bootstrap label-position="left" label-width="5"></uid-input-with-bootstrap>
    `);
    let label = uidInputWithBootstrap.shadowRoot.querySelector('label');
    // If position left, take the label-width
    expect(label.classList.value).to.include("col-5");
    expect(label.classList.value).to.include("text-right");
    let input = uidInputWithBootstrap.shadowRoot.querySelector('input');
    expect(input.classList.value).to.include("col");

    uidInputWithBootstrap = await fixture(html`
      <uid-input-with-bootstrap label-position="top" label-width="5"></uid-input-with-bootstrap>
    `);
    label = uidInputWithBootstrap.shadowRoot.querySelector('label');
    // If position is not left, take 12
    expect(label.classList.value).to.include("col-12");
    expect(label.classList.value).not.to.include("text-right");
    input = uidInputWithBootstrap.shadowRoot.querySelector('input');
    expect(input.classList.value).to.include("col");
  });

  it('Should set the placeholder when attribute placeholder is set', async () => {
    uidInputWithBootstrap = await fixture(html`
      <uid-input-with-bootstrap placeholder="Enter a string"></uid-input-with-bootstrap>
    `);
    const input = uidInputWithBootstrap.shadowRoot.querySelector('input');
    expect(input.placeholder).equals("Enter a string");
  });

  it('Should set the value when attribute value is set', async () => {
    uidInputWithBootstrap = await fixture(html`
      <uid-input-with-bootstrap value="10"></uid-input-with-bootstrap>
    `);
    const input = uidInputWithBootstrap.shadowRoot.querySelector('input');
    expect(input.value).equals("10");
  });

  it('Should set the type when attribute type is set', async () => {
    uidInputWithBootstrap = await fixture(html`
      <uid-input-with-bootstrap type="checkbox"></uid-input-with-bootstrap>
    `);
    const input = uidInputWithBootstrap.shadowRoot.querySelector('input');
    expect(input.type).equals("checkbox");
  });

  it('Should set the min/max/step when attributes min/max/step are set', async () => {
    uidInputWithBootstrap = await fixture(html`
      <uid-input-with-bootstrap min="10" max="100" step="2"></uid-input-with-bootstrap>
    `);
    const input = uidInputWithBootstrap.shadowRoot.querySelector('input');
    expect(input.min).equals("10");
    expect(input.max).equals("100");
    expect(input.step).equals("2");
  });

  it('Should set the minlength/maxlength when attributes min-length/max-length are set', async () => {
    uidInputWithBootstrap = await fixture(html`
      <uid-input-with-bootstrap min-length="3" max-length="10"></uid-input-with-bootstrap>
    `);
    const input = uidInputWithBootstrap.shadowRoot.querySelector('input');
    expect(input.minLength).equals(3);
    expect(input.maxLength).equals(10);
  });

  it('Should input be readonly when attribute readonly is set', async () => {
    uidInputWithBootstrap = await fixture(html`
      <uid-input-with-bootstrap readonly></uid-input-with-bootstrap>
    `);
    const input = uidInputWithBootstrap.shadowRoot.querySelector('input');
    expect(input.readOnly).equals(true);
  });

  it('Should send en event when an input value is entered', async () => {
    let eventReceived = false;
    let value = "";
    uidInputWithBootstrap.addEventListener(
        'valueChange',
        e => {
          eventReceived = true;
          value = e.detail;
        }
    );
    const input = uidInputWithBootstrap.shadowRoot.querySelector('input');

    input.value = "at";
    // Value changed from js does not send the 'input' event: simulate it
    input.dispatchEvent(new Event("input"));

    expect(eventReceived).to.equal(true);
    expect(value).to.equal("at");
  });

  it('Should display french labels when lang attribute is fr', async () => {
    uidInputWithBootstrap = await fixture(html`
      <uid-input-with-bootstrap lang="fr"></uid-input-with-bootstrap>
    `);
    const label = uidInputWithBootstrap.shadowRoot.querySelector('label');
    expect(label.textContent).equal("Label par défaut");
  });

});
