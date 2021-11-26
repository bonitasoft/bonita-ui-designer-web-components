import { html } from 'lit';
import { expect, fixture } from '@open-wc/testing';
import '../src/uid-textarea.js';

let uidTextarea: any;

beforeEach(async () => {
  uidTextarea = await fixture(html` <uid-textarea></uid-textarea> `);
});

describe('UidTextarea', () => {
  it('Should show initially an empty input element', async () => {
    const textarea = uidTextarea.shadowRoot.querySelector('textarea');

    expect(textarea).not.to.equal(null);
    expect(textarea.value).equal('');
  });

  it('Should set the id when attribute id is set', async () => {
    uidTextarea = await fixture(html`
      <uid-textarea id="MyUidTextarea"></uid-textarea>
    `);
    const rootDiv = uidTextarea.shadowRoot.querySelector('div');
    expect(rootDiv.id).equals('MyUidTextarea');
  });

  it('Should set the label when attribute label is set', async () => {
    uidTextarea = await fixture(html`
      <uid-textarea label="My label"></uid-textarea>
    `);
    const label = uidTextarea.shadowRoot.querySelector('label');
    expect(label.textContent).equals('My label');
  });

  it('Should hide the label when attribute label-hidden is set', async () => {
    uidTextarea = await fixture(html`
      <uid-textarea label-hidden></uid-textarea>
    `);
    const label = uidTextarea.shadowRoot.querySelector('label');
    expect(label).equals(null);
  });

  it('Should add a red star on label when attribute required is set', async () => {
    uidTextarea = await fixture(html` <uid-textarea required></uid-textarea> `);
    const label = uidTextarea.shadowRoot.querySelector('label');
    expect(label.classList.value).to.include('required');
  });

  it('Should set the label position and size when attribute label-position/label-width are set', async () => {
    uidTextarea = await fixture(html`
      <uid-textarea label-position="left" label-width="3"></uid-textarea>
    `);
    let container = uidTextarea.shadowRoot.querySelector('.container');
    let label = uidTextarea.shadowRoot.querySelector('label');

    expect(container.classList.value).to.include('container-row');
    expect(label.style.flexBasis).equals('25%');
    expect(label.classList.value).to.include('left');

    uidTextarea = await fixture(html`
      <uid-textarea label-position="top" label-width="5"></uid-textarea>
    `);
    label = uidTextarea.shadowRoot.querySelector('label');
    container = uidTextarea.shadowRoot.querySelector('.container');

    expect(container.classList.value).to.include('container-col');
    expect(label.style.flexBasis).equals('');
    expect(label.classList.value).not.to.include('left');
  });

  it('Should set the value when attribute value is set', async () => {
    uidTextarea = await fixture(html`
      <uid-textarea value="10"></uid-textarea>
    `);
    const textarea = uidTextarea.shadowRoot.querySelector('textarea');
    expect(textarea.value).equals('10');
  });

  it('Should set the minlength/maxlength when attributes min-length/max-length are set', async () => {
    uidTextarea = await fixture(html`
      <uid-textarea min-length="3" max-length="10"></uid-textarea>
    `);
    const textarea = uidTextarea.shadowRoot.querySelector('textarea');
    expect(textarea.minLength).equals(3);
    expect(textarea.maxLength).equals(10);
  });

  it('Should textarea be readonly when attribute readonly is set', async () => {
    uidTextarea = await fixture(html` <uid-textarea readonly></uid-textarea> `);
    const textarea = uidTextarea.shadowRoot.querySelector('textarea');
    expect(textarea.readOnly).equals(true);
  });

  it('Should send en event when an textarea value is entered', async () => {
    let eventReceived = false;
    let value = '';
    uidTextarea.addEventListener('valueChange', (e: { detail: string }) => {
      eventReceived = true;
      value = e.detail;
    });
    const textarea = uidTextarea.shadowRoot.querySelector('textarea');

    textarea.value = 'at';
    // Value changed from js does not send the 'input' event: simulate it
    textarea.dispatchEvent(new Event('input'));

    expect(eventReceived).to.equal(true);
    expect(value).to.equal('at');
  });
});
