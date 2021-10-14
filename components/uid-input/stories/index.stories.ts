import { html, TemplateResult } from 'lit';
import '../src/uid-input.js';

export default {
  title: 'UidInput',
  component: 'uid-input',
  argTypes: {
    label: { control: 'text' },
    labelHidden: { control: 'boolean' },
    value: { control: 'text' },
    required: { control: 'boolean' },
    minLength: { control: 'number' },
    maxLength: { control: 'number'},
    labelPosition: {
      options: ['top', 'left'],
      control: 'radio'
    },
    labelWidth: { control: 'number' },
    min: { control: 'number' },
    max: { control: 'number' }
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
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  labelPosition?: string;
  labelWidth?: number;
  min?: number;
  max?: number;
  slot?: TemplateResult;
}

const Template: Story<ArgTypes> = ({
  label = "default",
  labelHidden = false,
  value = "abc",
  required = true,
  minLength = 3,
  maxLength = 10,
  labelPosition = 'top',
  labelWidth,
  slot,
  min,
  max
}: ArgTypes) => html`
  <uid-input
    label=${label}
    value=${value}
    min-length=${minLength}
    max-length=${maxLength}
    label-position=${labelPosition}
    label-width=${labelWidth}
    min=${min}
    max=${max}
    ${getLabelHidden(labelHidden)}
    ${getRequired(required)}
  >
    ${slot}
  </uid-input>
`;

export const Regular = Template.bind({});

export const CustomLabel = Template.bind({});
CustomLabel.args = {
  label: 'My custom label'
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

function getLabelHidden(labelHidden: boolean) {
  if (!labelHidden) {
    return html``;
  }
  return html`label-hidden`;
}

function getRequired(required: boolean) {
  if (!required) {
    return html``;
  }
  return html`required`;
}

