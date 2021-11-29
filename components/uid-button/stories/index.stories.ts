import { html, TemplateResult } from 'lit';
import '../src/uid-button.js';
import { ifDefined } from 'lit-html/directives/if-defined.js'; // eslint-disable-line

export default {
  title: 'UidButton',
  component: 'uid-button',
  argTypes: {
    localization: { control: 'text' },
    id: { control: 'text' },
    alignment: {
      options: ['left', 'center', 'right'],
      control: 'radio',
    },
    action: {
      options: ['Submit task', 'Start process', 'POST', "PUT", "GET", "DELETE",
      "Add to collection", "Remove from collection", "Open modal", "Close modal"],
      control: 'radio',
    },
    collection: { control: 'text' },
    valueToAdd: { control: 'text' },
    addCollectionPosition: {
      options: ['First', 'Last'],
      control: 'radio',
    },
    removeCollectionPosition: {
      options: ['First', 'Item', 'Last'],
      control: 'radio',
    },
    removeItem: { control: 'text' },
  },
};

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {
  localization?: string;
  alignment?: boolean;
  id?: string;
  action?: string;
  collection?: string,
  valueToAdd?: string,
  addCollectionPosition?: string,
  removeCollectionPosition?: string,
  removeItem?: string,
  slot?: TemplateResult;
}

const Template: Story<ArgTypes> = ({
  localization,
  id,
  alignment,
  action,
  collection,
  valueToAdd,
  addCollectionPosition,
  removeCollectionPosition,
  removeItem,
  slot
}: ArgTypes) => html`
  <uid-button
    localization=${ifDefined(localization)}
    alignment=${ifDefined(alignment)}
    id=${ifDefined(id)}
    action=${ifDefined(action)}
    collection=${ifDefined(collection)}
    valueToAdd=${ifDefined(valueToAdd)}
    addCollectionPosition=${ifDefined(addCollectionPosition)}
    removeCollectionPosition=${ifDefined(removeCollectionPosition)}
    removeItem=${ifDefined(removeItem)}
  >
    ${slot}
  </uid-button>
`;

export const Regular = Template.bind({});

export const Collection = Template.bind({});
Collection.args = {
  collection: '["a", "b", "c"]',
};

export const French = Template.bind({});
French.args = {
  localization: "{\"Submit\": \"Soumettre\"}",
};

export const SlottedContent = Template.bind({});
SlottedContent.args = {
  slot: html`<p>Slotted content</p>`,
};
SlottedContent.argTypes = {
  slot: { table: { disable: true } },
};
