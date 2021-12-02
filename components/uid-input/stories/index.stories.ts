import { html, TemplateResult } from 'lit';
import '../src/uid-input';
import { ifDefined } from 'lit/directives/if-defined.js'; // eslint-disable-line
import { Position } from '@bonitasoft/uid-common/dist/src/common/Position'; // eslint-disable-line

export default {
  title: 'UidInput',
  component: 'uid-input',
  argTypes: {
    id: { control: 'text' },
    label: { control: 'text' },
    labelHidden: { control: 'boolean' },
    labelPosition: {
      options: [Position.TOP, Position.LEFT],
      control: 'radio',
    },
    labelWidth: { control: 'number' },
    value: { control: 'text' },
    type: {
      options: ['text', 'number', 'email', 'password'],
      control: 'radio',
    },
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' },
    minLength: { control: 'number' },
    maxLength: { control: 'number' },
    placeHolder: { control: 'text' },
    readOnly: { control: 'boolean' },
    required: { control: 'boolean' },
  },
};

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {
  id?: string;
  label?: string;
  labelHidden?: boolean;
  placeHolder?: string;
  value?: string;
  type?: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  readOnly?: boolean;
  labelPosition?: string;
  labelWidth?: number;
  min?: number;
  max?: number;
  step?: number;
  slot?: TemplateResult;
}

const Template: Story<ArgTypes> = ({
  id,
  label,
  labelHidden,
  placeHolder,
  value,
  type,
  required,
  minLength,
  maxLength,
  readOnly,
  labelPosition,
  labelWidth,
  slot,
  min,
  max,
  step,
}: ArgTypes) => html`
  <uid-input
    id=${ifDefined(id)}
    label=${ifDefined(label)}
    placeHolder=${ifDefined(placeHolder)}
    value=${ifDefined(value)}
    type=${ifDefined(type)}
    min-length=${ifDefined(minLength)}
    max-length=${ifDefined(maxLength)}
    ?readonly=${ifDefined(readOnly)}
    label-position=${ifDefined(labelPosition)}
    label-width=${ifDefined(labelWidth)}
    min=${ifDefined(min)}
    max=${ifDefined(max)}
    step=${ifDefined(step)}
    ?label-hidden=${labelHidden}
    ?required=${required}
  >
    ${slot}
  </uid-input>
`;

export const Regular = Template.bind({});

export const LabelLeft = Template.bind({});
LabelLeft.args = {
  labelPosition: 'left',
};

export const LabelHidden = Template.bind({});
LabelHidden.args = {
  labelHidden: true,
};

export const Required = Template.bind({});
Required.args = {
  required: true,
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
  readOnly: true,
};

export const SlottedContent = Template.bind({});
SlottedContent.args = {
  slot: html`<p>Slotted content</p>`,
};
SlottedContent.argTypes = {
  slot: { table: { disable: true } },
};
