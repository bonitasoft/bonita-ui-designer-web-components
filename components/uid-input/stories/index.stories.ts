import { html, TemplateResult } from 'lit';
import '../src/uid-input.js';

export default {
  title: 'UidInput',
  component: 'uid-input',
  argTypes: {
    label: { control: 'text' },
    labelHidden: { control: 'boolean' },
    value: { control: 'text' },
  },
};

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {
  label?: string;
  labelHidden?: boolean;
  value?: string;
  slot?: TemplateResult;
}

const Template: Story<ArgTypes> = ({
  label = 'my label', labelHidden = false,
  value = "abc",
  slot,
}: ArgTypes) => html`
  <uid-input
    label=${label}
    label-hidden=${labelHidden}
    value=${value}
  >
    ${slot}
  </uid-input>
`;

export const Regular = Template.bind({});

export const CustomLabel = Template.bind({});
CustomLabel.args = {
  label: 'My custom label',
};

export const CustomValue = Template.bind({});
CustomValue.args = {
  value: "new value",
};

export const SlottedContent = Template.bind({});
SlottedContent.args = {
  slot: html`<p>Slotted content</p>`,
};
SlottedContent.argTypes = {
  slot: { table: { disable: true } },
};
