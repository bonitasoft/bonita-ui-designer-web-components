import { html, TemplateResult } from 'lit';
import '../src/uid-button.js';
import { ifDefined } from 'lit-html/directives/if-defined.js'; // eslint-disable-line

export default {
  title: 'UidButton',
  component: 'uid-button',
  argTypes: {
    id: { control: 'text' },
    alignment: {
      options: ['left', 'center', 'right'],
      control: 'radio',
    },
    label: { control: 'text'},
    action: { control: 'text'},
  },
};

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {
  id?: string;
  alignment?: string,
  label?: string,
  action?: string;
  slot?: TemplateResult;
}

const Template: Story<ArgTypes> = ({
  id,
  alignment,
  label,
  action,
  slot
}: ArgTypes) => html`
  <uid-button
    id=${ifDefined(id)}
    alignment=${ifDefined(alignment)}
    label=${ifDefined(label)}
    action=${ifDefined(action)}
  >
    ${slot}
  </uid-button>
`;

export const Regular = Template.bind({});

export const AlignRight = Template.bind({});
AlignRight.args = {
  alignment: 'right',
};

export const SlottedContent = Template.bind({});
SlottedContent.args = {
  slot: html`<p>Slotted content</p>`,
};
SlottedContent.argTypes = {
  slot: { table: { disable: true } },
};
