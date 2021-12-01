import { html, TemplateResult } from 'lit';
import '../src/uid-textarea';
import { ifDefined } from 'lit/directives/if-defined.js'; // eslint-disable-line
import { Position } from '@bonitasoft/uid-common/dist/src/common/PropertiesType'; // eslint-disable-line

export default {
  title: 'UidTextarea',
  component: 'uid-textarea',
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
    minLength: { control: 'number' },
    maxLength: { control: 'number' },
    readOnly: { control: 'boolean' },
    required: { control: 'boolean' },
    disabled: { control: 'boolean' },
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
  value?: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  readOnly?: boolean;
  labelPosition?: string;
  labelWidth?: number;
}

const Template: Story<ArgTypes> = ({
  id,
  label,
  labelHidden,
  value,
  required,
  minLength,
  maxLength,
  readOnly,
  labelPosition,
  labelWidth,
}: ArgTypes) => html`
  <uid-textarea
    id=${ifDefined(id)}
    label=${ifDefined(label)}
    value=${ifDefined(value)}
    min-length=${ifDefined(minLength)}
    max-length=${ifDefined(maxLength)}
    ?readonly=${ifDefined(readOnly)}
    label-position=${ifDefined(labelPosition)}
    label-width=${ifDefined(labelWidth)}
    .value=${ifDefined(value)}
    ?label-hidden=${labelHidden}
    ?required=${required}
  >
  </uid-textarea>
`;

export const Regular = Template.bind({});

export const LabelLeft = Template.bind({});
LabelLeft.args = {
  label: 'A left label',
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
  label: 'Try to write something...',
  value: "you can't write here !",
  readOnly: true,
};

export const valueLengthRestriction = Template.bind({});
valueLengthRestriction.args = {
  label: 'Enter a value with size between 2 and 5',
  minLength: 2,
  maxLength: 5,
};
